import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import useAuth from '../../auth/useAuth';

const CallToAction = () => {
    const { isAuthenticated } = useAuth();

    return (
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-32">
            <div className="glass-panel rounded-[3rem] p-12 md:p-24 overflow-hidden relative text-center">
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="size-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-10 shadow-2xl shadow-indigo-500/40 rotate-12">
                        <Sparkles size={32} />
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 max-w-3xl">
                        Ready to elevate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                            your career?
                        </span>
                    </h2>
                    
                    <p className="text-xl text-slate-600 mb-12 max-w-xl font-medium leading-relaxed">
                        Join thousands of professionals who have used ProResume to secure interviews at top companies worldwide.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Link 
                            to={isAuthenticated ? '/app' : '/login?mode=register'} 
                            className="btn-primary flex items-center gap-3 w-full sm:w-auto px-12"
                        >
                            Build My Resume Now
                            <ArrowRight size={20} />
                        </Link>
                        <p className="text-sm font-bold text-slate-400">
                            No credit card required. <br className="sm:hidden" /> Cancel anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction
