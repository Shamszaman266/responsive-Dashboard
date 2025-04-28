// app/api/news/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    });

    return NextResponse.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
