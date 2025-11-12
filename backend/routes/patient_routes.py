from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.patient import Patient
from app import db
from datetime import datetime
import uuid

patient_bp = Blueprint('patient', __name__)

# Helper function to generate patient ID
def generate_patient_id():
    return f"PAT-{str(uuid.uuid4())[:8].upper()}"

# Create a new patient
@patient_bp.route('', methods=['POST'])
@jwt_required()
def create_patient():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['first_name', 'last_name', 'date_of_birth', 'gender', 'phone']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    
    try:
        # Create new patient
        patient = Patient(
            patient_id=generate_patient_id(),
            first_name=data['first_name'],
            middle_name=data.get('middle_name', ''),
            last_name=data['last_name'],
            date_of_birth=datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date(),
            gender=data['gender'],
            blood_group=data.get('blood_group'),
            height=data.get('height'),
            weight=data.get('weight'),
            bmi=data.get('bmi'),
            phone=data['phone'],
            email=data.get('email'),
            address=data.get('address'),
            emergency_contact=data.get('emergency_contact')
        )
        
        db.session.add(patient)
        db.session.commit()
        
        return jsonify(patient.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Get all patients
@patient_bp.route('', methods=['GET'])
@jwt_required()
def get_patients():
    try:
        patients = Patient.query.all()
        return jsonify([patient.to_dict() for patient in patients]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get a specific patient by ID
@patient_bp.route('/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient(patient_id):
    try:
        patient = Patient.query.get_or_404(patient_id)
        return jsonify(patient.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update a patient
@patient_bp.route('/<int:patient_id>', methods=['PUT'])
@jwt_required()
def update_patient(patient_id):
    try:
        patient = Patient.query.get_or_404(patient_id)
        data = request.get_json()
        
        # Update patient fields
        update_fields = [
            'first_name', 'middle_name', 'last_name', 'gender', 'blood_group',
            'height', 'weight', 'bmi', 'phone', 'email', 'address', 'emergency_contact'
        ]
        
        for field in update_fields:
            if field in data:
                setattr(patient, field, data[field])
        
        # Handle date_of_birth separately
        if 'date_of_birth' in data:
            patient.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
        
        db.session.commit()
        return jsonify(patient.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a patient
@patient_bp.route('/<int:patient_id>', methods=['DELETE'])
@jwt_required()
def delete_patient(patient_id):
    try:
        patient = Patient.query.get_or_404(patient_id)
        db.session.delete(patient)
        db.session.commit()
        return jsonify({"message": "Patient deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Search patients
@patient_bp.route('/search', methods=['GET'])
@jwt_required()
def search_patients():
    try:
        query = request.args.get('q', '').strip()
        if not query:
            return jsonify({"error": "Search query is required"}), 400
        
        # Search by patient_id, name, phone, or email
        patients = Patient.query.filter(
            (Patient.patient_id.ilike(f'%{query}%')) |
            (Patient.first_name.ilike(f'%{query}%')) |
            (Patient.last_name.ilike(f'%{query}%')) |
            (Patient.phone.ilike(f'%{query}%')) |
            (Patient.email.ilike(f'%{query}%'))
        ).all()
        
        return jsonify([patient.to_dict() for patient in patients]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
