from .base import BaseModel
from app import db

class Prescription(BaseModel):
    """Prescription model for storing patient prescriptions"""
    __tablename__ = 'prescriptions'
    
    prescription_id = db.Column(db.String(20), unique=True, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'))
    diagnosis = db.Column(db.Text)
    notes = db.Column(db.Text)
    status = db.Column(db.String(20), default='Active')  # Active, Filled, Expired, Cancelled
    
    # Relationships
    medicines = db.relationship('PrescriptionMedicine', backref='prescription', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Prescription {self.prescription_id} - {self.status}>'
    
    def to_dict(self):
        """Convert prescription object to dictionary"""
        return {
            'id': self.id,
            'prescription_id': self.prescription_id,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'appointment_id': self.appointment_id,
            'diagnosis': self.diagnosis,
            'notes': self.notes,
            'status': self.status,
            'medicines': [med.to_dict() for med in self.medicines],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
