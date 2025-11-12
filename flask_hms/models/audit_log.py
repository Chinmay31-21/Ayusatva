from database import db
from datetime import datetime
import json

class AuditLog(db.Model):
    __tablename__ = 'audit_logs'
    
    id = db.Column(db.BigInteger, primary_key=True)
    actor_id = db.Column(db.BigInteger)
    actor_role = db.Column(db.String(80))
    action = db.Column(db.String(100), nullable=False)
    entity_type = db.Column(db.String(100), nullable=False)
    entity_id = db.Column(db.BigInteger, nullable=False)
    old_values = db.Column(db.JSON)
    new_values = db.Column(db.JSON)
    payload = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'actor_id': self.actor_id,
            'actor_role': self.actor_role,
            'action': self.action,
            'entity_type': self.entity_type,
            'entity_id': self.entity_id,
            'old_values': self.old_values,
            'new_values': self.new_values,
            'payload': self.payload,
            'created_at': str(self.created_at)
        }