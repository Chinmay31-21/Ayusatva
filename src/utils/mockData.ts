// Mock data for Hospital Management System
import { 
  Patient, 
  Appointment, 
  Prescription, 
  LabTest, 
  Department, 
  Room, 
  VitalSigns,
  NurseInstruction,
  BillingRecord,
  DashboardStats,
  Notification,
  User
} from './types';

export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: 'doctor',
    department: 'Cardiology',
    specialization: 'Cardiac Surgery',
    employeeId: 'DOC001'
  },
  {
    id: 'U002',
    name: 'Admin Mike Chen',
    email: 'mike.chen@hospital.com',
    role: 'admin',
    department: 'Administration',
    employeeId: 'ADM001'
  },
  {
    id: 'U003',
    name: 'Nurse Emma Wilson',
    email: 'emma.wilson@hospital.com',
    role: 'nurse',
    department: 'ICU',
    employeeId: 'NUR001'
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'male',
    bloodGroup: 'O+',
    contact: '+1-555-0101',
    email: 'john.doe@email.com',
    address: '123 Main St, New York, NY 10001',
    admissionDate: '2025-01-10',
    status: 'admitted',
    roomNumber: 'ICU-101',
    assignedDoctor: 'Dr. Sarah Johnson',
    assignedNurse: 'Nurse Emma Wilson',
    diagnosis: 'Acute Myocardial Infarction',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1-555-0102'
    }
  },
  {
    id: 'P002',
    name: 'Mary Smith',
    age: 32,
    gender: 'female',
    bloodGroup: 'A+',
    contact: '+1-555-0201',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    admissionDate: '2025-01-15',
    status: 'stable',
    roomNumber: 'GEN-205',
    assignedDoctor: 'Dr. Michael Brown',
    diagnosis: 'Pneumonia',
    allergies: []
  },
  {
    id: 'P003',
    name: 'Robert Taylor',
    age: 68,
    gender: 'male',
    bloodGroup: 'B-',
    contact: '+1-555-0301',
    address: '789 Pine Rd, Queens, NY 11375',
    admissionDate: '2025-01-08',
    status: 'critical',
    roomNumber: 'ICU-103',
    assignedDoctor: 'Dr. Sarah Johnson',
    diagnosis: 'Septic Shock',
    medicalHistory: ['COPD', 'Coronary Artery Disease'],
    allergies: ['Sulfa drugs']
  },
  {
    id: 'P004',
    name: 'Lisa Anderson',
    age: 28,
    gender: 'female',
    bloodGroup: 'AB+',
    contact: '+1-555-0401',
    address: '321 Elm St, Manhattan, NY 10016',
    admissionDate: '2025-01-18',
    status: 'outpatient',
    diagnosis: 'Migraine',
    allergies: []
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    patientName: 'John Doe',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    dateTime: '2025-01-20T10:00:00',
    duration: 30,
    type: 'follow-up',
    status: 'scheduled',
    department: 'Cardiology',
    symptoms: 'Chest pain follow-up'
  },
  {
    id: 'A002',
    patientId: 'P002',
    patientName: 'Mary Smith',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    dateTime: '2025-01-20T11:00:00',
    duration: 45,
    type: 'consultation',
    status: 'scheduled',
    department: 'Internal Medicine',
    symptoms: 'Persistent cough'
  },
  {
    id: 'A003',
    patientId: 'P003',
    patientName: 'Robert Taylor',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    dateTime: '2025-01-20T14:00:00',
    duration: 60,
    type: 'emergency',
    status: 'in-progress',
    department: 'Emergency',
    symptoms: 'Severe breathing difficulty'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'RX001',
    patientId: 'P001',
    patientName: 'John Doe',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-19',
    status: 'pending',
    diagnosis: 'Acute Myocardial Infarction',
    medications: [
      {
        id: 'M001',
        name: 'Aspirin',
        dosage: '325mg',
        frequency: 'Once daily',
        duration: '30 days',
        quantity: 30,
        dispensed: false
      },
      {
        id: 'M002',
        name: 'Atorvastatin',
        dosage: '40mg',
        frequency: 'Once daily at bedtime',
        duration: '30 days',
        quantity: 30,
        dispensed: false
      },
      {
        id: 'M003',
        name: 'Metoprolol',
        dosage: '50mg',
        frequency: 'Twice daily',
        duration: '30 days',
        quantity: 60,
        dispensed: false
      }
    ],
    instructions: 'Take medications with food. Monitor blood pressure daily.'
  },
  {
    id: 'RX002',
    patientId: 'P002',
    patientName: 'Mary Smith',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-18',
    status: 'dispensed',
    diagnosis: 'Pneumonia',
    medications: [
      {
        id: 'M004',
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '7 days',
        quantity: 21,
        dispensed: true
      }
    ]
  }
];

