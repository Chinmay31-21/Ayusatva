# Import all route blueprints here
from .patients import patients_bp
from .rooms import rooms_bp

def register_routes(app):
    """Register all route blueprints with the Flask app"""
    app.register_blueprint(patients_bp, url_prefix='/api')
    app.register_blueprint(rooms_bp, url_prefix='/api')
    
    # Add a simple health check endpoint
    @app.route('/api/health')
    def health_check():
        return {"status": "ok", "message": "Hospital Management System API is running"}
