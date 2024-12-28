import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Local API
// Fetches data from local JSON files in /public
// Used to keep the leaderboard up after AOC ends,
const localApi = axios.create({
  baseURL: '/',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api, localApi };