export const mockLabTests: LabTest[] = [
  {
    id: 'LT001',
    patientId: 'P001',
    patientName: 'John Doe',
    requestedBy: 'U001',
    requestedByName: 'Dr. Sarah Johnson',
    testName: 'Complete Blood Count (CBC)',
    testType: 'blood',
    priority: 'urgent',
    status: 'completed',
    requestDate: '2025-01-19T08:00:00',
    completionDate: '2025-01-19T14:30:00',
    results: 'WBC: 11,000/μL, RBC: 4.5M/μL, Hemoglobin: 13.5 g/dL, Platelets: 250,000/μL'
  },
  {
    id: 'LT002',
    patientId: 'P001',
    patientName: 'John Doe',
    requestedBy: 'U001',
    requestedByName: 'Dr. Sarah Johnson',
    testName: 'Cardiac Enzyme Panel',
    testType: 'blood',
    priority: 'stat',
    status: 'in-progress',
    requestDate: '2025-01-19T09:00:00',
    notes: 'Suspected MI - process immediately'
  },
  {
    id: 'LT003',
    patientId: 'P003',
    patientName: 'Robert Taylor',
    requestedBy: 'U001',
    requestedByName: 'Dr. Sarah Johnson',
    testName: 'Chest X-Ray',
    testType: 'xray',
    priority: 'urgent',
    status: 'pending',
    requestDate: '2025-01-20T07:30:00'
  }
];

export const mockDepartments: Department[] = [
  {
    id: 'D001',
    name: 'Cardiology',
    head: 'Dr. Sarah Johnson',
    totalDoctors: 8,
    totalNurses: 15,
    totalBeds: 30,
    occupiedBeds: 22,
    floor: '3rd Floor',
    contact: '+1-555-1001'
  },
  {
    id: 'D002',
    name: 'Emergency',
    head: 'Dr. Michael Brown',
    totalDoctors: 12,
    totalNurses: 25,
    totalBeds: 20,
    occupiedBeds: 18,
    floor: 'Ground Floor',
    contact: '+1-555-1002'
  },
  {
    id: 'D003',
    name: 'Pediatrics',
    head: 'Dr. Emily White',
    totalDoctors: 6,
    totalNurses: 12,
    totalBeds: 25,
    occupiedBeds: 15,
    floor: '2nd Floor',
    contact: '+1-555-1003'
  },
  {
    id: 'D004',
    name: 'ICU',
    head: 'Dr. David Lee',
    totalDoctors: 10,
    totalNurses: 30,
    totalBeds: 15,
    occupiedBeds: 12,
    floor: '4th Floor',
    contact: '+1-555-1004'
  }
];

export const mockRooms: Room[] = [
  {
    id: 'R001',
    roomNumber: 'ICU-101',
    type: 'icu',
    floor: '4th Floor',
    capacity: 1,
    occupied: 1,
    status: 'occupied',
    department: 'ICU',
    patients: ['P001'],
    equipment: ['Ventilator', 'Cardiac Monitor', 'IV Pump']
  },
  {
    id: 'R002',
    roomNumber: 'ICU-103',
    type: 'icu',
    floor: '4th Floor',
    capacity: 1,
    occupied: 1,
    status: 'occupied',
    department: 'ICU',
    patients: ['P003'],
    equipment: ['Ventilator', 'Cardiac Monitor', 'Defibrillator']
  },
  {
    id: 'R003',
    roomNumber: 'GEN-205',
    type: 'general',
    floor: '2nd Floor',
    capacity: 4,
    occupied: 2,
    status: 'occupied',
    department: 'General Medicine',
    patients: ['P002']
  },
  {
    id: 'R004',
    roomNumber: 'PVT-301',
    type: 'private',
    floor: '3rd Floor',
    capacity: 1,
    occupied: 0,
    status: 'available',
    department: 'Cardiology'
  }
];

