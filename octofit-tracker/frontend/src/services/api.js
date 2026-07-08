// API service for Octofit backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiService = {
  // Helper method for API calls
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // User endpoints (to be implemented)
  users: {
    getAll: () => apiService.request('/users'),
    getById: (id) => apiService.request(`/users/${id}`),
    create: (data) => apiService.request('/users', { method: 'POST', body: JSON.stringify(data) }),
  },

  // Team endpoints (to be implemented)
  teams: {
    getAll: () => apiService.request('/teams'),
    getById: (id) => apiService.request(`/teams/${id}`),
    create: (data) => apiService.request('/teams', { method: 'POST', body: JSON.stringify(data) }),
  },

  // Activity endpoints (to be implemented)
  activities: {
    getAll: () => apiService.request('/activities'),
    create: (data) => apiService.request('/activities', { method: 'POST', body: JSON.stringify(data) }),
  },

  // Leaderboard endpoints (to be implemented)
  leaderboard: {
    get: () => apiService.request('/leaderboard'),
  },

  // Workout endpoints (to be implemented)
  workouts: {
    getAll: () => apiService.request('/workouts'),
    create: (data) => apiService.request('/workouts', { method: 'POST', body: JSON.stringify(data) }),
  },
};
