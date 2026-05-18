import React, { useEffect, useState } from 'react';
import { Loader2, LockKeyhole, Mail, UserRound, ArrowLeftIcon } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import useAuth from '../auth/useAuth';

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, googleLogin, isAuthenticated, isLoading } = useAuth();

  const currentMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const redirectTo = location.state?.from?.pathname || '/app';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      name: currentMode === 'register' ? previous.name : '',
    }));
  }, [currentMode]);

  const setMode = (nextMode) => {
    if (nextMode === 'register') {
      setSearchParams({ mode: 'register' });
      return;
    }
    setSearchParams({});
  };

  const handleChange = (field) => (event) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (currentMode === 'register') {
        await register(formData);
        toast.success('Account created successfully');
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        });
        toast.success('Welcome back');
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      await googleLogin(response.credential);
      toast.success('Signed in with Google');
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error('Google sign-in failed');
    }
  };

  const handleGoogleFailure = () => {
    toast.error('Google sign-in was unsuccessful. Try again.');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-6 bg-slate-50">
      {/* Aurora Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] animate-aurora-1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] animate-aurora-2"></div>
      </div>

      <Link
        to="/"
        className="fixed top-12 left-12 hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-all group z-20"
      >
        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back home
      </Link>

      <div className="w-full max-w-[480px] relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <span className="text-3xl font-black tracking-tighter text-slate-900">
                Pro<span className="text-indigo-600">Resume</span>
            </span>
          </Link>

          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-3">
            {currentMode === 'register' ? 'Join the future.' : 'Welcome back.'}
          </h1>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">
            {currentMode === 'register'
              ? 'Start building high-conversion, AI-powered resumes today.'
              : 'Enter your credentials to access your professional workspace.'}
          </p>
        </div>

        <div className="glass-panel p-10 bg-white/90 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-white/60 relative overflow-hidden">
           {/* Subtle internal glow */}
           <div className="absolute top-0 right-0 size-32 bg-indigo-500/5 blur-3xl rounded-full"></div>

          <div className="mb-10 flex justify-center scale-105">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
              text={currentMode === 'register' ? 'signup_with' : 'signin_with'}
              shape="pill"
            />
          </div>

          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="bg-white/10 px-4 text-slate-400">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentMode === 'register' && (
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserRound className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    value={formData.name}
                    onChange={handleChange('name')}
                    type="text"
                    placeholder="John Doe"
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  value={formData.email}
                  onChange={handleChange('email')}
                  type="email"
                  placeholder="name@company.com"
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockKeyhole className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  value={formData.password}
                  onChange={handleChange('password')}
                  type="password"
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {currentMode === 'register' ? 'Create Free Account' : 'Secure Sign In'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 font-medium">
              {currentMode === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setMode(currentMode === 'register' ? 'login' : 'register')}
                className="font-black text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer ml-1"
              >
                {currentMode === 'register' ? 'Sign in →' : 'Create one →'}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
           Enterprise-grade security • Powered by Gemini AI
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
