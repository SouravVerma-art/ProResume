import React from 'react'
import { Zap, Shield, BarChart3, Layout, FileText, Sparkles, MousePointer2, Smartphone, Globe } from "lucide-react";

const Features = () => {
    return (
        <section id='features' className='max-w-7xl mx-auto px-6 py-32 relative'>

            <div className="flex flex-col items-center mb-24 text-center">
                <div className="glass-panel px-4 py-2 rounded-full mb-6">
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Platform Capabilities</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                    Engineered for <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">performance.</span>
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl font-medium">
                    We've combined generative AI with precision design to give you a competitive edge in the modern job market.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-none md:grid-rows-2 gap-6 h-auto md:h-[800px]">

                {/* 1. AI Assistant (Big) */}
                <div className="md:col-span-8 md:row-span-1 bento-card relative overflow-hidden group flex flex-col">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-8">
                            <div className="size-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">AI Bullet-Point Engine</h3>
                            <p className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed">
                                Transform basic job duties into high-impact achievements with a single click. Our AI knows exactly what recruiters are looking for.
                            </p>
                        </div>

                        <div className="mt-auto glass-panel p-6 rounded-2xl border-indigo-100 bg-white/80 max-w-full ">
                            <p className="text-sm font-bold text-slate-700 leading-relaxed italic break-words">
                                "Optimized cloud infrastructure resulting in a 35% reduction in monthly operational costs and 99.9% uptime."
                            </p>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 size-64 bg-indigo-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                </div>

                {/* 2. ATS Score (Medium) */}
                <div className="md:col-span-4 md:row-span-1 bento-card flex flex-col items-center justify-center text-center group">
                    <div className="relative size-40 mb-8 flex items-center justify-center">
                        <svg className="size-full -rotate-90">
                            <circle cx="80" cy="80" r="70" className="fill-none stroke-slate-100 stroke-[12]" />
                            <circle cx="80" cy="80" r="70" className="fill-none stroke-indigo-600 stroke-[12] animate-in fade-in duration-1000" strokeDasharray="440" strokeDashoffset="44" />
                        </svg>
                        <span className="absolute text-4xl font-black text-slate-900">90%</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">ATS Checker</h3>
                    <p className="text-slate-500 font-medium">Real-time compatibility scoring.</p>
                </div>

                {/* 3. Mobile Friendly (Small) */}
                <div className="md:col-span-3 md:row-span-1 bento-card flex flex-col justify-between group p-8">

                    {/* Top Section */}
                    <div>
                        <div className="size-10 rounded-3xl bg-indigo-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <Smartphone className="size-10 text-indigo-600" />
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                            Build on Mobile
                        </h3>

                    </div>

                    {/* Bottom Mobile Preview */}
                    <div className="mt-5">

                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">

                            {/* Fake Mobile UI */}
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">
                                        Resume Progress
                                    </p>

                                    <h4 className="text-lg font-bold text-slate-900">
                                        92% Complete
                                    </h4>
                                </div>

                                <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-green-600 text-sm font-bold">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-5">
                                <div className="h-full w-[92%] bg-indigo-500 rounded-full"></div>
                            </div>

                            {/* Small Feature Pills */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                                    AI Writing
                                </span>

                                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                                    ATS Ready
                                </span>

                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                    Mobile Sync
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Global Sharing (Large Height) */}
                <div className="md:col-span-5 md:row-span-1 bento-card relative overflow-hidden group">
                    <div className="size-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Globe size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">Public Live Link</h3>
                    <p className="text-slate-500 font-medium mb-8">Share your resume via a unique, professional URL. Track views and engagement in real-time.</p>

                    <div className="glass-panel py-3 px-5 rounded-xl border-white/60 flex items-center gap-3">
                        <div className="size-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-mono text-slate-500">proresume.io/alex-doe</span>
                        <MousePointer2 size={14} className="ml-auto text-indigo-600" />
                    </div>
                </div>

                {/* 5. Security (Small) */}
                <div className="md:col-span-4 md:row-span-1 bento-card flex flex-col justify-between group p-8">
                    <div>

                        <div className="size-10 rounded-3xl bg-green-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <Shield className="size-10 text-green-600" />
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                            Encrypted Data
                        </h3>

                    </div>

                    {/* Bottom Security Card */}
                    <div className="mt-2 bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm">

                        {/* Security Status */}
                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                                    Security Status
                                </p>

                                <h4 className="text-lg font-bold text-slate-900 mt-1">
                                    Fully Protected
                                </h4>
                            </div>

                            <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                                <Shield className="size-6 text-green-600" />
                            </div>
                        </div>

                        {/* Encryption Bar */}
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-5">
                            <div className="h-full w-full bg-green-500 rounded-full"></div>
                        </div>

                        {/* Security Features */}
                        <div className="flex flex-wrap gap-2">

                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                AES-256
                            </span>

                            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                                Secure Cloud
                            </span>

                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                Privacy First
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Features
