from .base import BaseModel
from app import db

class Room(BaseModel):
    """Room model for storing room information"""
    __tablename__ = 'rooms'
    
    room_no = db.Column(db.String(20), unique=True, nullable=False)
    room_type = db.Column(db.String(50), nullable=False)  # General, ICU, Private, Semi-private
    bed_type = db.Column(db.String(50))  # Single, Double, etc.
    floor = db.Column(db.Integer)
    ward = db.Column(db.String(50))
    is_available = db.Column(db.Boolean, default=True)
    price_per_day = db.Column(db.Float, default=0.0)
    
    # Relationships
    appointments = db.relationship('Appointment', backref='room', lazy=True)
    
    def __repr__(self):
        return f'<Room {self.room_no} ({self.room_type})>'
    
    def to_dict(self):
        """Convert room object to dictionary"""
        return {
            'id': self.id,
            'room_no': self.room_no,
            'room_type': self.room_type,
            'bed_type': self.bed_type,
            'floor': self.floor,
            'ward': self.ward,
            'is_available': self.is_available,
            'price_per_day': self.price_per_day,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
