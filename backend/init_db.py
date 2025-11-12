from app import create_app, db
from models.patient import Patient
from models.room import Room

def init_db():
    app = create_app()
    with app.app_context():
        try:
            # Drop all tables
            print("Dropping all tables...")
            db.drop_all()
            
            # Create all database tables
            print("Creating all tables...")
            db.create_all()
            
            # Verify the schema
            from sqlalchemy import inspect
            inspector = inspect(db.engine)
            
            # Check patients table columns
            patients_columns = [col['name'] for col in inspector.get_columns('patients')]
            required_columns = ['id', 'name', 'gender', 'disease', 'status', 'admission_date', 
                              'discharged_date', 'deposited_amount', 'pending_amount', 
                              'total_amount', 'address', 'emergency_contact', 'room_id', 
                              'created_at', 'updated_at']
            
            missing_columns = [col for col in required_columns if col not in patients_columns]
            
            if missing_columns:
                print(f"\n✗ Missing columns in patients table: {', '.join(missing_columns)}")
                print("Please check your model definitions and try again.")
                return
                
            print("\n✓ Database tables created successfully with the following schema:")
            
            # Print tables and their columns
            for table_name in inspector.get_table_names():
                print(f"\nTable: {table_name}")
                print("Columns:")
                for column in inspector.get_columns(table_name):
                    print(f"  - {column['name']}: {column['type']}")
                    
        except Exception as e:
            print(f"\n✗ Error initializing database: {e}")
            raise

if __name__ == '__main__':
    init_db()
