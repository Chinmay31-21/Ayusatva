from datetime import datetime
from app import db

class BaseModel(db.Model):
    """Base model class with common fields and methods"""
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def save(self):
        """Save the current model to the database"""
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        """Delete the current model from the database"""
        db.session.delete(self)
        db.session.commit()
    
    def update(self, **kwargs):
        """Update the current model with the given keyword arguments"""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        db.session.commit()
    
    @classmethod
    def get_all(cls):
        """Get all records of the model"""
        return cls.query.all()
    
    @classmethod
    def get_by_id(cls, id):
        """Get a record by its ID"""
        return cls.query.get_or_404(id)
