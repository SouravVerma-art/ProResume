import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, Menu, X } from 'lucide-react';
import useAuth from '../auth/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* <div className="size-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg group-hover:scale-105 transition-transform">
             <img src="/logo.svg" alt="logo" className="h-5 w-auto" />
          </div> */}
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Pro<span className="text-indigo-600">Resume</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Templates', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/app"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="size-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/login?mode=register"
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-x-0 top-[72px] p-6 bg-white border-b border-slate-200 shadow-xl md:hidden transition-all duration-300 origin-top
        ${mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
      `}>
        <div className="flex flex-col gap-4">
          {['Features', 'Templates', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-600 p-2 hover:bg-slate-50 rounded-xl"
            >
              {item}
            </a>
          ))}
          <hr className="border-slate-100 my-2" />
          {isAuthenticated ? (
             <Link
               to="/app"
               onClick={() => setMobileMenuOpen(false)}
               className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-center font-bold shadow-lg shadow-indigo-500/20"
             >
               Go to Dashboard
             </Link>
           ) : (
             <Link
               to="/login?mode=register"
               onClick={() => setMobileMenuOpen(false)}
               className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-center font-bold shadow-lg shadow-indigo-500/20"
             >
               Get Started Free
             </Link>
           )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
