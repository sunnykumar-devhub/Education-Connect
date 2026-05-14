import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Send, User, Phone, Mail, GraduationCap } from 'lucide-react';
import { BrandConfig } from '../../BrandConfig';

const AccessForm = ({ schoolName = BrandConfig.name }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(15,23,42,0.15)] overflow-hidden border border-slate-100"
    >
      <div className="bg-[#0f172a] p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <GraduationCap className="w-32 h-32 text-white" />
        </div>
        <div className="bg-white/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/10">
          <Lock className="w-10 h-10 text-[#3B82F6]" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Full Access Required</h2>
        <p className="text-[#3B82F6] text-[10px] font-black uppercase tracking-[0.3em]">
          {schoolName} Digital Vault
        </p>
      </div>

      <div className="p-10 space-y-8">
        <div className="text-center">
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Unlock your full potential with {BrandConfig.name}. Please verify your student details to continue.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <User className="w-3.5 h-3.5" />
              Student Name
            </label>
            <input 
              required
              type="text"
              placeholder="Enter student name"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-slate-900 font-bold placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Mail className="w-3.5 h-3.5" />
              Student Email
            </label>
            <input 
              required
              type="email"
              placeholder="student@example.com"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-slate-900 font-bold placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Phone className="w-3.5 h-3.5" />
              Phone Number
            </label>
            <input 
              required
              type="tel"
              placeholder="+91 00000 00000"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-[#3B82F6] focus:bg-white transition-all text-slate-900 font-bold placeholder:text-slate-300"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0f172a] hover:bg-[#3B82F6] text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-[#0f172a]/20 flex items-center justify-center gap-3 group mt-8 uppercase text-xs tracking-widest active:scale-95"
          >
            Unlock Access
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#3B82F6]" />
          </button>
        </form>

        <div className="pt-6 border-t border-slate-50">
          <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-widest leading-loose">
            Administration will contact you <br/> <span className="text-[#3B82F6]">within 24 hours</span> to provide access.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AccessForm;
