from database import db
from datetime import datetime

class Treatment(db.Model):
    __tablename__ = 'treatments'
    
    id = db.Column(db.BigInteger, primary_key=True)
    doctor_id = db.Column(db.BigInteger, db.ForeignKey('doctors.id'), nullable=False)
    patient_id = db.Column(db.BigInteger, db.ForeignKey('patients.id'), nullable=False)
    treatment_date = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text)
    status = db.Column(db.Enum('Pending', 'In Progress', 'Completed', 'Cancelled'), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'patient_id': self.patient_id,
            'treatment_date': str(self.treatment_date),
            'notes': self.notes,
            'status': self.status
        }