import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/",
  withCredentials: true,
});

//TODO: Add error handling and response types

export { api };
