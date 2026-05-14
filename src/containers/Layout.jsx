import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';
import Logo from '../components/UI/Logo';
import { BrandConfig } from '../BrandConfig';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#3B82F6]/30">
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      
      <footer className="bg-[#0f172a] text-white pt-24 pb-12 mt-20 relative overflow-hidden">
        {/* Academic Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              <Logo variant="light" />
              <p className="text-white/50 text-sm leading-relaxed max-w-sm font-medium">
                {BrandConfig.footerText}
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                  <motion.a 
                    key={idx}
                    href="#"
                    whileHover={{ y: -5, color: '#3B82F6' }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/10 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3B82F6]">Academic Portal</h4>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Library Catalog', to: '/' },
                    { label: 'Student Portal', to: '/portal' },
                    { label: 'E-Resources', to: '/resources' },
                    { label: 'Admissions', to: '/admission' }
                  ].map((link) => (
                    <Link key={link.label} to={link.to} className="text-sm font-bold text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#3B82F6] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3B82F6]">Support Desk</h4>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Help Center', to: '/help' },
                    { label: 'Contact Admin', to: '/support' },
                    { label: 'FAQ Vault', to: '/faq' },
                    { label: 'About Connect', to: '/about' }
                  ].map((link) => (
                    <Link key={link.label} to={link.to} className="text-sm font-bold text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#3B82F6] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                   <Mail className="w-24 h-24" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-2 relative z-10">Library Newsletter</h4>
                <p className="text-xs text-white/40 font-bold mb-6 relative z-10">Get updates on new materials and schedules.</p>
                <div className="relative z-10">
                  <input 
                    type="email" 
                    placeholder="student@edu.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3B82F6] transition-all"
                  />
                  <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                 <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#3B82F6]" />
                    <span>Academic Block, New Delhi</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#3B82F6]" />
                    <span>+91 123 456 7890</span>
                 </div>
              </div>
            </div>

          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
              © 2024 {BrandConfig.name}. Developed for Academic Excellence.
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
              <Link to="/privacy" className="text-white/30 hover:text-[#3B82F6] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-white/30 hover:text-[#3B82F6] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
