import React from 'react';
import { Link } from 'react-router-dom';
import {
    Twitter,
    Github,
    Linkedin,
    Instagram,
    FileText,
    Briefcase,
    User,
    Sparkles,
    Mail
} from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Twitter, href: "https://x.com/SouravVerm54614", label: "Twitter" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/sourav-verma-2bb838394?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
        { icon: Mail, href: "mailto:support@proresume.com", label: "Email" },
    ];

    const featureIcons = [
        { icon: FileText, label: "Resume Builder" },
        { icon: Sparkles, label: "AI Powered" },
        { icon: Briefcase, label: "Career Growth" },
        { icon: User, label: "Personalized" },
    ];

    return (
        <footer className="max-w-7xl mx-auto px-6 mb-12">
            <div className="glass-panel rounded-[3rem] p-12 md:p-20 overflow-hidden relative border border-white/20 shadow-2xl bg-white/40">
                {/* Decorative Aurora background inside footer */}
                <div className="absolute top-0 right-0 size-96 bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 size-96 bg-purple-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 flex flex-wrap justify-between gap-16">
                    <div className="max-w-xs">
                        <Link to="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
                            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                                Pro<span className="text-indigo-600">Resume</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 font-medium leading-relaxed mb-8">
                            Empowering job seekers with AI-driven resume technology. Join 10,000+ professionals who landed their dream jobs.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={i}
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="size-10 glass-panel rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg bg-white/80"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                        <div>
                            <p className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Product</p>
                            <ul className="space-y-4">
                                <li><a href="#features" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Features</a></li>
                                <li><a href="#templates" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Templates</a></li>
                                <li><a href="#features" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">AI Engine</a></li>
                                <li><a href="#pricing" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Company</p>
                            <ul className="space-y-4">
                                <li><a href="/" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">About Us</a></li>
                                <li><a href="/" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Blog</a></li>
                                <li><a href="/" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Careers</a></li>
                                <li><a href="/" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Contact</a></li>
                            </ul>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-slate-900 font-black text-sm uppercase tracking-widest mb-6">Legal</p>
                            <ul className="space-y-4">
                                <li><a href="/" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Privacy</a></li>
                                <li><a href="/" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Terms</a></li>
                                <li><a href="/" className="text-slate-500 hover:text-indigo-600 font-medium transition text-sm">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="relative z-10 mt-20 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 ProResume. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <a href="/" className="text-slate-400 hover:text-indigo-600 text-[10px] font-bold uppercase tracking-widest transition">Privacy Policy</a>
                        <a href="/" className="text-slate-400 hover:text-indigo-600 text-[10px] font-bold uppercase tracking-widest transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
