import axios from 'axios';

const api = axios.create({
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const aocApi = axios.create({
  baseURL: import.meta.env.VITE_AOC_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { api, aocApi };
