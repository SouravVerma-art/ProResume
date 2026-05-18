import React from 'react'
import { Quote } from 'lucide-react'

const Testimonials = () => {

    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
            text: 'ProResume made undercutting all of our competitors an absolute breeze.'
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            text: 'This service transformed our workflow and saved us hours every week!'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            text: 'I have never been happier with a product—totally worth it!'
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Alex Rivera',
            handle: '@alexdev',
            text: 'Fantastic experience—our team loves it!'
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="glass-panel p-8 mx-4 w-80 shrink-0 group hover:bg-white/60 transition-all rounded-3xl border-white/40 shadow-xl">
            <Quote className="size-8 text-indigo-200 mb-6 group-hover:text-indigo-400 transition-colors" />
            <p className="text-base text-slate-700 leading-relaxed font-medium mb-8">"{card.text}"</p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <img className="size-12 rounded-2xl object-cover border-2 border-white shadow-md" src={card.image} alt={card.name} />
                <div className="flex flex-col">
                    <p className="font-black text-slate-900 text-sm tracking-tight">{card.name}</p>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{card.handle}</span>
                </div>
            </div>
        </div>
    );

    return (
        <section id="templates" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                 <div className="glass-panel inline-flex px-4 py-2 rounded-full mb-6">
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Wall of Love</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
                    Loved by <span className="text-indigo-600">thousands</span> <br /> of job seekers.
                </h2>
            </div>

            <div className="marquee-row w-full overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent"></div>
                <div className="marquee-inner flex transform-gpu pt-10 pb-5">
                    {[...cardsData, ...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent"></div>
            </div>

            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-inner {
                    animation: marqueeScroll 40s linear infinite;
                    width: max-content;
                }
                .marquee-inner:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}

export default Testimonials
