// Role-based configuration and permissions
import { UserRole } from './types';
import { 
  Activity, 
  Users, 
  Calendar, 
  FileText, 
  Pill, 
  FlaskConical, 
  Bed, 
  Building2,
  CreditCard,
  Settings,
  BarChart3,
  UserCircle,
  Stethoscope,
  Syringe,
  HeartPulse,
  ClipboardList,
  Bell
} from 'lucide-react';

export const roleColors = {
  admin: {
    primary: '#8b5cf6',
    light: '#a78bfa',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500',
    text: 'text-violet-600',
    border: 'border-violet-500'
  },
  doctor: {
    primary: '#06b6d4',
    light: '#22d3ee',
    gradient: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-500',
    text: 'text-cyan-600',
    border: 'border-cyan-500'
  },
  nurse: {
    primary: '#ec4899',
    light: '#f472b6',
    gradient: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-500',
    text: 'text-pink-600',
    border: 'border-pink-500'
  },
  chemist: {
    primary: '#f59e0b',
    light: '#fbbf24',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500',
    text: 'text-amber-600',
    border: 'border-amber-500'
  },
  lab: {
    primary: '#14b8a6',
    light: '#2dd4bf',
    gradient: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-500',
    text: 'text-teal-600',
    border: 'border-teal-500'
  },
  patient: {
    primary: '#6366f1',
    light: '#818cf8',
    gradient: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500',
    text: 'text-indigo-600',
    border: 'border-indigo-500'
  },
  attendant: {
    primary: '#10b981',
    light: '#34d399',
    gradient: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-500',
    text: 'text-emerald-600',
    border: 'border-emerald-500'
  }
};

export const roleLabels = {
  admin: 'Administrator',
  doctor: 'Doctor',
  nurse: 'Nurse',
  chemist: 'Pharmacist',
  lab: 'Lab Technician',
  patient: 'Patient',
  attendant: 'Attendant'
};

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  badge?: number;
}

export const roleNavigation: Record<UserRole, NavigationItem[]> = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'patients', label: 'Patients', icon: Users, path: '/patients' },
    { id: 'staff', label: 'Staff Management', icon: UserCircle, path: '/staff' },
    { id: 'departments', label: 'Departments', icon: Building2, path: '/departments' },
    { id: 'rooms', label: 'Room Management', icon: Bed, path: '/rooms' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/appointments' },
    { id: 'billing', label: 'Billing', icon: CreditCard, path: '/billing' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ],
  doctor: [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '/dashboard' },
    { id: 'patients', label: 'My Patients', icon: Users, path: '/patients' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/appointments' },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText, path: '/prescriptions' },
    { id: 'lab-requests', label: 'Lab Requests', icon: FlaskConical, path: '/lab-requests' },
    { id: 'nurse-instructions', label: 'Nurse Instructions', icon: ClipboardList, path: '/instructions' },
    { id: 'medical-records', label: 'Medical Records', icon: FileText, path: '/records' }
  ],
  nurse: [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '/dashboard' },
    { id: 'patients', label: 'Assigned Patients', icon: Users, path: '/patients' },
    { id: 'instructions', label: 'Instructions', icon: ClipboardList, path: '/instructions', badge: 5 },
    { id: 'vitals', label: 'Vital Signs', icon: HeartPulse, path: '/vitals' },
    { id: 'medications', label: 'Medication Schedule', icon: Pill, path: '/medications' },
    { id: 'rounds', label: 'Rounds', icon: Stethoscope, path: '/rounds' }
  ],
  chemist: [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '/dashboard' },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText, path: '/prescriptions', badge: 8 },
    { id: 'inventory', label: 'Inventory', icon: Pill, path: '/inventory' },
    { id: 'dispensing', label: 'Dispensing Queue', icon: Syringe, path: '/dispensing' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' }
  ],
  lab: [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '/dashboard' },
    { id: 'tests', label: 'Test Queue', icon: FlaskConical, path: '/tests', badge: 12 },
    { id: 'results', label: 'Results', icon: FileText, path: '/results' },
    { id: 'equipment', label: 'Equipment', icon: Settings, path: '/equipment' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' }
  ],
  attendant: [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '/dashboard' },
    { id: 'patients', label: 'Patient Care', icon: Users, path: '/patients' },
    { id: 'rooms', label: 'Room Service', icon: Bed, path: '/rooms' },
    { id: 'tasks', label: 'Tasks', icon: ClipboardList, path: '/tasks', badge: 3 }
  ],
  patient: [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '/dashboard' },
    { id: 'appointments', label: 'My Appointments', icon: Calendar, path: '/appointments' },
    { id: 'medical-records', label: 'Medical Records', icon: FileText, path: '/records' },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill, path: '/prescriptions' },
    { id: 'lab-results', label: 'Lab Results', icon: FlaskConical, path: '/lab-results' },
    { id: 'billing', label: 'Billing', icon: CreditCard, path: '/billing' }
  ]
};

export const rolePermissions = {
  admin: {
    canViewAllPatients: true,
    canManageStaff: true,
    canManageDepartments: true,
    canManageRooms: true,
    canViewBilling: true,
    canManageBilling: true,
    canViewAnalytics: true,
    canManageSettings: true
  },
  doctor: {
    canViewPatients: true,
    canAddPatients: true,
    canPrescribe: true,
    canOrderLabTests: true,
    canCreateInstructions: true,
    canViewMedicalRecords: true,
    canUpdateMedicalRecords: true
  },
  nurse: {
    canViewPatients: true,
    canUpdateVitals: true,
    canViewInstructions: true,
    canCompleteInstructions: true,
    canAdministerMedications: true,
    canViewPrescriptions: true
  },
  chemist: {
    canViewPrescriptions: true,
    canDispenseMedications: true,
    canManageInventory: true,
    canViewReports: true
  },
  lab: {
    canViewLabTests: true,
    canUpdateLabTests: true,
    canUploadResults: true,
    canManageEquipment: true
  },
  attendant: {
    canViewPatients: true,
    canUpdateRoomStatus: true,
    canViewTasks: true,
    canCompleteTasks: true
  },
  patient: {
    canViewOwnRecords: true,
    canViewOwnAppointments: true,
    canViewOwnPrescriptions: true,
    canViewOwnLabResults: true,
    canViewOwnBilling: true
  }
};

export const getRoleConfig = (role: UserRole) => ({
  color: roleColors[role],
  label: roleLabels[role],
  navigation: roleNavigation[role],
  permissions: rolePermissions[role]
});
