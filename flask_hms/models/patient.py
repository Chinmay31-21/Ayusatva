from database import db
from datetime import datetime

class Patient(db.Model):
    __tablename__ = 'patients'
    
    id = db.Column(db.BigInteger, primary_key=True)
    patient_id = db.Column(db.String(20), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    middle_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    name = db.Column(db.String(255))
    date_of_birth = db.Column(db.Date)
    age = db.Column(db.Integer)
    gender = db.Column(db.Enum('Male', 'Female', 'Other'), default='Other')
    blood_group = db.Column(db.String(10))
    height = db.Column(db.Numeric(5, 2))
    weight = db.Column(db.Numeric(5, 2))
    bmi = db.Column(db.Numeric(5, 2))
    phone_no = db.Column(db.String(30))
    email_id = db.Column(db.String(150))
    address = db.Column(db.Text)
    building = db.Column(db.String(100))
    street = db.Column(db.String(100))
    flat = db.Column(db.String(50))
    disease = db.Column(db.String(255))
    category = db.Column(db.Enum('OutPatient', 'InPatient'), default='OutPatient')
    amount = db.Column(db.Numeric(12, 2), default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    in_patient = db.relationship('InPatient', uselist=False, backref='patient', cascade='all, delete-orphan')
    out_patient = db.relationship('OutPatient', uselist=False, backref='patient', cascade='all, delete-orphan')
    prescriptions = db.relationship('Prescription', backref='patient', cascade='all, delete-orphan')
    lab_reports = db.relationship('LabReport', backref='patient', cascade='all, delete-orphan')
    bills = db.relationship('Bill', backref='patient', cascade='all, delete-orphan')
    treatments = db.relationship('Treatment', backref='patient', cascade='all, delete-orphan')
    healthcare = db.relationship('HealthCare', backref='patient', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'name': self.name,
            'date_of_birth': str(self.date_of_birth) if self.date_of_birth else None,
            'age': self.age,
            'gender': self.gender,
            'blood_group': self.blood_group,
            'height': float(self.height) if self.height else None,
            'weight': float(self.weight) if self.weight else None,
            'bmi': float(self.bmi) if self.bmi else None,
            'phone_no': self.phone_no,
            'email_id': self.email_id,
            'address': self.address,
            'disease': self.disease,
            'category': self.category,
            'amount': float(self.amount) if self.amount else 0
        }