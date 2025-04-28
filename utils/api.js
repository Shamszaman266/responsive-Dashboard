// utils/api.js
import axios from 'axios';

export const fetchNews = async () => {
  try {
    const res = await axios.get('/api/news');  // 🛠️ Now calling your own backend
    return res.data;
  } catch (error) {
    console.error("Failed to fetch news:", error.message || error);
    return [];
  }
};
