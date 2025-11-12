from database import db
from datetime import datetime

class Employee(db.Model):
    __tablename__ = 'employees'
    
    id = db.Column(db.BigInteger, primary_key=True)
    employee_id = db.Column(db.String(20), unique=True)
    first_name = db.Column(db.String(100))
    middle_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    name = db.Column(db.String(255))
    email_id = db.Column(db.String(150))
    phone_no = db.Column(db.String(30))
    role = db.Column(db.Enum('Doctor', 'Nurse', 'Chemist', 'Lab Technician', 'Receptionist', 'Attendant', 'Admin'), default='Receptionist')
    date_of_birth = db.Column(db.Date)
    date_of_joining = db.Column(db.Date)
    salary = db.Column(db.Numeric(12, 2))
    status = db.Column(db.Enum('Active', 'Inactive', 'On Leave'), default='Active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'name': self.name,
            'email_id': self.email_id,
            'phone_no': self.phone_no,
            'role': self.role,
            'date_of_joining': str(self.date_of_joining) if self.date_of_joining else None,
            'salary': float(self.salary) if self.salary else 0,
            'status': self.status
        }