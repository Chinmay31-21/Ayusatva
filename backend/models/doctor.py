from .base import BaseModel
from app import db

class Doctor(BaseModel):
    """Doctor model for storing doctor information"""
    __tablename__ = 'doctors'
    
    doctor_id = db.Column(db.String(20), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    qualification = db.Column(db.String(100))
    years_of_experience = db.Column(db.Integer)
    phone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.Text)
    consultation_fee = db.Column(db.Float, default=0.0)
    is_available = db.Column(db.Boolean, default=True)
    
    # Relationships
    appointments = db.relationship('Appointment', backref='doctor', lazy=True)
    prescriptions = db.relationship('Prescription', backref='prescribing_doctor', lazy=True)
    
    def __repr__(self):
        return f'<Dr. {self.first_name} {self.last_name} ({self.specialization})>'
    
    def to_dict(self):
        """Convert doctor object to dictionary"""
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'specialization': self.specialization,
            'qualification': self.qualification,
            'years_of_experience': self.years_of_experience,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'consultation_fee': self.consultation_fee,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
