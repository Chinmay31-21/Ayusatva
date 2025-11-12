import pymysql
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def get_db_connection():
    """Create and return a database connection"""
    return pymysql.connect(
        host='localhost',
        user='root',
        password='root@123',
        database='hospital_management',
        cursorclass=pymysql.cursors.DictCursor
    )

def update_database():
    try:
        # Connect to the database
        connection = get_db_connection()
        
        with connection.cursor() as cursor:
            # Add missing columns if they don't exist
            cursor.execute("""
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = 'hospital_management' 
                AND TABLE_NAME = 'patients' 
                AND COLUMN_NAME IN ('address', 'emergency_contact')
            """)
            
            existing_columns = {row['COLUMN_NAME'] for row in cursor.fetchall()}
            
            if 'address' not in existing_columns:
                print("Adding 'address' column to patients table...")
                cursor.execute("""
                    ALTER TABLE patients 
                    ADD COLUMN address VARCHAR(200) AFTER total_amount
                """)
                
            if 'emergency_contact' not in existing_columns:
                print("Adding 'emergency_contact' column to patients table...")
                cursor.execute("""
                    ALTER TABLE patients 
                    ADD COLUMN emergency_contact VARCHAR(20) AFTER address
                """)
            
            # Commit the changes
            connection.commit()
            
            # Verify the changes
            cursor.execute("DESCRIBE patients")
            print("\nUpdated patients table structure:")
            print("-" * 80)
            for column in cursor.fetchall():
                print(f"{column['Field']}: {column['Type']} {'(PK)' if column['Key'] == 'PRI' else ''}")
            
            # Check if sample data exists
            cursor.execute("SELECT COUNT(*) as count FROM rooms")
            if cursor.fetchone()['count'] == 0:
                print("\nAdding sample data...")
                # Add sample rooms
                cursor.execute("""
                    INSERT INTO rooms (room_number, room_type, status, floor, rate_per_day) 
                    VALUES 
                        ('101', 'General', 'available', '1', 2000.00),
                        ('102', 'General', 'available', '1', 2000.00),
                        ('201', 'Private', 'available', '2', 5000.00)
                """)
                
                # Add sample patient
                cursor.execute("""
                    INSERT INTO patients 
                        (name, gender, disease, status, room_id, deposited_amount, address, emergency_contact) 
                    VALUES 
                        ('chinmay tawade', 'male', 'Fever', 'admitted', 1, 5000.00, '123 Main St', '1234567890')
                """)
                
                connection.commit()
                print("✓ Sample data added successfully!")
            
            # Show current data
            print("\nCurrent rooms:")
            print("-" * 80)
            cursor.execute("SELECT * FROM rooms")
            for room in cursor.fetchall():
                print(f"ID: {room['id']}, Room: {room['room_number']}, Type: {room['room_type']}, Status: {room['status']}")
            
            print("\nCurrent patients:")
            print("-" * 80)
            cursor.execute("""
                SELECT p.*, r.room_number 
                FROM patients p 
                LEFT JOIN rooms r ON p.room_id = r.id
            """)
            for patient in cursor.fetchall():
                print(f"ID: {patient['id']}, Name: {patient['name']}, Room: {patient['room_number'] or 'None'}, Status: {patient['status']}")
            
    except Exception as e:
        print(f"\n✗ Error: {e}")
        if 'connection' in locals():
            connection.rollback()
    finally:
        if 'connection' in locals() and connection.open:
            connection.close()

if __name__ == "__main__":
    print("Updating database schema...")
    update_database()
    print("\n✓ Database update complete!")
