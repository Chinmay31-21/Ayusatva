from database import db
from datetime import datetime

class Charge(db.Model):
    __tablename__ = 'charges'
    
    id = db.Column(db.BigInteger, primary_key=True)
    room_id = db.Column(db.BigInteger, db.ForeignKey('rooms.id'), nullable=False)
    amount = db.Column(db.Numeric(12, 2), nullable=False)
    category = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'amount': float(self.amount) if self.amount else 0,
            'category': self.category
        }