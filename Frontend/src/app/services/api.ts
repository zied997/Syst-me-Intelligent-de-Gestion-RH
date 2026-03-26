const API_BASE_URL = 'http://localhost:8000';

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login?email=${email}&password=${password}`, {
      method: 'POST',
    });
    return response.json();
  },
  
  // Dashboard
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
    return response.json();
  },
  
  // Employees
  getEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/employees`);
    return response.json();
  },
  
  // Predictions
  predictTurnover: async (employeeId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/predictions/turnover/${employeeId}`);
    return response.json();
  },
  
  predictAbsenteeism: async (employeeId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/predictions/absenteeism/${employeeId}`);
    return response.json();
  }
};