export const mockVitalSigns: VitalSigns[] = [
  {
    id: 'V001',
    patientId: 'P001',
    recordedBy: 'Nurse Emma Wilson',
    timestamp: '2025-01-20T08:00:00',
    temperature: 98.6,
    bloodPressure: {
      systolic: 128,
      diastolic: 82
    },
    heartRate: 76,
    respiratoryRate: 16,
    oxygenSaturation: 97,
    bloodGlucose: 110
  },
  {
    id: 'V002',
    patientId: 'P003',
    recordedBy: 'Nurse Emma Wilson',
    timestamp: '2025-01-20T08:15:00',
    temperature: 101.2,
    bloodPressure: {
      systolic: 90,
      diastolic: 60
    },
    heartRate: 112,
    respiratoryRate: 24,
    oxygenSaturation: 89,
    notes: 'Patient showing signs of respiratory distress'
  }
];

export const mockNurseInstructions: NurseInstruction[] = [
  {
    id: 'NI001',
    patientId: 'P001',
    patientName: 'John Doe',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    instructions: 'Monitor vital signs every 2 hours. Report any chest pain immediately.',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2025-01-19T14:00:00'
  },
  {
    id: 'NI002',
    patientId: 'P003',
    patientName: 'Robert Taylor',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    instructions: 'Oxygen therapy at 4L/min. Monitor SpO2 continuously. Alert if <90%.',
    priority: 'critical',
    status: 'in-progress',
    createdAt: '2025-01-20T06:00:00'
  },
  {
    id: 'NI003',
    patientId: 'P002',
    patientName: 'Mary Smith',
    doctorId: 'U001',
    doctorName: 'Dr. Sarah Johnson',
    instructions: 'Administer IV antibiotics as prescribed. Monitor temperature.',
    priority: 'medium',
    status: 'completed',
    createdAt: '2025-01-18T10:00:00',
    completedAt: '2025-01-19T22:00:00'
  }
];

export const mockBillingRecords: BillingRecord[] = [
  {
    id: 'B001',
    patientId: 'P001',
    patientName: 'John Doe',
    totalAmount: 15750.00,
    paidAmount: 5000.00,
    pendingAmount: 10750.00,
    status: 'partially-paid',
    createdAt: '2025-01-10',
    dueDate: '2025-02-10',
    items: [
      {
        id: 'BI001',
        description: 'ICU Room Charges (10 days)',
        category: 'room',
        quantity: 10,
        unitPrice: 800,
        totalPrice: 8000
      },
      {
        id: 'BI002',
        description: 'Cardiac Catheterization',
        category: 'procedure',
        quantity: 1,
        unitPrice: 5000,
        totalPrice: 5000
      },
      {
        id: 'BI003',
        description: 'Laboratory Tests',
        category: 'lab-test',
        quantity: 5,
        unitPrice: 150,
        totalPrice: 750
      },
      {
        id: 'BI004',
        description: 'Medications',
        category: 'medication',
        quantity: 1,
        unitPrice: 2000,
        totalPrice: 2000
      }
    ]
  }
];

export const mockDashboardStats: DashboardStats = {
  totalPatients: 247,
  activePatients: 156,
  todayAppointments: 42,
  pendingTests: 18,
  pendingPrescriptions: 12,
  criticalPatients: 8,
  availableBeds: 23,
  occupancyRate: 82,
  revenueToday: 45300,
  revenueMonth: 1247800
};

export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'error',
    title: 'Critical Patient Alert',
    message: 'Patient Robert Taylor (ICU-103) - SpO2 dropped to 85%',
    timestamp: '2025-01-20T08:45:00',
    read: false
  },
  {
    id: 'N002',
    type: 'warning',
    title: 'Lab Test Urgent',
    message: 'Cardiac enzyme results pending for John Doe',
    timestamp: '2025-01-20T08:30:00',
    read: false
  },
  {
    id: 'N003',
    type: 'info',
    title: 'New Appointment',
    message: 'Appointment scheduled with Lisa Anderson at 2:00 PM',
    timestamp: '2025-01-20T08:00:00',
    read: true
  },
  {
    id: 'N004',
    type: 'success',
    title: 'Prescription Dispensed',
    message: 'Prescription RX002 for Mary Smith has been dispensed',
    timestamp: '2025-01-19T16:30:00',
    read: true
  }
];
