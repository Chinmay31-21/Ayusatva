from .base import BaseModel
from app import db

class BillItem(BaseModel):
    """BillItem model for storing individual line items in a bill"""
    __tablename__ = 'bill_items'
    
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), nullable=False)
    item_type = db.Column(db.String(50), nullable=False)  # Consultation, Medicine, Test, Room, Procedure, etc.
    description = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Float, default=1.0)
    unit_price = db.Column(db.Float, default=0.0)
    amount = db.Column(db.Float, default=0.0)
    item_date = db.Column(db.Date, nullable=False)
    reference_id = db.Column(db.Integer)  # ID of the related item (prescription, lab report, etc.)
    
    def __repr__(self):
        return f'<BillItem {self.item_type} - {self.amount}>'
    
    def calculate_amount(self):
        """Calculate the total amount for this line item"""
        self.amount = self.quantity * self.unit_price
        return self.amount
    
    def to_dict(self):
        """Convert bill item object to dictionary"""
        return {
            'id': self.id,
            'bill_id': self.bill_id,
            'item_type': self.item_type,
            'description': self.description,
            'quantity': self.quantity,
            'unit_price': self.unit_price,
            'amount': self.amount,
            'item_date': self.item_date.isoformat() if self.item_date else None,
            'reference_id': self.reference_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
