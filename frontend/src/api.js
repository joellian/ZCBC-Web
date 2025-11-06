import axios from 'axios';

// Base URL for your Strapi API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const aboutUsApi = {
  // Get About Us content
  getAboutUs: async () => {
    try {
      const response = await api.get('/aboutuses');
      console.log('About Us API response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error fetching about us:', error);
      throw error;
    }
  }
};

export const leadersApi = {
  // Get all leaders
  getLeaders: async () => {
    try {
      const response = await api.get('/leaders?populate=*');
      console.log('Leaders API with populate:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error fetching leaders:', error);
      throw error;
    }
  },

  // Get leaders by department
  getLeadersByDepartment: async (department) => {
    try {
      const response = await api.get(`/leaders?filters[department][$eq]=${department}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leaders by department:', error);
      throw error;
    }
  }
};

export default api;