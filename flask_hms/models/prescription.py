from database import db
from datetime import datetime

class Prescription(db.Model):
    __tablename__ = 'prescriptions'
    
    id = db.Column(db.BigInteger, primary_key=True)
    prescription_id = db.Column(db.String(30), unique=True)
    patient_id = db.Column(db.BigInteger, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.BigInteger, db.ForeignKey('doctors.id'))
    shop_id = db.Column(db.BigInteger, db.ForeignKey('chemists.id'))
    medicine_name = db.Column(db.String(255))
    dosage = db.Column(db.String(100))
    frequency = db.Column(db.String(100))
    duration = db.Column(db.String(100))
    phone_no = db.Column(db.String(30))
    email_id = db.Column(db.String(150))
    bmi = db.Column(db.Numeric(5, 2))
    status = db.Column(db.Enum('Pending', 'Dispensed', 'Cancelled'), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'prescription_id': self.prescription_id,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'medicine_name': self.medicine_name,
            'dosage': self.dosage,
            'frequency': self.frequency,
            'duration': self.duration,
            'status': self.status
        }