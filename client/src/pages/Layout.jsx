import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
