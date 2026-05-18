import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-20">
        <h1 className="text-9xl font-bold text-slate-100 mb-8">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Page not found</h2>
        <p className="text-lg text-slate-600 max-w-md mx-auto mb-10">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-sm"
        >
          Go back home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
