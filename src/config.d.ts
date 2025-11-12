declare module 'config' {
  export const API_CONFIG: {
    BASE_URL: string;
    TIMEOUT: number;
    HEADERS: {
      'Content-Type': string;
      'Accept': string;
    };
  };

  export const ENDPOINTS: {
    PATIENTS: string;
    ROOMS: string;
    ROOMS_AVAILABLE: string;
  };
}
