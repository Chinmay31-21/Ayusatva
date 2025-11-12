from flask import Blueprint, request, jsonify
from models.room import Room
from models.base import db

rooms_bp = Blueprint('rooms', __name__)

@rooms_bp.route('/rooms', methods=['GET'])
def get_rooms():
    """Get all rooms with optional filters"""
    try:
        status = request.args.get('status')
        room_type = request.args.get('type')
        
        query = Room.query
        
        if status:
            query = query.filter(Room.status == status)
            
        if room_type:
            query = query.filter(Room.room_type == room_type)
            
        rooms = query.all()
        return jsonify([room.to_dict() for room in rooms]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@rooms_bp.route('/rooms/<int:room_id>', methods=['GET'])
def get_room(room_id):
    """Get a single room by ID"""
    try:
        room = Room.query.get_or_404(room_id)
        return jsonify(room.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@rooms_bp.route('/rooms', methods=['POST'])
def create_room():
    """Create a new room"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['room_number', 'room_type', 'floor', 'rate_per_day']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
            
        # Check if room number already exists
        if Room.query.filter_by(room_number=data['room_number']).first():
            return jsonify({'error': 'Room number already exists'}), 400
            
        # Create new room
        room = Room(
            room_number=data['room_number'],
            room_type=data['room_type'],
            floor=data['floor'],
            rate_per_day=float(data['rate_per_day']),
            status=data.get('status', 'available')
        )
        
        db.session.add(room)
        db.session.commit()
        
        return jsonify(room.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@rooms_bp.route('/rooms/<int:room_id>', methods=['PUT'])
def update_room(room_id):
    """Update an existing room"""
    try:
        room = Room.query.get_or_404(room_id)
        data = request.get_json()
        
        # Update fields if provided
        if 'room_number' in data and data['room_number'] != room.room_number:
            # Check if new room number already exists
            if Room.query.filter(Room.room_number == data['room_number'], 
                               Room.id != room_id).first():
                return jsonify({'error': 'Room number already in use'}), 400
            room.room_number = data['room_number']
            
        if 'room_type' in data:
            room.room_type = data['room_type']
            
        if 'floor' in data:
            room.floor = data['floor']
            
        if 'rate_per_day' in data:
            room.rate_per_day = float(data['rate_per_day'])
            
        if 'status' in data:
            room.update_status(data['status'])
        
        db.session.commit()
        return jsonify(room.to_dict()), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@rooms_bp.route('/rooms/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    """Delete a room"""
    try:
        room = Room.query.get_or_404(room_id)
        
        # Check if room has patients
        if room.patients:
            return jsonify({
                'error': 'Cannot delete room with assigned patients. Reassign or discharge patients first.'
            }), 400
            
        db.session.delete(room)
        db.session.commit()
        
        return '', 204
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@rooms_bp.route('/rooms/available', methods=['GET'])
def get_available_rooms():
    """Get all available rooms"""
    try:
        rooms = Room.query.filter_by(status='available').all()
        return jsonify([room.to_dict() for room in rooms]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
