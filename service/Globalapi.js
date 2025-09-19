import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log('Environment Check:', {
  API_KEY: API_KEY ? 'Present' : 'Missing',
  BASE_URL: BASE_URL,
  Full_URL: `${BASE_URL}api/`
});

const axiosClient = axios.create({
  baseURL: `${BASE_URL}api/`, // Fixed: removed extra /api since BASE_URL already has trailing slash
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  timeout: 10000, // 10 seconds timeout for deployed API
});

// Add request interceptor to log requests
axiosClient.interceptors.request.use(
  (config) => {
    console.log('Making API request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosClient.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Full API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      url: error.config?.url,
      method: error.config?.method,
      fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'Unknown'
    });
    
    // Log the specific error details from Strapi
    if (error.response?.data?.error) {
      console.error('Strapi Error Details:', error.response.data.error);
      if (error.response.data.error.details) {
        console.error('Validation Details:', error.response.data.error.details);
      }
    }

    // Handle common deployment issues
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - check if Strapi is running');
    }
    
    if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
      console.error('Network error - possible CORS issue or server down');
    }
    
    return Promise.reject(error);
  }
);

const CreatenewResume = (data) => {
  console.log('Creating new resume with data:', JSON.stringify(data, null, 2));
  return axiosClient.post("/user-resumes", data);
};

const getuserresume = (mail) => {
  console.log('Fetching resumes for email:', mail);
  return axiosClient.get('/user-resumes', {
    params: {
      'filters[mail][$eq]': mail,
    },
  });
};

const Updateresume = (id, data) => {
  console.log('Updating resume:', id, 'with data:', JSON.stringify(data, null, 2));
  return axiosClient.put(`/user-resumes/${id}`, data);
};

const getresumebyid = (id) => {
  console.log('Fetching resume by id:', id);
  return axiosClient.get(`/user-resumes/${id}?populate=*`);
};

const Deleteresumebyid = (id) => {
  console.log('Deleting resume:', id);
  return axiosClient.delete(`/user-resumes/${id}`);
};

export default {
  CreatenewResume,
  getuserresume,
  Updateresume,
  getresumebyid,
  Deleteresumebyid
};