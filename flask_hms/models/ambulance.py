from database import db
from datetime import datetime

class Ambulance(db.Model):
    __tablename__ = 'ambulances'
    
    id = db.Column(db.BigInteger, primary_key=True)
    vehicle_no = db.Column(db.String(30), unique=True)
    driver_name = db.Column(db.String(150))
    driver_phone = db.Column(db.String(30))
    status = db.Column(db.Enum('Available', 'On Duty', 'Maintenance'), default='Available')
    last_dispatch_at = db.Column(db.DateTime)
    last_return_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'vehicle_no': self.vehicle_no,
            'driver_name': self.driver_name,
            'driver_phone': self.driver_phone,
            'status': self.status,
            'last_dispatch_at': str(self.last_dispatch_at) if self.last_dispatch_at else None,
            'last_return_at': str(self.last_return_at) if self.last_return_at else None
        }