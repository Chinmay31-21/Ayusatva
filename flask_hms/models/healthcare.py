from database import db
from datetime import datetime

class HealthCare(db.Model):
    __tablename__ = 'healthcare'
    
    id = db.Column(db.BigInteger, primary_key=True)
    doctor_id = db.Column(db.BigInteger, db.ForeignKey('doctors.id'), nullable=False)
    nurse_id = db.Column(db.BigInteger, db.ForeignKey('nurses.id'))
    patient_id = db.Column(db.BigInteger, db.ForeignKey('patients.id'), nullable=False)
    treatment_id = db.Column(db.BigInteger, db.ForeignKey('treatments.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'nurse_id': self.nurse_id,
            'patient_id': self.patient_id,
            'treatment_id': self.treatment_id
        }