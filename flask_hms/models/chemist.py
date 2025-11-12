from database import db
from datetime import datetime

class Chemist(db.Model):
    __tablename__ = 'chemists'
    
    id = db.Column(db.BigInteger, primary_key=True)
    shop_id = db.Column(db.String(20), unique=True)
    first_name = db.Column(db.String(100))
    middle_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    name = db.Column(db.String(255))
    phone_no = db.Column(db.String(30))
    email_id = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    prescriptions = db.relationship('Prescription', backref='chemist', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'shop_id': self.shop_id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'name': self.name,
            'phone_no': self.phone_no,
            'email_id': self.email_id
        }