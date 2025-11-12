# Import all route blueprints here
from .patient_routes import patient_bp
from .doctor_routes import doctor_bp
from .room_routes import room_bp
from .appointment_routes import appointment_bp
from .prescription_routes import prescription_bp
from .lab_report_routes import lab_report_bp
from .billing_routes import billing_bp

def register_routes(app):
    """Register all route blueprints with the Flask app"""
    app.register_blueprint(patient_bp, url_prefix='/api/patients')
    app.register_blueprint(doctor_bp, url_prefix='/api/doctors')
    app.register_blueprint(room_bp, url_prefix='/api/rooms')
    app.register_blueprint(appointment_bp, url_prefix='/api/appointments')
    app.register_blueprint(prescription_bp, url_prefix='/api/prescriptions')
    app.register_blueprint(lab_report_bp, url_prefix='/api/lab-reports')
    app.register_blueprint(billing_bp, url_prefix='/api/billing')
    
    # Add a simple health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({"status": "ok", "message": "Hospital Management System API is running"}), 200
