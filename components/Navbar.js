// 'use client';

// import React from 'react';
// import { signIn, signOut, useSession } from "next-auth/react";

// export default function Navbar() {
//     const { data: session } = useSession();

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//             <form className="bg-white p-6 rounded shadow-md w-80 mt-10" onSubmit={(e) => e.preventDefault()}>
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full p-2 mb-4 border rounded"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="w-full p-2 mb-4 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
//                 >
//                     Login
//                 </button>
//             </form>

//             {/* GitHub Sign In Section outside the form */}
//             <div className="bg-white p-4 rounded shadow-md w-80 mt-4 flex flex-col items-center">
//                 {session ? (
//                     <>
//                         <span className="mb-2">Hi, {session.user.name}</span>
//                         <button
//                             onClick={() => signOut()}
//                             className="w-full bg-red-500 text-white px-4 py-2 rounded"
//                         >
//                             Sign Out
//                         </button>
//                     </>
//                 ) : (
//                     <button
//                         onClick={() => signIn('github')}
//                         className="w-full bg-green-500 text-white px-4 py-2 rounded"
//                     >
//                         Sign In with GitHub
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }
"use client";


import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar (){
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

    return (
        <div>
            {/* Navbar */}
      <nav className="bg-gray-500 p-4 flex justify-between items-center rounded-t-lg">
        <h1 className="text-white text-xl font-bold">News Dashboard</h1>
        <button 
          onClick={openModal}
          className="bg-white bg-opacity-20 text-black px-4 py-2 rounded hover:bg-opacity-30"
        >
          Login
        </button>
      </nav>

      {/* Modal (only show if isOpen is true) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            {/* Close button */}
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
            >
              &times;
            </button>

            {/* Login Form */}
            <div className="flex flex-col items-center justify-center bg-gray-100 p-2">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
                >
                    Login
                </button>
            </form>

            {/* GitHub Sign In Section outside the form */}
            <div className="bg-white p-4 rounded shadow-md w-80 mt-4 flex flex-col items-center">
                {session ? (
                    <>
                        <span className="mb-2">Hi, {session.user.name}</span>
                        <button
                            onClick={() => signOut()}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => signIn('github')}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Sign In with GitHub
                    </button>
                )}
            </div>
        </div>
          </div>
        </div>
      )}
        </div>
    )
}
