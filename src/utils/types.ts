// Core type definitions for Hospital Management System

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'chemist' | 'lab' | 'attendant' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  specialization?: string;
  employeeId?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  contact: string;
  email?: string;
  address: string;
  admissionDate: string;
  status: 'admitted' | 'discharged' | 'critical' | 'stable' | 'outpatient';
  roomNumber?: string;
  assignedDoctor?: string;
  assignedNurse?: string;
  diagnosis?: string;
  medicalHistory?: string[];
  allergies?: string[];
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateTime: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  department: string;
  notes?: string;
  symptoms?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medications: Medication[];
  status: 'pending' | 'dispensed' | 'partially-dispensed';
  instructions?: string;
  diagnosis: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  dispensed?: boolean;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  requestedBy: string;
  requestedByName: string;
  testName: string;
  testType: 'blood' | 'urine' | 'xray' | 'mri' | 'ct' | 'ultrasound' | 'ecg' | 'other';
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in-progress' | 'completed' | 'reported';
  requestDate: string;
  completionDate?: string;
  results?: string;
  attachments?: string[];
  notes?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  totalDoctors: number;
  totalNurses: number;
  totalBeds: number;
  occupiedBeds: number;
  floor: string;
  contact: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: 'icu' | 'private' | 'general' | 'emergency' | 'surgery';
  floor: string;
  capacity: number;
  occupied: number;
  status: 'available' | 'occupied' | 'maintenance';
  department: string;
  patients?: string[];
  equipment?: string[];
}

export interface VitalSigns {
  id: string;
  patientId: string;
  recordedBy: string;
  timestamp: string;
  temperature: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  bloodGlucose?: number;
  notes?: string;
}

export interface NurseInstruction {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  nurseId?: string;
  instructions: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  completedAt?: string;
  notes?: string;
}

export interface BillingRecord {
  id: string;
  patientId: string;
  patientName: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'unpaid' | 'partially-paid' | 'paid';
  items: BillingItem[];
  createdAt: string;
  dueDate: string;
}

export interface BillingItem {
  id: string;
  description: string;
  category: 'consultation' | 'medication' | 'lab-test' | 'procedure' | 'room' | 'other';
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  todayAppointments: number;
  pendingTests: number;
  pendingPrescriptions: number;
  criticalPatients: number;
  availableBeds: number;
  occupancyRate: number;
  revenueToday: number;
  revenueMonth: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DischargeRecord {
  id: string;
  patientId: string;
  patientName: string;
  admissionDate: string;
  dischargeDate: string;
  totalDays: number;
  dischargingDoctor: string;
  diagnosis: string;
  treatmentSummary: string;
  followUpInstructions: string;
  medications: Medication[];
  totalBill: number;
  status: 'pending' | 'approved' | 'completed';
}
