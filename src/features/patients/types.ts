export type PatientStatus = 'Admitted' | 'Under Observation' | 'Critical' | 'Discharged' | 'Released';

export interface Patient {
  id: number;
  patient_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  blood_group?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  phone: string;
  email?: string;
  address?: string;
  emergency_contact?: string;
  status: PatientStatus;
  room_id?: number;
  doctor_id?: number;
  created_at: string;
  updated_at: string;
}

export interface PatientFormData extends Omit<Patient, 'id' | 'patient_id' | 'created_at' | 'updated_at'> {
  [key: string]: any; // For form handling
}

export interface PatientFilters {
  status?: PatientStatus;
  search?: string;
  doctor_id?: number;
  room_id?: number;
}

export interface PatientStats {
  total: number;
  admitted: number;
  under_observation: number;
  critical: number;
  discharged: number;
  released: number;
}
