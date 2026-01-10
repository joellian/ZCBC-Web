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

export const sermonsApi = {
  // Get all sermons
  getSermons: async () => {
    try {
      const response = await api.get('/sermons?populate=*');
      console.log('Sermons API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching sermons:', error);
      throw error;
    }
  },

  // Get sermon by ID
  getSermonById: async (id) => {
    try {
      const response = await api.get(`/sermons/${id}?populate=*`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sermon:', error);
      throw error;
    }
  },

  // Get sermons by series
  getSermonsBySeries: async (series) => {
    try {
      const response = await api.get(`/sermons?filters[series][$eq]=${series}&populate=*`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sermons by series:', error);
      throw error;
    }
  }
};

export const givingApi = {
  // Get giving page content
  getGivingContent: async () => {
    try {
      const response = await api.get('/giving?populate=*');
      console.log('Giving API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching giving content:', error);
      throw error;
    }
  }
};

export const contactApi = {
  // Submit contact form
  submitContact: async (formData) => {
    try {
      const response = await api.post('/contacts', { data: formData });
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
};

export default api;