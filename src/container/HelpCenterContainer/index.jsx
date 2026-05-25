import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, UserCheck, Shield, HelpCircle, FileText, ArrowRight, Play } from 'lucide-react';
import VideoPlayer from '../../components/Video/VideoPlayer';

const HelpCenterContainer = () => {
  const guides = [
    { title: 'Getting Started', desc: 'New to Education Connect? Learn how to navigate your digital library.', icon: Play, color: 'bg-green-500' },
    { title: 'Account Security', desc: 'How to manage your password and protect your portal access.', icon: Shield, color: 'bg-red-500' },
    { title: 'Library Policies', desc: 'Understanding academic integrity and digital resource usage.', icon: FileText, color: 'bg-blue-500' },
    { title: 'Technical Guide', desc: 'Fixing common display issues and browser compatibility.', icon: HelpCircle, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#0F172A] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-[#3B82F6]/10 blur-[100px] rounded-full translate-x-1/2"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">Education Connect <span className="text-[#3B82F6]">Help Center</span></h1>
            <p className="text-white/70 max-w-2xl text-lg font-medium mb-10 leading-relaxed">
              Find step-by-step guides, video tutorials, and documentation to help you make the most of our digital learning resources.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#3B82F6] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
                <BookOpen className="w-4 h-4" />
                Browse Guides
              </button>
              <button className="bg-[#3B82F6] border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
                <UserCheck className="w-4 h-4" />
                Contact Admin
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {guides.map((guide, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 group transition-all"
            >
              <div className={`${guide.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-${guide.color.split('-')[1]}-200`}>
                <guide.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A] uppercase mb-4 tracking-tight group-hover:text-[#3B82F6] transition-colors">{guide.title}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{guide.desc}</p>
              <button className="text-[#0F172A] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Featured Video Tutorial */}
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
           <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-20 space-y-8">
                 <div className="bg-[#3B82F6] text-white text-[10px] font-black px-4 py-2 rounded-lg w-fit uppercase tracking-widest">Featured Video</div>
                 <h2 className="text-4xl font-black text-[#0F172A] uppercase tracking-tight leading-tight">How to Request Full Access to Library Materials</h2>
                 <p className="text-slate-500 text-lg font-medium leading-relaxed">
                   Watch this 2-minute video to learn how to use your Student Portal to request full PDF access from the school administration.
                 </p>
                 <ul className="space-y-4">
                    {['Login to portal', 'Find your textbook', 'Click "Request Access"', 'Wait for Admin Approval'].map(step => (
                      <li key={step} className="flex items-center gap-3 text-slate-700 font-bold uppercase text-xs tracking-wide">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <UserCheck className="w-3 h-3 text-white" />
                        </div>
                        {step}
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="p-4 sm:p-12 flex items-center justify-center bg-slate-950">
                 <VideoPlayer 
                    videoSrc="https://drive.google.com/file/d/1Cp7VqLoP8pPnye8JWBNGdl502faLCjEa/view?usp=drive_link" 
                    thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
                    videoId="tutorial_system_nav"
                    title="Guide: Navigating the Education Connect Library Portal"
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterContainer;
