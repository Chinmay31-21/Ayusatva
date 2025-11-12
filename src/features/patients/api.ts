import axios from 'axios';
import { Patient, PatientFilters, PatientFormData, PatientStats } from './types';

const API_BASE_URL = 'http://localhost:5000/api/patients';

// Get all patients with optional filters
export const getPatients = async (filters?: PatientFilters): Promise<Patient[]> => {
  try {
    const response = await axios.get(API_BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Get a single patient by ID
export const getPatient = async (id: number): Promise<Patient> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    throw error;
  }
};

// Create a new patient
export const createPatient = async (patientData: PatientFormData): Promise<Patient> => {
  try {
    const response = await axios.post(API_BASE_URL, patientData);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

// Update an existing patient
export const updatePatient = async (id: number, patientData: Partial<PatientFormData>): Promise<Patient> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with ID ${id}:`, error);
    throw error;
  }
};

// Delete a patient
export const deletePatient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting patient with ID ${id}:`, error);
    throw error;
  }
};

// Update patient status
export const updatePatientStatus = async (id: number, status: string): Promise<Patient> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for patient with ID ${id}:`, error);
    throw error;
  }
};

// Search patients
export const searchPatients = async (query: string): Promise<Patient[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching patients:', error);
    throw error;
  }
};

// Get patient statistics
export const getPatientStats = async (): Promise<PatientStats> => {
  try {
    // This would be implemented on the backend to return statistics
    const patients = await getPatients();
    
    return {
      total: patients.length,
      admitted: patients.filter(p => p.status === 'Admitted').length,
      under_observation: patients.filter(p => p.status === 'Under Observation').length,
      critical: patients.filter(p => p.status === 'Critical').length,
      discharged: patients.filter(p => p.status === 'Discharged').length,
      released: patients.filter(p => p.status === 'Released').length,
    };
  } catch (error) {
    console.error('Error fetching patient statistics:', error);
    throw error;
  }
};
