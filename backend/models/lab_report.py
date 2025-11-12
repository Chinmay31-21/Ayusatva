from .base import BaseModel
from app import db

class LabReport(BaseModel):
    """LabReport model for storing patient lab test results"""
    __tablename__ = 'lab_reports'
    
    report_id = db.Column(db.String(20), unique=True, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    test_name = db.Column(db.String(200), nullable=False)
    test_date = db.Column(db.DateTime, nullable=False)
    result_date = db.Column(db.DateTime)
    test_result = db.Column(db.Text)
    reference_range = db.Column(db.String(200))
    status = db.Column(db.String(20), default='Pending')  # Pending, Completed, Cancelled
    notes = db.Column(db.Text)
    test_type = db.Column(db.String(100))  # Blood, Urine, X-ray, etc.
    lab_technician = db.Column(db.String(100))
    
    def __repr__(self):
        return f'<LabReport {self.report_id} - {self.test_name}>'
    
    def to_dict(self):
        """Convert lab report object to dictionary"""
        return {
            'id': self.id,
            'report_id': self.report_id,
            'patient_id': self.patient_id,
            'test_name': self.test_name,
            'test_date': self.test_date.isoformat() if self.test_date else None,
            'result_date': self.result_date.isoformat() if self.result_date else None,
            'test_result': self.test_result,
            'reference_range': self.reference_range,
            'status': self.status,
            'notes': self.notes,
            'test_type': self.test_type,
            'lab_technician': self.lab_technician,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
