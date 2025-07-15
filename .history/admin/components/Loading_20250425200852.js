import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-md text-center">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-6 animate-spin border-purple-600"></div>
          <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-wide flex items-center justify-center">
            Loading
            <span className="dots ml-2 text-purple-600 font-extrabold text-3xl animate-pulse">...</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300">Please wait while we log you in.</p>
        </div>
      </div>
      <style jsx>{`
        .loader {
          border-top-color: #7c3aed; /* Tailwind purple-600 */
        }
        .dots {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
