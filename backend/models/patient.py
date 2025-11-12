from datetime import datetime
from .base import BaseModel, db

class Patient(BaseModel):
    """Patient model for storing patient information"""
    __tablename__ = 'patients'
    
    name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.Enum('male', 'female', 'other'), nullable=False)
    disease = db.Column(db.String(200))
    status = db.Column(db.Enum('admitted', 'discharged', 'pending'), default='admitted')
    admission_date = db.Column(db.DateTime, default=datetime.utcnow)
    discharged_date = db.Column(db.DateTime, nullable=True)
    deposited_amount = db.Column(db.Float, default=0.0)
    pending_amount = db.Column(db.Float, default=0.0)
    total_amount = db.Column(db.Float, default=0.0)
    address = db.Column(db.String(200))
    emergency_contact = db.Column(db.String(20))
    
    # Relationships
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=True)
    room = db.relationship('Room', backref='patients')
    
    def __repr__(self):
        return f'<Patient {self.name} ({self.status})>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'gender': self.gender,
            'disease': self.disease,
            'status': self.status,
            'admission_date': self.admission_date.isoformat() if self.admission_date else None,
            'discharged_date': self.discharged_date.isoformat() if self.discharged_date else None,
            'deposited_amount': float(self.deposited_amount) if self.deposited_amount is not None else 0.0,
            'pending_amount': float(self.pending_amount) if self.pending_amount is not None else 0.0,
            'total_amount': float(self.total_amount) if self.total_amount is not None else 0.0,
            'room_id': self.room_id,
            'room_number': self.room.room_number if self.room else None,
            'address': self.address,
            'emergency_contact': self.emergency_contact,
            'created_at': self.created_at.isoformat() if hasattr(self, 'created_at') else None,
            'updated_at': self.updated_at.isoformat() if hasattr(self, 'updated_at') else None
        }
    
    def update_from_dict(self, data):
        """Update patient fields from a dictionary"""
        for field in ['name', 'gender', 'disease', 'status', 'deposited_amount', 
                     'pending_amount', 'total_amount', 'room_id', 'address', 'emergency_contact']:
            if field in data:
                setattr(self, field, data[field])
        
        if 'status' in data and data['status'] == 'discharged' and not self.discharged_date:
            self.discharged_date = datetime.utcnow()
