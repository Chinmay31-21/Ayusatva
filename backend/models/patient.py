from .base import BaseModel
from app import db

class Patient(BaseModel):
    """Patient model for storing patient information"""
    __tablename__ = 'patients'
    
    patient_id = db.Column(db.String(20), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    blood_group = db.Column(db.String(5))
    height = db.Column(db.Float)
    weight = db.Column(db.Float)
    bmi = db.Column(db.Float)
    phone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(120), unique=True)
    address = db.Column(db.Text)
    emergency_contact = db.Column(db.String(15))
    
    # Relationships
    appointments = db.relationship('Appointment', backref='patient', lazy=True)
    prescriptions = db.relationship('Prescription', backref='patient', lazy=True)
    lab_reports = db.relationship('LabReport', backref='patient', lazy=True)
    bills = db.relationship('Bill', backref='patient', lazy=True)
    
    def __repr__(self):
        return f'<Patient {self.first_name} {self.last_name}>'
    
    def to_dict(self):
        """Convert patient object to dictionary"""
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'gender': self.gender,
            'blood_group': self.blood_group,
            'height': self.height,
            'weight': self.weight,
            'bmi': self.bmi,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'emergency_contact': self.emergency_contact,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
