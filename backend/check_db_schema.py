from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Database connection string
DATABASE_URI = 'mysql+pymysql://root:root%40123@localhost:3306/hospital_management'

# Create engine and session
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

# Create an inspector to inspect the database
inspector = inspect(engine)

# Get all table names
tables = inspector.get_table_names()
print("\n=== Tables in database ===")
for table in tables:
    print(f"\nTable: {table}")
    
    # Get columns for each table
    columns = inspector.get_columns(table)
    print("\nColumns:")
    for column in columns:
        print(f"  - {column['name']}: {column['type']} {'(Primary Key)' if column.get('primary_key') else ''}")
    
    # Get foreign keys for each table
    foreign_keys = inspector.get_foreign_keys(table)
    if foreign_keys:
        print("\nForeign Keys:")
        for fk in foreign_keys:
            print(f"  - {fk['constrained_columns']} references {fk['referred_table']}({fk['referred_columns']})")

print("\n=== End of schema check ===\n")
session.close()
