from flask import Blueprint

patients_bp = Blueprint('patients', __name__, url_prefix='/api/patients')
doctors_bp = Blueprint('doctors', __name__, url_prefix='/api/doctors')
nurses_bp = Blueprint('nurses', __name__, url_prefix='/api/nurses')
rooms_bp = Blueprint('rooms', __name__, url_prefix='/api/rooms')
prescriptions_bp = Blueprint('prescriptions', __name__, url_prefix='/api/prescriptions')
lab_reports_bp = Blueprint('lab_reports', __name__, url_prefix='/api/lab-reports')
bills_bp = Blueprint('bills', __name__, url_prefix='/api/bills')
treatments_bp = Blueprint('treatments', __name__, url_prefix='/api/treatments')
ambulances_bp = Blueprint('ambulances', __name__, url_prefix='/api/ambulances')
audit_bp = Blueprint('audit', __name__, url_prefix='/api/audit')

# Import route handlers
from . import patients, doctors, nurses, rooms, prescriptions, lab_reports, bills, treatments, ambulances, audit