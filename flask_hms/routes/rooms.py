from flask import request, jsonify
from routes import rooms_bp
from database import db
from models.room import Room
from app import socketio
from services.audit_service import log_action

@rooms_bp.route('', methods=['GET'])
def get_rooms():
    """Get all rooms with optional filtering"""
    status = request.args.get('status')
    room_type = request.args.get('type')
    available_only = request.args.get('available', False, type=bool)
    
    query = Room.query
    
    if status:
        query = query.filter_by(status=status)
    if room_type:
        query = query.filter_by(room_type=room_type)
    if available_only:
        query = query.filter(Room.bed_count_remaining > 0)
    
    rooms = query.all()
    
    return jsonify({
        'success': True,
        'data': [r.to_dict() for r in rooms]
    }), 200

@rooms_bp.route('/<int:room_id>', methods=['GET'])
def get_room(room_id):
    """Get single room with occupancy details"""
    room = Room.query.get_or_404(room_id)
    
    data = room.to_dict()
    data['occupants'] = [p.to_dict() for p in room.patients] if room.in_patients else []
    
    return jsonify({'success': True, 'data': data}), 200

@rooms_bp.route('', methods=['POST'])
def create_room():
    """Create new room"""
    data = request.get_json()
    
    try:
        if not data.get('room_no'):
            return jsonify({'success': False, 'message': 'room_no is required'}), 400
        
        room = Room(
            room_no=data.get('room_no'),
            status=data.get('status', 'Normal'),
            room_type=data.get('room_type', 'Normal'),
            price_per_day=data.get('price_per_day', 0),
            bed_count_total=data.get('bed_count_total', 1),
            bed_count_remaining=data.get('bed_count_total', 1),
            health_card=data.get('health_card')
        )
        
        db.session.add(room)
        db.session.commit()
        
        log_action(
            actor_id=None,
            actor_role='Admin',
            action='room_created',
            entity_type='Room',
            entity_id=room.id,
            payload=room.to_dict()
        )
        
        socketio.emit('room_created', room.to_dict(), broadcast=True)
        
        return jsonify({
            'success': True,
            'message': 'Room created successfully',
            'data': room.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@rooms_bp.route('/<int:room_id>', methods=['PATCH'])
def update_room(room_id):
    """Update room details"""
    room = Room.query.get_or_404(room_id)
    data = request.get_json()
    
    try:
        old_data = room.to_dict()
        
        if 'status' in data:
            room.status = data['status']
        if 'price_per_day' in data:
            room.price_per_day = data['price_per_day']
        
        db.session.commit()
        
        log_action(
            actor_id=None,
            actor_role='Admin',
            action='room_updated',
            entity_type='Room',
            entity_id=room.id,
            old_values=old_data,
            new_values=room.to_dict()
        )
        
        socketio.emit('room_updated', room.to_dict(), broadcast=True)
        
        return jsonify({
            'success': True,
            'message': 'Room updated successfully',
            'data': room.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500
    
@rooms_bp.route('/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    """Delete room"""
    room = Room.query.get_or_404(room_id)
    
    try:
        db.session.delete(room)
        db.session.commit()
        
        log_action(
            actor_id=None,
            actor_role='Admin',
            action='room_deleted',
            entity_type='Room',
            entity_id=room.id,
            payload={'room_id': room.room_id}
        )
        
        socketio.emit('room_deleted', {'room_id': room.room_id}, broadcast=True)
        
        return jsonify({'success': True, 'message': 'Room deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500
        