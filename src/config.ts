// API configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Your Flask backend URL
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// API endpoints
export const ENDPOINTS = {
  PATIENTS: '/patients',
  ROOMS: '/rooms',
  ROOMS_AVAILABLE: '/rooms/available',
};
