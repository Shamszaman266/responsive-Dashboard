import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = async () => {
  try {
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    return res.data.articles;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
};
