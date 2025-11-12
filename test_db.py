import pymysql
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

try:
    # Connect to MySQL
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='root',
        database='hospital_management',
        port=3306
    )
    
    print("✓ Successfully connected to MySQL database!")
    
    # Check if database exists
    with connection.cursor() as cursor:
        cursor.execute("SHOW DATABASES LIKE 'hospital_management'")
        result = cursor.fetchone()
        if result:
            print("✓ Database 'hospital_management' exists!")
        else:
            print("✗ Database 'hospital_management' does not exist.")
            
            # Create database if it doesn't exist
            cursor.execute("CREATE DATABASE IF NOT EXISTS hospital_management")
            print("✓ Created database 'hospital_management'")
    
except pymysql.Error as e:
    print(f"✗ Error connecting to MySQL: {e}")
    
    if 'connection' in locals():
        connection.close()
