// import React from 'react'

// export default function MainContent() {
//   return (
//     <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen items-center">
      
//       {/* Total Articles/Blogs */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-80">
//         <h2 className="text-lg font-semibold mb-4">Total Articles/Blogs</h2>
//         <div className="text-4xl font-bold text-center">567</div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">Author</label>
//           <input 
//             type="text" 
//             placeholder="Date range" 
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2">Type</label>
//           <select 
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option>Type</option>
//             <option>News</option>
//             <option>Blogs</option>
//             <option>Other</option>
//           </select>
//         </div>
//       </div>

//       {/* Pie Chart (Fake for now) */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col items-center">
//         {/* You can replace below div with actual chart later */}
//         <div className="w-40 h-40 bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-300 rounded-full flex items-center justify-center mb-4">
//           <div className="text-white text-sm font-bold">Pie Chart</div>
//         </div>

//         {/* Chart labels */}
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
//             <span>News 62%</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 bg-blue-700 rounded-full"></span>
//             <span>Blogs 23%</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 bg-blue-300 rounded-full"></span>
//             <span>Other 15%</span>
//           </div>
//         </div>
//       </div>

//     </div>

    
//  ) 
// }


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { fetchNews } from '@/utils/api';  // Import your fetchNews function

// export default function MainContent() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getNews = async () => {
//       const newsData = await fetchNews();
//       setArticles(newsData);
//       setLoading(false);
//     };

//     getNews();
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading news...</div>;

//   return (
//     <>
//      {/* Total Articles/Blogs */}
//      <div className="bg-white p-6 rounded-lg shadow-md w-80">
//      <h2 className="text-lg font-semibold mb-4">Total Articles/Blogs</h2>
//      <div className="text-4xl font-bold text-center">{articles.length}</div>
//    </div>
//     {/* Filters (Dummy for now) */}
//     <div className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">Author</label>
//           <input 
//             type="text" 
//             placeholder="Enter author" 
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2">Type</label>
//           <select 
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option>All</option>
//             <option>News</option>
//             <option>Blog</option>
//           </select>
//         </div>
//       </div>


//     <div className="">
     

//       {/* Articles Section */}
//       <div className="flex flex-wrap gap-6">
//   {articles.map((article, index) => (
//     <div key={index} className="bg-white p-4 rounded shadow-md w-80">
//       <h2 className="text-lg font-bold mb-2">{article.title}</h2>
//       <p className="text-sm text-gray-600 mb-1">By: {article.author || 'Unknown'}</p>
//       <p className="text-xs text-gray-400 mb-1">{new Date(article.publishedAt).toLocaleDateString()}</p>
//       <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
//         Read More
//       </a>
//     </div>
//   ))}
// </div>


//     </div>
//     </>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchNews } from '@/utils/api';
// import Link from 'next/link';

// export default function MainContent() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getNews = async () => {
//       const newsData = await fetchNews();
//       setArticles(newsData);
//       setLoading(false);
//     };

//     getNews();
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading summary...</div>;

//   return (
//     <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen items-center">

//       {/* Total Articles/Blogs */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-80">
//         <h2 className="text-lg font-semibold mb-4">Total Articles/Blogs</h2>
//         <div className="text-4xl font-bold text-center">{articles.length}</div> {/* ✅ real count */}
//       </div>

//       {/* Few Articles Display */}
//       <div className="flex flex-wrap gap-6 justify-center mt-6">
//         {articles.slice(0, 6).map((article, index) => (   // ✅ Only show first 6 articles
//           <div key={index} className="bg-white p-4 rounded shadow-md w-80">
//             <h2 className="text-lg font-bold mb-2">{article.title}</h2>
//             <p className="text-sm text-gray-600 mb-1">By: {article.author || 'Unknown'}</p>
//             <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
//               Read More
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Button to Go to News Analytics */}
//       <Link href="/news">
//         <button className="mt-8 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
//           View All News Analytics
//         </button>
//       </Link>

//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { fetchNews } from '@/utils/api';
import Link from 'next/link';

export default function MainContent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      setArticles(newsData);
      setLoading(false);
    };

    getNews();
  }, []);

  // Group articles by author for Top Authors Table
  const topAuthors = Object.entries(
    articles.reduce((acc, article) => {
      const author = article.author || 'Unknown';
      if (!acc[author]) {
        acc[author] = 0;
      }
      acc[author] += 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1]) // sort descending
    .slice(0, 3); // show top 3 authors

  if (loading) return <div className="text-center mt-10">Loading summary...</div>;

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen items-center">

      {/* Total Articles/Blogs */}
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Total Articles/Blogs</h2>
        <div className="text-4xl font-bold text-center">{articles.length}</div>
      </div>

      {/* Few Articles Display */}
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {articles.slice(0, 6).map((article, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-2">{article.title}</h2>
            <p className="text-sm text-gray-600 mb-1">By: {article.author || 'Unknown'}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
              Read More
            </a>

            
          </div>
        ))}
      </div>

       {/* Button to Go to News Analytics */}
       <Link href="/news">
        <button className="mt-8 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          View Full News Analytics
        </button>
      </Link>

      {/* Tables Section */}
      <div className="flex flex-wrap gap-6 justify-center mt-8">

        {/* Recent Articles Table */}
        <div className="bg-white p-6 rounded shadow-md w-full md:w-[45%]">
          <h3 className="text-xl font-bold mb-4">Recent Articles</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Author</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {articles.slice(0, 5).map((article, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{article.title.slice(0, 30)}...</td>
                    <td className="py-2 px-4">{article.author || 'Unknown'}</td>
                    <td className="py-2 px-4">{new Date(article.publishedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Authors Table */}
        <div className="bg-white p-6 rounded shadow-md w-full md:w-[45%]">
          <h3 className="text-xl font-bold mb-4">Top Authors</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Author</th>
                  <th className="py-2 px-4 text-left">Articles</th>
                </tr>
              </thead>
              <tbody>
                {topAuthors.map(([author, count], index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{author}</td>
                    <td className="py-2 px-4">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

     

    </div>
  );
}
