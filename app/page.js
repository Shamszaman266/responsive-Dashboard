// "use client";
// import Sidebar from "@/components/Sidebar";
// import { useState } from "react";
// import Login from "@/components/login"
// import MainContent from "@/components/MainContent";
// import Searchbar from "@/components/SearchBar";
// import Filters from "@/components/filters";
// import ChartCard from "@/components/ChartCard";
// import Navbar from "@/components/Navbar";

// export default function Home() {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   return (
//     <div>
//       <Navbar/>
//     <div className="flex min-h-screen bg-gray-100">
      
//       {/* Sidebar*/}
//       <Sidebar setActiveTab={setActiveTab} />

//       {/* Main Content */}
//       <main className="flex-1 p-6 space-y-6">
//         {/* Top Section */}
//         {/* <div className="flex flex-wrap gap-6"> */}
//           {/* Total Articles/Blogs */}
//           {/* <div className="bg-white p-6 rounded-lg shadow flex-1 min-w-[250px]">
//             <h3 className="text-lg font-semibold mb-2">Total Articles/Blogs</h3>
//             <div className="text-4xl font-bold">567</div>
//           </div> */}
//           <div className="flex flex-wrap gap-6">
//         <MainContent setActiveTab ={setActiveTab}/>
      
//           {/* Login Box */}
//           <Login setActiveTab={setActiveTab} />
          
//           </div>

//         {/* Filters */}
//         {/* <Filters setActiveTab = {setActiveTab}/> */}

//         {/* Chart and Table */}
//         <div className="flex flex-wrap gap-6">
//           {/* Chart */}
//           {/* <ChartCard setActiveTab={setActiveTab}/> */}

//           {/* Table */}
//           <Searchbar setActiveTab={setActiveTab} />
          
//         </div>
//       </main>
//     </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";

 

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div>
      {/* Top Navbar */}
      <Navbar />

      {/* Page Layout */}
      <div className="flex min-h-screen bg-gray-100">
        
        {/* Sidebar */}
        <Sidebar setActiveTab={setActiveTab} />

        {/* Main Area */}
        <main className="flex-1 p-6 space-y-6 text-gray-800">
          
          {/* Top Cards */}
          
            <MainContent /> {/* 🔥 News and Total Articles showing */}
           
          

          {/* Filters and Charts */}
          <div className="flex flex-wrap gap-6">
            {/* <Searchbar /> */}
            {/* Filters and Chart can be activated later */}
            {/* <Filters /> */}
            {/* <ChartCard /> */}
          </div>

        </main>

      </div>
    </div>
  );
}
