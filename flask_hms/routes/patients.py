from flask import request, jsonify
from routes import patients_bp
from database import db
from models.patient import Patient
from models.in_patient import InPatient
from models.out_patient import OutPatient
from models.room import Room
from datetime import datetime
from services.audit_service import log_action
from services.patient_service import allocate_room, free_room
from app import socketio
import uuid

@patients_bp.route('', methods=['GET'])
def get_patients():
    """Get all patients with optional filtering"""
    page = request.args.get('page', 1, type=int)
    category = request.args.get('category')
    status = request.args.get('status')
    
    query = Patient.query
    
    if category:
        query = query.filter_by(category=category)
    if status:
        query = query.filter_by(status=status)
    
    paginated = query.paginate(page=page, per_page=20)
    
    return jsonify({
        'success': True,
        'data': [p.to_dict() for p in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page
    }), 200

@patients_bp.route('/<int:patient_id>', methods=['GET'])
def get_patient(patient_id):
    """Get single patient with all related data"""
    patient = Patient.query.get_or_404(patient_id)
    
    data = patient.to_dict()
    
    # Include inpatient data if exists
    if patient.in_patient:
        data['inpatient'] = {
            'date_of_admission': str(patient.in_patient.date_of_admission),
            'date_of_discharge': str(patient.in_patient.date_of_discharge) if patient.in_patient.date_of_discharge else None,
            'room_id': patient.in_patient.room_id,
            'room': patient.in_patient.room.to_dict() if patient.in_patient.room else None
        }
    
    # Include prescriptions
    data['prescriptions'] = [p.to_dict() for p in patient.prescriptions]
    
    # Include bills
    data['bills'] = [b.to_dict() for b in patient.bills]
    
    # Include lab reports
    data['lab_reports'] = [l.to_dict() for l in patient.lab_reports]
    
    return jsonify({'success': True, 'data': data}), 200

@patients_bp.route('', methods=['POST'])
def create_patient():
    """Create new patient - triggers room allocation if inpatient"""
    data = request.get_json()
    
    try:
        # Validate required fields
        if not data.get('first_name') or not data.get('phone_no'):
            return jsonify({'success': False, 'message': 'first_name and phone_no are required'}), 400
        
        # Generate patient_id
        patient_id = f"PAT-{uuid.uuid4().hex[:8].upper()}"
        
        # Create patient
        patient = Patient(
            patient_id=patient_id,
            first_name=data.get('first_name'),
            middle_name=data.get('middle_name'),
            last_name=data.get('last_name'),
            name=f"{data.get('first_name')} {data.get('last_name', '')}".strip(),
            date_of_birth=datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date() if data.get('date_of_birth') else None,
            age=data.get('age'),
            gender=data.get('gender', 'Other'),
            blood_group=data.get('blood_group'),
            height=data.get('height'),
            weight=data.get('weight'),
            bmi=data.get('bmi'),
            phone_no=data.get('phone_no'),
            email_id=data.get('email_id'),
            address=data.get('address'),
            disease=data.get('disease'),
            category=data.get('category', 'OutPatient'),
            amount=data.get('amount', 0)
        )
        
        db.session.add(patient)
        db.session.flush()
        
        # If inpatient, allocate room
        if data.get('category') == 'InPatient' and data.get('room_id'):
            room_id = data.get('room_id')
            room = Room.query.get(room_id)
            
            if not room:
                db.session.rollback()
                return jsonify({'success': False, 'message': 'Room not found'}), 404
            
            if room.bed_count_remaining <= 0:
                db.session.rollback()
                return jsonify({'success': False, 'message': 'No beds available in this room'}), 400
            
            # Allocate bed
            room.bed_count_remaining -= 1
            room.status = 'Full' if room.bed_count_remaining == 0 else 'Partially Occupied'
            
            # Create inpatient record
            in_patient = InPatient(
                patient_id=patient.id,
                date_of_admission=datetime.utcnow(),
                room_id=room_id
            )
            db.session.add(in_patient)
            
            # Emit room update event
            socketio.emit('room_updated', room.to_dict(), broadcast=True)
        else:
            # Create outpatient record
            out_patient = OutPatient(patient_id=patient.id)
            db.session.add(out_patient)
        
        db.session.commit()
        
        # Log action
        log_action(
            actor_id=None,
            actor_role='Admin',
            action='patient_created',
            entity_type='Patient',
            entity_id=patient.id,
            payload=patient.to_dict()
        )
        
        # Broadcast patient added event
        socketio.emit('patient_added', {
            'patient_id': patient.patient_id,
            'name': patient.name,
            'category': patient.category
        }, broadcast=True)
        
        return jsonify({
            'success': True,
            'message': 'Patient created successfully',
            'data': patient.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@patients_bp.route('/<int:patient_id>', methods=['PATCH'])
def update_patient(patient_id):
    """Update patient information"""
    patient = Patient.query.get_or_404(patient_id)
    data = request.get_json()
    
    try:
        old_data = patient.to_dict()
        
        # Update fields
        if 'first_name' in data:
            patient.first_name = data['first_name']
        if 'last_name' in data:
            patient.last_name = data['last_name']
        if 'age' in data:
            patient.age = data['age']
        if 'disease' in data:
            patient.disease = data['disease']
        if 'phone_no' in data:
            patient.phone_no = data['phone_no']
        if 'email_id' in data:
            patient.email_id = data['email_id']
        
        # Update name field
        patient.name = f"{patient.first_name} {patient.last_name or ''}".strip()
        
        db.session.commit()
        
        # Log action
        log_action(
            actor_id=None,
            actor_role='Admin',
            action='patient_updated',
            entity_type='Patient',
            entity_id=patient.id,
            old_values=old_data,
            new_values=patient.to_dict()
        )
        
        return jsonify({
            'success': True,
            'message': 'Patient updated successfully',
            'data': patient.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@patients_bp.route('/<int:patient_id>/discharge', methods=['POST'])
def discharge_patient(patient_id):
    """Discharge inpatient and generate final bill"""
    patient = Patient.query.get_or_404(patient_id)
    
    try:
        if not patient.in_patient:
            return jsonify({'success': False, 'message': 'Patient is not an inpatient'}), 400
        
        in_patient = patient.in_patient
        room = in_patient.room
        
        # Calculate stay duration
        admission = in_patient.date_of_admission
        discharge = datetime.utcnow()
        days_stayed = max(1, (discharge - admission).days + 1)
        
        # Calculate charges
        room_charges = float(room.price_per_day) * days_stayed
        
        # Mark as discharged
        in_patient.date_of_discharge = discharge
        room.bed_count_remaining += 1
        room.status = 'Available' if room.bed_count_remaining > 0 else room.status
        
        # Update patient
        patient.category = 'Discharged'
        
        db.session.commit()
        
        # Create discharge bill (handled by billing service)
        from services.billing_service import generate_discharge_bill
        bill = generate_discharge_bill(patient.id, room_charges)
        
        # Log action
        log_action(
            actor_id=None,
            actor_role='Doctor',
            action='patient_discharged',
            entity_type='Patient',
            entity_id=patient.id,
            payload={
                'days_stayed': days_staged,
                'room_charges': room_charges,
                'bill_id': bill.bill_id if bill else None
            }
        )
        
        # Emit events
        socketio.emit('patient_discharged', {
            'patient_id': patient.patient_id,
            'name': patient.name,
            'bill_id': bill.bill_id if bill else None
        }, broadcast=True)
        
        socketio.emit('room_updated', room.to_dict(), broadcast=True)
        
        return jsonify({
            'success': True,
            'message': 'Patient discharged successfully',
            'data': {
                'patient': patient.to_dict(),
                'bill_id': bill.bill_id if bill else None
            }
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@patients_bp.route('/<int:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    """Delete patient (soft delete via status)"""
    patient = Patient.query.get_or_404(patient_id)
    
    try:
        # If inpatient, free room first
        if patient.in_patient:
            room = patient.in_patient.room
            room.bed_count_remaining += 1
            room.status = 'Available'
        
        db.session.delete(patient)
        db.session.commit()
        
        log_action(
            actor_id=None,
            actor_role='Admin',
            action='patient_deleted',
            entity_type='Patient',
            entity_id=patient_id,
            payload={'patient_id': patient.patient_id}
        )
        
        return jsonify({'success': True, 'message': 'Patient deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500