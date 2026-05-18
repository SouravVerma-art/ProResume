import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Aurora Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] animate-aurora-1"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] animate-aurora-2"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-pink-100/30 rounded-full blur-[100px] animate-aurora-1" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px] animate-aurora-2" style={{ animationDelay: '-10s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
    </div>
  )
}

export default Home
