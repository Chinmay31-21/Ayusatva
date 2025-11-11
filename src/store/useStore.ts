// Global state management using Zustand
import { create } from 'zustand';
import { 
  UserRole, 
  User, 
  Patient, 
  Appointment, 
  Prescription,
  LabTest,
  Department,
  Room,
  NurseInstruction,
  BillingRecord,
  DashboardStats,
  Notification
} from '../utils/types';
import {
  mockUsers,
  mockPatients,
  mockAppointments,
  mockPrescriptions,
  mockLabTests,
  mockDepartments,
  mockRooms,
  mockNurseInstructions,
  mockBillingRecords,
  mockDashboardStats,
  mockNotifications
} from '../utils/mockData';

interface StoreState {
  // User & Auth
  currentUser: User | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  setCurrentUser: (user: User) => void;

  // Data
  patients: Patient[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  labTests: LabTest[];
  departments: Department[];
  rooms: Room[];
  nurseInstructions: NurseInstruction[];
  billingRecords: BillingRecord[];
  dashboardStats: DashboardStats;
  notifications: Notification[];

  // Actions
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  addPrescription: (prescription: Prescription) => void;
  updatePrescription: (id: string, updates: Partial<Prescription>) => void;
  addLabTest: (labTest: LabTest) => void;
  updateLabTest: (id: string, updates: Partial<LabTest>) => void;
  addNurseInstruction: (instruction: NurseInstruction) => void;
  updateNurseInstruction: (id: string, updates: Partial<NurseInstruction>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  commandPaletteOpen: boolean;
  toggleCommandPalette: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  currentUser: mockUsers[0],
  currentRole: 'doctor',
  patients: mockPatients,
  appointments: mockAppointments,
  prescriptions: mockPrescriptions,
  labTests: mockLabTests,
  departments: mockDepartments,
  rooms: mockRooms,
  nurseInstructions: mockNurseInstructions,
  billingRecords: mockBillingRecords,
  dashboardStats: mockDashboardStats,
  notifications: mockNotifications,
  sidebarOpen: true,
  commandPaletteOpen: false,
  darkMode: false,

  // Actions
  setCurrentRole: (role) => set({ currentRole: role }),
  setCurrentUser: (user) => set({ currentUser: user }),

  addPatient: (patient) => 
    set((state) => ({ patients: [...state.patients, patient] })),
  
  updatePatient: (id, updates) =>
    set((state) => ({
      patients: state.patients.map((p) => (p.id === id ? { ...p, ...updates } : p))
    })),

  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  
  updateAppointment: (id, updates) =>
    set((state) => ({
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...updates } : a))
    })),

  addPrescription: (prescription) =>
    set((state) => ({ prescriptions: [...state.prescriptions, prescription] })),
  
  updatePrescription: (id, updates) =>
    set((state) => ({
      prescriptions: state.prescriptions.map((p) => (p.id === id ? { ...p, ...updates } : p))
    })),

  addLabTest: (labTest) =>
    set((state) => ({ labTests: [...state.labTests, labTest] })),
  
  updateLabTest: (id, updates) =>
    set((state) => ({
      labTests: state.labTests.map((t) => (t.id === id ? { ...t, ...updates } : t))
    })),

  addNurseInstruction: (instruction) =>
    set((state) => ({ nurseInstructions: [...state.nurseInstructions, instruction] })),
  
  updateNurseInstruction: (id, updates) =>
    set((state) => ({
      nurseInstructions: state.nurseInstructions.map((n) => (n.id === id ? { ...n, ...updates } : n))
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    })),

  clearAllNotifications: () =>
    set({ notifications: [] }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
