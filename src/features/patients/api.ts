import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../../config';
import { Patient, PatientFilters, PatientFormData, PatientStats, Room } from './types';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Add request interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Get all patients with optional filters
export const getPatients = async (filters?: PatientFilters): Promise<Patient[]> => {
  const response = await api.get<Patient[]>('/patients', { params: filters });
  return response.data;
};

// Get a single patient by ID
export const getPatient = async (id: string): Promise<Patient> => {
  const response = await api.get<Patient>(`/patients/${id}`);
  return response.data;
};

// Create a new patient
export const createPatient = async (patientData: PatientFormData): Promise<Patient> => {
  const response = await api.post<Patient>('/patients', patientData);
  return response.data;
};

// Update an existing patient
export const updatePatient = async (id: string, patientData: Partial<PatientFormData>): Promise<Patient> => {
  const response = await api.put<Patient>(`/patients/${id}`, patientData);
  return response.data;
};

// Delete a patient
export const deletePatient = async (id: string): Promise<void> => {
  await api.delete(`/patients/${id}`);
};

// Update patient status
export const updatePatientStatus = async (id: string, status: 'admitted' | 'discharged' | 'pending'): Promise<Patient> => {
  const response = await api.patch<Patient>(`/patients/${id}/status`, { status });
  return response.data;
};

// Search patients
export const searchPatients = async (query: string): Promise<Patient[]> => {
  const response = await api.get<Patient[]>('/patients/search', { params: { q: query } });
  return response.data;
};

// Get available rooms
export const getAvailableRooms = async (): Promise<Room[]> => {
  const response = await api.get<Room[]>('/rooms/available');
  return response.data;
};

// Get patient statistics
export const getPatientStats = async (): Promise<PatientStats> => {
  try {
    const response = await api.get<PatientStats>('/patients/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching patient statistics:', error);
    return {
      total: 0,
      admitted: 0,
      discharged: 0,
      pending: 0,
      total_revenue: 0,
      pending_payments: 0
    };
  }
};
