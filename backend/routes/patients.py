from flask import Blueprint, request, jsonify
from datetime import datetime
from models.patient import Patient
from models.room import Room
from models.base import db

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/patients', methods=['GET'])
def get_patients():
    """Get all patients with optional filters"""
    try:
        status = request.args.get('status')
        search = request.args.get('search')
        
        query = Patient.query
        
        if status and status != 'all':
            query = query.filter(Patient.status == status)
            
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (Patient.name.ilike(search_term)) |
                (Patient.id.ilike(search_term)) |
                (Patient.room.has(Room.room_number.ilike(search_term)))
            )
        
        patients = query.all()
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'gender': p.gender,
            'disease': p.disease,
            'room_id': p.room_id,
            'room_number': p.room.room_number if p.room else None,
            'status': p.status,
            'admission_date': p.admission_date.isoformat(),
            'deposited_amount': float(p.deposited_amount),
            'pending_amount': float(p.pending_amount) if p.pending_amount else None,
            'total_amount': float(p.total_amount) if p.total_amount else None,
            'created_at': p.created_at.isoformat(),
            'updated_at': p.updated_at.isoformat()
        } for p in patients]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patients_bp.route('/patients/<string:patient_id>', methods=['GET'])
def get_patient(patient_id):
    """Get a single patient by ID"""
    try:
        patient = Patient.query.get_or_404(patient_id)
        return jsonify({
            'id': patient.id,
            'name': patient.name,
            'gender': patient.gender,
            'disease': patient.disease,
            'room_id': patient.room_id,
            'room_number': patient.room.room_number if patient.room else None,
            'status': patient.status,
            'admission_date': patient.admission_date.isoformat(),
            'deposited_amount': float(patient.deposited_amount),
            'pending_amount': float(patient.pending_amount) if patient.pending_amount else None,
            'total_amount': float(patient.total_amount) if patient.total_amount else None,
            'created_at': patient.created_at.isoformat(),
            'updated_at': patient.updated_at.isoformat()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patients_bp.route('/patients', methods=['POST'])
def create_patient():
    """Create a new patient"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['id', 'name', 'gender', 'disease', 'room_id', 'deposited_amount']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if patient ID already exists
        if Patient.query.get(data['id']):
            return jsonify({'error': 'Patient ID already exists'}), 400
            
        # Check if room is available
        room = Room.query.get(data['room_id'])
        if not room or room.status != 'available':
            return jsonify({'error': 'Selected room is not available'}), 400
            
        # Create new patient
        patient = Patient(
            id=data['id'],
            name=data['name'],
            gender=data['gender'],
            disease=data['disease'],
            room_id=data['room_id'],
            status='admitted',
            admission_date=datetime.utcnow(),
            deposited_amount=float(data['deposited_amount']),
            pending_amount=0.0,  # Will be calculated based on room charges
            total_amount=0.0,    # Will be calculated based on room charges
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        # Update room status
        room.status = 'occupied'
        
        db.session.add(patient)
        db.session.commit()
        
        return jsonify({
            'id': patient.id,
            'name': patient.name,
            'status': patient.status,
            'message': 'Patient created successfully'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@patients_bp.route('/patients/<string:patient_id>', methods=['PUT'])
def update_patient(patient_id):
    """Update an existing patient"""
    try:
        patient = Patient.query.get_or_404(patient_id)
        data = request.get_json()
        
        # Update patient fields
        if 'name' in data:
            patient.name = data['name']
        if 'gender' in data:
            patient.gender = data['gender']
        if 'disease' in data:
            patient.disease = data['disease']
        if 'deposited_amount' in data:
            patient.deposited_amount = float(data['deposited_amount'])
        
        # Handle room change if needed
        if 'room_id' in data and data['room_id'] != patient.room_id:
            new_room = Room.query.get(data['room_id'])
            if not new_room or new_room.status != 'available':
                return jsonify({'error': 'Selected room is not available'}), 400
                
            # Free up the old room
            if patient.room:
                patient.room.status = 'available'
            
            # Assign new room
            patient.room_id = data['room_id']
            new_room.status = 'occupied'
        
        patient.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'id': patient.id,
            'name': patient.name,
            'message': 'Patient updated successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@patients_bp.route('/patients/<string:patient_id>/status', methods=['PATCH'])
def update_patient_status(patient_id):
    """Update patient status"""
    try:
        patient = Patient.query.get_or_404(patient_id)
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
            
        new_status = data['status']
        if new_status not in ['admitted', 'discharged', 'pending']:
            return jsonify({'error': 'Invalid status'}), 400
            
        # Handle discharge
        if new_status == 'discharged' and patient.room:
            patient.room.status = 'available'
            patient.room_id = None
        
        patient.status = new_status
        patient.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'id': patient.id,
            'status': patient.status,
            'message': f'Patient status updated to {patient.status}'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@patients_bp.route('/patients/<string:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    """Delete a patient"""
    try:
        patient = Patient.query.get_or_404(patient_id)
        
        # Free up the room if patient is in one
        if patient.room:
            patient.room.status = 'available'
        
        db.session.delete(patient)
        db.session.commit()
        
        return '', 204
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@patients_bp.route('/patients/stats', methods=['GET'])
def get_patient_stats():
    """Get patient statistics"""
    try:
        total = Patient.query.count()
        admitted = Patient.query.filter_by(status='admitted').count()
        discharged = Patient.query.filter_by(status='discharged').count()
        pending = Patient.query.filter_by(status='pending').count()
        
        # Calculate revenue and pending payments
        result = db.session.query(
            db.func.sum(Patient.deposited_amount).label('total_deposits'),
            db.func.sum(Patient.total_amount - Patient.deposited_amount).label('total_pending')
        ).first()
        
        total_revenue = float(result[0]) if result[0] else 0.0
        pending_payments = float(result[1]) if result[1] else 0.0
        
        return jsonify({
            'total': total,
            'admitted': admitted,
            'discharged': discharged,
            'pending': pending,
            'total_revenue': total_revenue,
            'pending_payments': pending_payments
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patients_bp.route('/patients/search', methods=['GET'])
def search_patients():
    """Search patients by name, ID, or room number"""
    try:
        query = request.args.get('q', '')
        if not query:
            return jsonify([]), 200
            
        search = f"%{query}%"
        patients = Patient.query.filter(
            (Patient.name.ilike(search)) |
            (Patient.id.ilike(search)) |
            (Patient.room.has(Room.room_number.ilike(search)))
        ).limit(10).all()
        
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'room_number': p.room.room_number if p.room else None,
            'status': p.status
        } for p in patients]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
