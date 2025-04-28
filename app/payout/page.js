'use client';

import { useEffect, useState } from "react";
import { fetchNews } from "@/utils/api";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function PayoutPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState({}); // store payout rates per author

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      setArticles(newsData);
      setLoading(false);
    };

    getNews();
  }, []);

  // Group Articles by Author
  const authorData = articles.reduce((acc, article) => {
    const author = article.author || 'Unknown';
    if (!acc[author]) {
      acc[author] = { count: 0 };
    }
    acc[author].count += 1;
    return acc;
  }, {});

  const handleRateChange = (author, newRate) => {
    setRates(prev => ({
      ...prev,
      [author]: newRate
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem('authorRates', JSON.stringify({
        ...rates,
        [author]: newRate
      }));
    }
  };

  // Load payout rates from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRates = localStorage.getItem('authorRates');
      if (storedRates) {
        setRates(JSON.parse(storedRates));
      }
    }
  }, []);

  // 🧠 Export Payout Table to CSV
  const exportPayoutToCSV = () => {
    const csvRows = [
      ['Author', 'Article Count', 'Payout Rate (₹)', 'Total Payout (₹)']
    ];

    Object.entries(authorData).forEach(([author, { count }]) => {
      const rate = rates[author] || 0;
      const total = rate * count;
      csvRows.push([
        author,
        count,
        rate,
        total
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payout_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🧠 Export Payout Table to PDF
  const exportPayoutToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Author", "Articles", "Payout Rate (₹)", "Total Payout (₹)"];
    const tableRows = [];

    Object.entries(authorData).forEach(([author, { count }]) => {
      const rate = rates[author] || 0;
      const total = rate * count;
      const rowData = [
        author,
        count,
        rate,
        total
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('payout_report.pdf');
  };

  if (loading) return <div className="text-center mt-10">Loading payout data...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payout Management</h1>

      {/* Export Buttons */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={exportPayoutToCSV} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export Payout to CSV
        </button>

        <button 
          onClick={exportPayoutToPDF} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Export Payout to PDF
        </button>
      </div>

      {/* Payout Table */}
      <div className="overflow-x-auto bg-white p-6 rounded shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Article Count</th>
              <th className="py-2 px-4 text-left">Payout Rate (₹)</th>
              <th className="py-2 px-4 text-left">Total Payout (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(authorData).map(([author, { count }]) => (
              <tr key={author} className="border-t">
                <td className="py-2 px-4">{author}</td>
                <td className="py-2 px-4">{count}</td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={rates[author] || 0}
                    onChange={(e) => handleRateChange(author, Number(e.target.value))}
                    className="w-24 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-2 px-4">
                  ₹{(rates[author] || 0) * count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
