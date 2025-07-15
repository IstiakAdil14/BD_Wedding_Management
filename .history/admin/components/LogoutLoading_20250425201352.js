import React from 'react';

export default function LogoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 via-red-600 to-pink-600 animate-fadeIn">
      <div className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-12 rounded-3xl shadow-[0_0_20px_rgba(220,38,38,0.7)] w-full max-w-md backdrop-blur-md text-center transition-transform transform hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 dark:border-gray-700 h-20 w-20 mb-8 animate-spin border-red-600 dark:border-red-400 shadow-lg"></div>
          <h2 className="text-4xl font-extrabold mb-6 text-red-700 dark:text-red-400 tracking-wider flex items-center justify-center">
            Logging Out
            <span className="dots ml-3 text-red-600 dark:text-red-300 font-extrabold text-4xl animate-pulse">...</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg font-medium">
            Please wait while we log you out.
          </p>
        </div>
      </div>
      <style jsx>{`
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
  );
}
