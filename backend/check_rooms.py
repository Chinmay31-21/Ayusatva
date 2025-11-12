from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Database connection string
DATABASE_URI = 'mysql+pymysql://root:root%40123@localhost:3306/hospital_management'

# Create engine
engine = create_engine(DATABASE_URI)

# Connect to the database and execute query
with engine.connect() as connection:
    # Check rooms table
    print("\n=== Rooms Table ===")
    result = connection.execute(text("SELECT * FROM rooms"))
    for row in result:
        print(f"ID: {row.id}, Room Number: {row.room_number}, Type: {row.room_type}, Status: {row.status}")
    
    # Check patients table
    print("\n=== Patients Table ===")
    result = connection.execute(text("SELECT * FROM patients"))
    for row in result:
        print(f"ID: {row.id}, Name: {row.name}, Room ID: {row.room_id}, Status: {row.status}")

print("\n=== Database Check Complete ===")
