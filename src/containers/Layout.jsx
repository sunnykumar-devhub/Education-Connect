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
      
      <footer className="bg-[#0f172a] text-white pt-16 pb-8 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            <div className="lg:col-span-4 space-y-6">
              <Logo variant="light" className="scale-75 origin-left" />
              <p className="text-white/40 text-[11px] leading-relaxed max-w-xs font-medium">
                {BrandConfig.footerText}
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                  <motion.a 
                    key={idx}
                    href="#"
                    whileHover={{ y: -3, color: '#3B82F6' }}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:bg-white/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3B82F6]">Academic</h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Library Catalog', to: '/' },
                    { label: 'Student Portal', to: '/portal' },
                    { label: 'E-Resources', to: '/resources' },
                    { label: 'Admissions', to: '/admission' }
                  ].map((link) => (
                    <Link key={link.label} to={link.to} className="text-[11px] font-bold text-white/30 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#3B82F6] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3B82F6]">Support</h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Help Center', to: '/help' },
                    { label: 'Contact Admin', to: '/support' },
                    { label: 'FAQ Vault', to: '/faq' },
                    { label: 'About Connect', to: '/about' }
                  ].map((link) => (
                    <Link key={link.label} to={link.to} className="text-[11px] font-bold text-white/30 hover:text-white transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#3B82F6] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                <h4 className="text-sm font-black uppercase tracking-tight mb-1 relative z-10">Newsletter</h4>
                <p className="text-[10px] text-white/30 font-bold mb-4 relative z-10">Get academic updates instantly.</p>
                <div className="relative z-10">
                  <input 
                    type="email" 
                    placeholder="student@edu.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#3B82F6] transition-all"
                  />
                  <button className="absolute right-1 top-1 bottom-1 px-3 bg-[#3B82F6] text-white rounded-lg hover:bg-blue-600 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2.5 text-[9px] font-black uppercase tracking-widest text-white/20">
                 <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>Academic Block, New Delhi</span>
                 </div>
                 <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>+91 123 456 7890</span>
                 </div>
              </div>
            </div>

          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
              © 2024 {BrandConfig.name}. Developed for Academic Excellence.
            </div>
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest">
              <Link to="/privacy" className="text-white/20 hover:text-[#3B82F6] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-white/20 hover:text-[#3B82F6] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
