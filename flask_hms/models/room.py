from database import db
from datetime import datetime

class Room(db.Model):
    __tablename__ = 'rooms'
    
    id = db.Column(db.BigInteger, primary_key=True)
    room_no = db.Column(db.String(20), unique=True, nullable=False)
    status = db.Column(db.Enum('Normal', 'Emergency', 'Critical'), default='Normal')
    room_type = db.Column(db.Enum('Normal', 'ICU', 'Semi-Private', 'Private'), default='Normal')
    price_per_day = db.Column(db.Numeric(10, 2), default=0)
    bed_count_total = db.Column(db.Integer, default=1)
    bed_count_remaining = db.Column(db.Integer, default=1)
    health_card = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    in_patients = db.relationship('InPatient', backref='room', cascade='all, delete-orphan')
    charges = db.relationship('Charge', backref='room', cascade='all, delete-orphan')
    bills = db.relationship('Bill', backref='room', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'room_no': self.room_no,
            'status': self.status,
            'room_type': self.room_type,
            'price_per_day': float(self.price_per_day) if self.price_per_day else 0,
            'bed_count_total': self.bed_count_total,
            'bed_count_remaining': self.bed_count_remaining,
            'health_card': self.health_card
        }