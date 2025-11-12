from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from config import config
from database import db, ma, migrate

# Import models
from models import (
    patient, doctor, nurse, room, prescription, 
    lab_report, bill, treatment, audit_log, ambulance, employee
)

# Import routes
from routes import (
    patients_bp, doctors_bp, nurses_bp, rooms_bp, 
    prescriptions_bp, lab_reports_bp, bills_bp, 
    treatments_bp, ambulances_bp, audit_bp
)

socketio = SocketIO(cors_allowed_origins="*")

def create_app(config_name='development'):
    app = Flask(__name__)
    
    # Load config
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    socketio.init_app(app)
    
    # Register blueprints
    app.register_blueprint(patients_bp)
    app.register_blueprint(doctors_bp)
    app.register_blueprint(nurses_bp)
    app.register_blueprint(rooms_bp)
    app.register_blueprint(prescriptions_bp)
    app.register_blueprint(lab_reports_bp)
    app.register_blueprint(bills_bp)
    app.register_blueprint(treatments_bp)
    app.register_blueprint(ambulances_bp)
    app.register_blueprint(audit_bp)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    @app.route('/health')
    def health():
        return {'status': 'healthy'}, 200
    
    return app

if __name__ == '__main__':
    app = create_app()
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)