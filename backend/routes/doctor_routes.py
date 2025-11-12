from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.doctor import Doctor
from app import db
import uuid

doctor_bp = Blueprint('doctor', __name__)

# Helper function to generate doctor ID
def generate_doctor_id():
    return f"DOC-{str(uuid.uuid4())[:8].upper()}"

# Create a new doctor
@doctor_bp.route('', methods=['POST'])
@jwt_required()
def create_doctor():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['first_name', 'last_name', 'specialization', 'phone', 'email']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    
    try:
        # Create new doctor
        doctor = Doctor(
            doctor_id=generate_doctor_id(),
            first_name=data['first_name'],
            middle_name=data.get('middle_name', ''),
            last_name=data['last_name'],
            specialization=data['specialization'],
            qualification=data.get('qualification'),
            years_of_experience=data.get('years_of_experience'),
            phone=data['phone'],
            email=data['email'],
            address=data.get('address'),
            consultation_fee=data.get('consultation_fee', 0.0),
            is_available=data.get('is_available', True)
        )
        
        db.session.add(doctor)
        db.session.commit()
        
        return jsonify(doctor.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get all doctors
@doctor_bp.route('', methods=['GET'])
@jwt_required()
def get_doctors():
    try:
        specialization = request.args.get('specialization')
        available = request.args.get('available')
        
        query = Doctor.query
        
        if specialization:
            query = query.filter_by(specialization=specialization)
        
        if available and available.lower() == 'true':
            query = query.filter_by(is_available=True)
        
        doctors = query.all()
        return jsonify([doctor.to_dict() for doctor in doctors]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get a specific doctor by ID
@doctor_bp.route('/<int:doctor_id>', methods=['GET'])
@jwt_required()
def get_doctor(doctor_id):
    try:
        doctor = Doctor.query.get_or_404(doctor_id)
        return jsonify(doctor.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update a doctor
@doctor_bp.route('/<int:doctor_id>', methods=['PUT'])
@jwt_required()
def update_doctor(doctor_id):
    try:
        doctor = Doctor.query.get_or_404(doctor_id)
        data = request.get_json()
        
        # Update doctor fields
        update_fields = [
            'first_name', 'middle_name', 'last_name', 'specialization',
            'qualification', 'years_of_experience', 'phone', 'email',
            'address', 'consultation_fee', 'is_available'
        ]
        
        for field in update_fields:
            if field in data:
                setattr(doctor, field, data[field])
        
        db.session.commit()
        return jsonify(doctor.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a doctor
@doctor_bp.route('/<int:doctor_id>', methods=['DELETE'])
@jwt_required()
def delete_doctor(doctor_id):
    try:
        doctor = Doctor.query.get_or_404(doctor_id)
        db.session.delete(doctor)
        db.session.commit()
        return jsonify({"message": "Doctor deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get doctor's schedule (appointments)
@doctor_bp.route('/<int:doctor_id>/appointments', methods=['GET'])
@jwt_required()
def get_doctor_appointments(doctor_id):
    try:
        from models.appointment import Appointment
        
        # Get query parameters
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        status = request.args.get('status')
        
        query = Appointment.query.filter_by(doctor_id=doctor_id)
        
        if start_date:
            query = query.filter(Appointment.appointment_date >= start_date)
        if end_date:
            query = query.filter(Appointment.appointment_date <= end_date)
        if status:
            query = query.filter_by(status=status)
            
        appointments = query.order_by(Appointment.appointment_date).all()
        return jsonify([appointment.to_dict() for appointment in appointments]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get available time slots for a doctor on a specific date
@doctor_bp.route('/<int:doctor_id>/available-slots', methods=['GET'])
@jwt_required()
def get_available_slots(doctor_id):
    try:
        from datetime import datetime, timedelta
        from models.appointment import Appointment
        
        date_str = request.args.get('date')
        if not date_str:
            return jsonify({"error": "Date parameter is required"}), 400
            
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
        
        # Get doctor's working hours (simplified - in a real app, this would come from a schedule)
        start_time = datetime.combine(date, datetime.strptime('09:00', '%H:%M').time())
        end_time = datetime.combine(date, datetime.strptime('17:00', '%H:%M').time())
        
        # Get existing appointments for the doctor on this date
        appointments = Appointment.query.filter(
            Appointment.doctor_id == doctor_id,
            Appointment.appointment_date.between(start_time, end_time),
            Appointment.status.in_(['Scheduled', 'In Progress'])
        ).all()
        
        # Generate time slots (every 30 minutes)
        time_slots = []
        current_time = start_time
        while current_time < end_time:
            time_slots.append(current_time)
            current_time += timedelta(minutes=30)
        
        # Filter out booked slots
        booked_slots = [appt.appointment_date for appt in appointments]
        available_slots = [
            slot.strftime('%Y-%m-%dT%H:%M:%S')
            for slot in time_slots
            if slot not in booked_slots
        ]
        
        return jsonify({
            "doctor_id": doctor_id,
            "date": date_str,
            "available_slots": available_slots
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
