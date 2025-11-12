from datetime import datetime
from .base import BaseModel
from app import db

class Appointment(BaseModel):
    """Appointment model for scheduling patient visits"""
    __tablename__ = 'appointments'
    
    appointment_id = db.Column(db.String(20), unique=True, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    appointment_date = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='Scheduled')  # Scheduled, Completed, Cancelled, No-show
    reason = db.Column(db.Text)
    notes = db.Column(db.Text)
    
    # Relationships
    prescriptions = db.relationship('Prescription', backref='appointment', lazy=True)
    
    def __repr__(self):
        return f'<Appointment {self.appointment_id} - {self.status}>'
    
    def to_dict(self):
        """Convert appointment object to dictionary"""
        return {
            'id': self.id,
            'appointment_id': self.appointment_id,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id,
            'room_id': self.room_id,
            'appointment_date': self.appointment_date.isoformat() if self.appointment_date else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'status': self.status,
            'reason': self.reason,
            'notes': self.notes,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
