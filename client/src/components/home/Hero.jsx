import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import useAuth from '../../auth/useAuth';

const Hero = () => {
    const { isAuthenticated } = useAuth();

    return (
        <section className="relative pt-44 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Status Badge */}
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest">v2.0 is live with AI Engine</span>
                        </div> */}

                        {/* Main Heading */}
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            Create a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                                smarter
                            </span> <br />
                            career.
                        </h1>

                        <p className="text-xl text-slate-600 mb-12 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            Stop struggling with formatting. Our AI-driven engine crafts high-conversion resumes that bypass ATS filters and land more interviews.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <Link
                                to={isAuthenticated ? '/app' : '/login?mode=register'}
                                className="btn-primary flex items-center gap-3 w-full sm:w-auto justify-center"
                            >
                                Start Building Free
                                <ArrowRight size={20} />
                            </Link>
                            <a
                                href="#features"
                                className="btn-secondary flex items-center gap-3 w-full sm:w-auto justify-center"
                            >
                                <div className="size-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    <Play size={16} fill="currentColor" />
                                </div>
                                See it in action
                            </a>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 delay-500">
                           <div className="flex items-center gap-2">
                                <Sparkles className="text-indigo-600" />
                                <span className="text-sm font-bold text-slate-900">AI Powered</span>
                           </div>
                           <div className="flex items-center gap-2">
                                <ShieldCheck className="text-indigo-600" />
                                <span className="text-sm font-bold text-slate-900">ATS Optimized</span>
                           </div>
                           <div className="flex items-center gap-2">
                                <Zap className="text-indigo-600" />
                                <span className="text-sm font-bold text-slate-900">Instant Export</span>
                           </div>
                        </div>
                    </div>

                    {/* Right Visual (The "Mockup" Resume) */}
                    <div className="flex-1 relative perspective-1000 hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
                        {/* Floating Glass Panels */}
                        <div className="relative w-full max-w-lg mx-auto transform rotate-y-[-20deg] rotate-x-[10deg] transition-all duration-700 hover:rotate-y-[-10deg] hover:rotate-x-[5deg]">

                            {/* Main Resume Page */}
                            <div className="glass-panel w-full aspect-[1/1.414] rounded-[2.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden bg-white/60">
                                <img src="/resume3.png" alt="Resume Preview" className="w-full h-full object-cover rounded-[2rem] border border-white/20" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Overlapping Tooltip Panels */}
                            <div className="absolute top-1/4 -left-12 glass-panel p-5 rounded-2xl shadow-xl animate-bounce-slow bg-white/90">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-200">98</div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ATS Score</p>
                                        <p className="text-sm font-black text-slate-900">Excellent!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-1/4 -right-12 glass-panel p-5 rounded-3xl shadow-xl animate-float bg-white/90">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Power</p>
                                        <p className="text-sm font-bold text-slate-900">Suggested Skill</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Background Glows */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[120%] bg-indigo-400/20 blur-[150px] -z-10 rounded-full animate-pulse"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
