import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center py-12">
      <div className="flex flex-col items-center">
        <Heart className="h-16 w-16 text-cyan-300" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900 tracking-tight">404</h1>
        <p className="mt-2 text-base text-gray-500">Page not found</p>
        <p className="mt-6 text-base text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;