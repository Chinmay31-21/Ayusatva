from database import db
from datetime import datetime

class Doctor(db.Model):
    __tablename__ = 'doctors'
    
    id = db.Column(db.BigInteger, primary_key=True)
    doctor_id = db.Column(db.String(20), unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    middle_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    name = db.Column(db.String(255))
    degree = db.Column(db.String(100))
    speciality = db.Column(db.String(200))
    contact_no = db.Column(db.String(30))
    date_of_joining = db.Column(db.Date)
    work_experience = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    prescriptions = db.relationship('Prescription', backref='doctor', cascade='all, delete-orphan')
    treatments = db.relationship('Treatment', backref='doctor', cascade='all, delete-orphan')
    healthcare = db.relationship('HealthCare', backref='doctor', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'name': self.name,
            'degree': self.degree,
            'speciality': self.speciality,
            'contact_no': self.contact_no,
            'date_of_joining': str(self.date_of_joining) if self.date_of_joining else None,
            'work_experience': self.work_experience
        }