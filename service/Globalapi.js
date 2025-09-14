import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Add response interceptor for better error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Full API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      url: error.config?.url,
      method: error.config?.method
    });
    
    // Log the specific error details from Strapi
    if (error.response?.data?.error) {
      console.error('Strapi Error Details:', error.response.data.error);
      if (error.response.data.error.details) {
        console.error('Validation Details:', error.response.data.error.details);
      }
    }
    
    return Promise.reject(error);
  }
);

const CreatenewResume = (data) => {
  console.log('Sending data to API:', JSON.stringify(data, null, 2));
  return axiosClient.post("user-resumes", data);
};
const getuserresume = (mail) => axiosClient.get('/user-resumes', {
  params: {
    'filters[mail][$eq]': mail,
  },
});

const Updateresume = (id,data)=>axiosClient.put(`/user-resumes/${id}`, data)

const getresumebyid=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")

export default {
  CreatenewResume,
  getuserresume ,
  Updateresume ,
  getresumebyid
};