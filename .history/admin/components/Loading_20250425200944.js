import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-fadeIn">
      <div className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-12 rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.7)] w-full max-w-md backdrop-blur-md text-center transition-transform transform hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-8 animate-spin border-purple-600 shadow-lg"></div>
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-wider flex items-center justify-center">
            Loading
            <span className="dots ml-3 text-purple-600 font-extrabold text-4xl animate-pulse">...</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg font-medium">
            Please wait while we log you in.
          </p>
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 dark:bg-purple-500 animate-progressBar"></div>
          </div>
        </div>
      <style jsx>{`
        .loader {
          border-top-color: #7c3aed; /* Tailwind purple-600 */
          box-shadow: 0 0 15px #7c3aed;
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
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progressBar {
          animation: progressBar 2s linear forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in forwards;
        }
      `}</style>
      </div>
    </div>
  );
}
