from database import db
from datetime import datetime

class LabReport(db.Model):
    __tablename__ = 'lab_reports'
    
    id = db.Column(db.BigInteger, primary_key=True)
    lab_no = db.Column(db.String(30), unique=True)
    date = db.Column(db.Date)
    patient_id = db.Column(db.BigInteger, db.ForeignKey('patients.id'), nullable=False)
    category = db.Column(db.Enum('OutPatient', 'InPatient'), default='OutPatient')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'lab_no': self.lab_no,
            'date': str(self.date) if self.date else None,
            'patient_id': self.patient_id,
            'category': self.category
        }