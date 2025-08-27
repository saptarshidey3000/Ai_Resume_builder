import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY; // must match your .env file

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,  // MUST be Bearer + space + token
  },
});

const CreatenewResume = (data) => axiosClient.post("user-resumes", data);

export default {
  CreatenewResume,
};
