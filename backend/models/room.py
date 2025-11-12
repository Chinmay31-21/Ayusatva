from .base import BaseModel, db

class Room(BaseModel):
    """Room model for storing room information"""
    __tablename__ = 'rooms'
    
    room_number = db.Column(db.String(20), unique=True, nullable=False, index=True)
    room_type = db.Column(db.Enum('General', 'Private', 'ICU', 'Semi-Private', 'Ward'), nullable=False)
    status = db.Column(db.Enum('available', 'occupied', 'maintenance'), default='available')
    floor = db.Column(db.String(10))
    rate_per_day = db.Column(db.Float, default=0.0)
    
    def __repr__(self):
        return f'<Room {self.room_number} ({self.room_type})>'
    
    def to_dict(self):
        """Convert room object to dictionary"""
        return {
            'id': self.id,
            'room_number': self.room_number,
            'room_type': self.room_type,
            'status': self.status,
            'floor': self.floor,
            'rate_per_day': float(self.rate_per_day) if self.rate_per_day is not None else 0.0,
            'created_at': self.created_at.isoformat() if hasattr(self, 'created_at') else None,
            'updated_at': self.updated_at.isoformat() if hasattr(self, 'updated_at') else None
        }
    
    def update_status(self, new_status):
        """Update room status with validation"""
        valid_statuses = ['available', 'occupied', 'maintenance']
        if new_status not in valid_statuses:
            raise ValueError(f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
        self.status = new_status
    
    def is_available(self):
        """Check if room is available for assignment"""
        return self.status == 'available'
