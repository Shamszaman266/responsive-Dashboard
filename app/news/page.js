'use client';

import { useEffect, useState } from "react";
import { fetchNews } from "@/utils/api";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      setArticles(newsData);
      setFilteredArticles(newsData); // initially, show all
      setLoading(false);
    };

    getNews();
  }, []);

  // 🧠 Apply Filters and Search
  useEffect(() => {
    let filtered = articles;

    if (searchKeyword.trim() !== '') {
      filtered = filtered.filter(article =>
        (article.title && article.title.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (article.author && article.author.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    if (authorFilter.trim() !== '') {
      filtered = filtered.filter(article =>
        article.author && article.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (typeFilter !== 'All') {
      filtered = filtered.filter(article =>
        typeFilter === 'News' ? true : false  // Dummy logic (improve later if API has type field)
      );
    }

    setFilteredArticles(filtered);
  }, [searchKeyword, authorFilter, typeFilter, articles]);

  // Pie Chart Data
  const chartData = articles.reduce((acc, article) => {
    const author = article.author || 'Unknown';
    const existingAuthor = acc.find(item => item.name === author);

    if (existingAuthor) {
      existingAuthor.value += 1;
    } else {
      acc.push({ name: author, value: 1 });
    }

    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a29bfe', '#fd79a8', '#e17055'];

  // Export to CSV
  const exportToCSV = () => {
    const csvRows = [
      ['Title', 'Author', 'Published At']
    ];

    filteredArticles.forEach(article => {
      csvRows.push([
        article.title,
        article.author || 'Unknown',
        new Date(article.publishedAt).toLocaleDateString()
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "articles.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Title", "Author", "Published At"];
    const tableRows = [];

    filteredArticles.forEach(article => {
      const articleData = [
        article.title.slice(0, 40),
        article.author || 'Unknown',
        new Date(article.publishedAt).toLocaleDateString()
      ];
      tableRows.push(articleData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('articles.pdf');
  };

  if (loading) return <div className="text-center mt-10">Loading news...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">News Analytics</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Author Filter */}
        <input
          type="text"
          placeholder="Filter by Author..."
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full md:w-1/6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="News">News</option>
        </select>

      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={exportToCSV} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export to CSV
        </button>

        <button 
          onClick={exportToPDF} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Export to PDF
        </button>
      </div>

      {/* Articles Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-bold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-1">By: {article.author || 'Unknown'}</p>
              <p className="text-xs text-gray-400 mb-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                Read More
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No articles match your search/filter.
          </div>
        )}
      </div>

      {/* Pie Chart Section */}
      <div className="mt-10 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Articles by Author</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
