from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from models.base import db

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Database configuration - URL encode the password if it contains special characters
    # For password 'root@123', the '@' needs to be URL encoded as '%40'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root%40123@localhost:3306/hospital_management'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

    # Initialize SQLAlchemy with the app
    db.init_app(app)

    with app.app_context():
        # Import models here to avoid circular imports
        from models.patient import Patient
        from models.room import Room
        
        # Create database tables
        try:
            db.create_all()
            print("✓ Database tables created successfully")
        except Exception as e:
            print(f"✗ Error creating database tables: {e}")

    # Test database connection
    @app.route('/test-db')
    def test_db():
        try:
            from sqlalchemy import text
            db.session.execute(text('SELECT 1'))
            return jsonify({"status": "success", "message": "Database connection successful!"})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500


    # Import and register blueprints
    from routes import register_routes
    register_routes(app)

    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
