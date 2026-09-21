import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("JWT");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        alert("Identifiants incorrects");
        break;
      case 403:
        alert("Action interdite");
        break;
      case 404:
        console.warn("Not found");
        break;
      default:
        console.error("Message generique");
        break;
      }
    return Promise.reject(error);
  },
);

export default httpClient;
