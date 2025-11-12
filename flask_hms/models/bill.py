from database import db
from datetime import datetime

class Bill(db.Model):
    __tablename__ = 'bills'
    
    id = db.Column(db.BigInteger, primary_key=True)
    bill_id = db.Column(db.String(30), unique=True)
    patient_id = db.Column(db.BigInteger, db.ForeignKey('patients.id'), nullable=False)
    room_id = db.Column(db.BigInteger, db.ForeignKey('rooms.id'))
    amount = db.Column(db.Numeric(12, 2), default=0)
    health_card = db.Column(db.String(50))
    patient_type = db.Column(db.Enum('InPatient', 'OutPatient'), default='OutPatient')
    status = db.Column(db.Enum('Open', 'Finalized', 'Paid', 'Cancelled'), default='Open')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'bill_id': self.bill_id,
            'patient_id': self.patient_id,
            'room_id': self.room_id,
            'amount': float(self.amount) if self.amount else 0,
            'patient_type': self.patient_type,
            'status': self.status
        }