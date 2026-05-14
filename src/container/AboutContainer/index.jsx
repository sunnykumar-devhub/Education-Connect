import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, ShieldCheck } from 'lucide-react';

const AboutContainer = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#0F172A] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-4 tracking-tight">About Education Connect</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg opacity-90">Building the foundation for tomorrow's leaders through digital connection.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-[#0F172A] mb-6 uppercase tracking-tight">Our Tech-First Legacy</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6 font-medium">
              Education Connect was founded with a single vision: to create a digital environment 
              where learning is not just about books, but about discovering one's true potential through technology. 
              We believe in an education that empowers students to think critically, act with 
              integrity, and lead with compassion in the modern age.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-10">
              <div>
                <p className="text-4xl font-black text-[#3B82F6]">15+</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Digital Hubs</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#0F172A]">10k+</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Learners</p>
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-[4rem] overflow-hidden shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1523050853063-bd388f9f79b5?auto=format&fit=crop&q=80&w=600" 
              alt="Education Connect Hub" 
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#0F172A]/20 group-hover:bg-transparent transition-colors"></div>
          </div>
        </div>
      </section>

      {/* Mission/Vision Cards */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Target />, title: "Our Mission", desc: "To bridge the gap between students and high-quality study materials through a seamless digital experience." },
            { icon: <Heart />, title: "Our Values", desc: "Innovation, Accessibility, and Excellence are at the core of our platform." },
            { icon: <ShieldCheck />, title: "Data Security", desc: "We provide a secure and private environment for students to access academic materials." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 group transition-all"
            >
              <div className="w-14 h-14 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center text-[#3B82F6] mb-8 group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-[#0F172A] mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutContainer;
