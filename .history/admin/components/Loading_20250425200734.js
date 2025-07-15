import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-md text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-wide">
          Loading...
        </h2>
        <p className="text-gray-700 dark:text-gray-300">Please wait while we log you in.</p>
      </div>
    </div>
  );
}
