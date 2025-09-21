import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Portfolio API endpoints
export const portfolioAPI = {
  // Get complete portfolio data
  getPortfolio: async () => {
    try {
      const response = await apiClient.get('/portfolio');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to fetch portfolio data'
      };
    }
  },

  // Update portfolio data
  updatePortfolio: async (portfolioData) => {
    try {
      const response = await apiClient.put('/portfolio', portfolioData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to update portfolio'
      };
    }
  },
};

// Skills API endpoints
export const skillsAPI = {
  // Get skills data
  getSkills: async () => {
    try {
      const response = await apiClient.get('/skills');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to fetch skills'
      };
    }
  },

  // Update skills data
  updateSkills: async (skillsData) => {
    try {
      const response = await apiClient.put('/skills', skillsData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to update skills'
      };
    }
  },
};

// Experience API endpoints
export const experienceAPI = {
  // Get all experience
  getExperience: async () => {
    try {
      const response = await apiClient.get('/experience');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to fetch experience'
      };
    }
  },

  // Add new experience
  createExperience: async (experienceData) => {
    try {
      const response = await apiClient.post('/experience', experienceData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to create experience'
      };
    }
  },
};

// Projects API endpoints
export const projectsAPI = {
  // Get all projects
  getProjects: async () => {
    try {
      const response = await apiClient.get('/projects');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to fetch projects'
      };
    }
  },

  // Add new project
  createProject: async (projectData) => {
    try {
      const response = await apiClient.post('/projects', projectData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to create project'
      };
    }
  },
};

// Contact API endpoints
export const contactAPI = {
  // Submit contact message
  submitMessage: async (messageData) => {
    try {
      const response = await apiClient.post('/contact/messages', messageData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to submit message'
      };
    }
  },

  // Get all messages (admin functionality)
  getMessages: async () => {
    try {
      const response = await apiClient.get('/contact/messages');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Failed to fetch messages'
      };
    }
  },
};

// Health check endpoint
export const healthAPI = {
  // Check API health
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'API health check failed'
      };
    }
  },
};

// Utility function to handle API errors consistently
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.detail || `Server error: ${error.response.status}`;
  } else if (error.request) {
    // Request made but no response received
    return 'Network error: Unable to reach the server';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

export default apiClient;