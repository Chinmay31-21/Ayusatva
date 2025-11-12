from database import db
from datetime import datetime

class InPatient(db.Model):
    __tablename__ = 'in_patients'
    
    id = db.Column(db.BigInteger, primary_key=True)
    patient_id = db.Column(db.BigInteger, db.ForeignKey('patients.id'), unique=True, nullable=False)
    date_of_admission = db.Column(db.DateTime, nullable=False)
    date_of_discharge = db.Column(db.DateTime)
    room_id = db.Column(db.BigInteger, db.ForeignKey('rooms.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'date_of_admission': str(self.date_of_admission),
            'date_of_discharge': str(self.date_of_discharge) if self.date_of_discharge else None,
            'room_id': self.room_id
        }