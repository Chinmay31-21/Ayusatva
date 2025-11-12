from database import db
from datetime import datetime

class Nurse(db.Model):
    __tablename__ = 'nurses'
    
    id = db.Column(db.BigInteger, primary_key=True)
    nurse_id = db.Column(db.String(20), unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    middle_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    name = db.Column(db.String(255))
    degree = db.Column(db.String(100))
    speciality = db.Column(db.String(200))
    contact_no = db.Column(db.String(30))
    date_of_birth = db.Column(db.Date)
    work_experience = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    healthcare = db.relationship('HealthCare', backref='nurse', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'nurse_id': self.nurse_id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'name': self.name,
            'degree': self.degree,
            'speciality': self.speciality,
            'contact_no': self.contact_no,
            'date_of_birth': str(self.date_of_birth) if self.date_of_birth else None,
            'work_experience': self.work_experience
        }