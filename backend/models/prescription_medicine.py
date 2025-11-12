from .base import BaseModel
from app import db

class PrescriptionMedicine(BaseModel):
    """PrescriptionMedicine model for storing medicine details in a prescription"""
    __tablename__ = 'prescription_medicines'
    
    prescription_id = db.Column(db.Integer, db.ForeignKey('prescriptions.id'), nullable=False)
    medicine_name = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(50), nullable=False)  # e.g., 500mg, 10ml
    frequency = db.Column(db.String(50), nullable=False)  # e.g., Once daily, Twice daily
    duration = db.Column(db.String(50), nullable=False)  # e.g., 7 days, 2 weeks
    instructions = db.Column(db.Text)
    quantity = db.Column(db.Integer, default=1)
    
    def __repr__(self):
        return f'<PrescriptionMedicine {self.medicine_name}>'
    
    def to_dict(self):
        """Convert prescription medicine object to dictionary"""
        return {
            'id': self.id,
            'prescription_id': self.prescription_id,
            'medicine_name': self.medicine_name,
            'dosage': self.dosage,
            'frequency': self.frequency,
            'duration': self.duration,
            'instructions': self.instructions,
            'quantity': self.quantity,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
