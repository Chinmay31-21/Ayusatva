from .base import BaseModel
from app import db

class Bill(BaseModel):
    """Bill model for storing patient billing information"""
    __tablename__ = 'bills'
    
    bill_number = db.Column(db.String(20), unique=True, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    bill_date = db.Column(db.Date, nullable=False)
    due_date = db.Column(db.Date)
    subtotal = db.Column(db.Float, default=0.0)
    tax_amount = db.Column(db.Float, default=0.0)
    discount = db.Column(db.Float, default=0.0)
    total_amount = db.Column(db.Float, default=0.0)
    paid_amount = db.Column(db.Float, default=0.0)
    balance = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(20), default='Pending')  # Pending, Partially Paid, Paid, Cancelled
    payment_method = db.Column(db.String(50))
    payment_status = db.Column(db.String(20))  # Pending, Completed, Failed, Refunded
    notes = db.Column(db.Text)
    
    # Relationships
    bill_items = db.relationship('BillItem', backref='bill', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Bill {self.bill_number} - {self.status}>'
    
    def calculate_totals(self):
        """Calculate subtotal, tax, and total amounts"""
        self.subtotal = sum(item.amount for item in self.bill_items)
        self.total_amount = self.subtotal + self.tax_amount - self.discount
        self.balance = self.total_amount - self.paid_amount
        
        # Update status based on payment
        if self.paid_amount <= 0:
            self.status = 'Pending'
        elif self.balance <= 0:
            self.status = 'Paid'
        else:
            self.status = 'Partially Paid'
    
    def to_dict(self):
        """Convert bill object to dictionary"""
        self.calculate_totals()  # Ensure totals are up to date
        
        return {
            'id': self.id,
            'bill_number': self.bill_number,
            'patient_id': self.patient_id,
            'bill_date': self.bill_date.isoformat() if self.bill_date else None,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'subtotal': self.subtotal,
            'tax_amount': self.tax_amount,
            'discount': self.discount,
            'total_amount': self.total_amount,
            'paid_amount': self.paid_amount,
            'balance': self.balance,
            'status': self.status,
            'payment_method': self.payment_method,
            'payment_status': self.payment_status,
            'notes': self.notes,
            'bill_items': [item.to_dict() for item in self.bill_items],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
