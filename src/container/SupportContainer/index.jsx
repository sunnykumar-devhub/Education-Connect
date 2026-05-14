import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

const SupportContainer = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#0F172A]/10 text-[#0F172A] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4"
          >
            Administration Support
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#0F172A] uppercase tracking-tight mb-6"
          >
            How can we <span className="text-[#3B82F6]">help you?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Have questions about digital access, physical library hours, or technical issues? 
            Our administration team is here to support your academic journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Phone, title: 'Call Us', detail: '+91 123 456 7890', sub: 'Mon-Sat, 8am - 4pm', color: 'bg-blue-500' },
            { icon: Mail, title: 'Email Support', detail: 'admin@educationconnect.edu', sub: '24/7 Digital Desk', color: 'bg-[#3B82F6]' },
            { icon: MessageSquare, title: 'Live Chat', detail: 'Available on Portal', sub: 'For verified students', color: 'bg-purple-500' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-center group hover:border-[#0F172A]/20 transition-all"
            >
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A] uppercase mb-2">{item.title}</h3>
              <p className="text-lg font-bold text-slate-900 mb-1">{item.detail}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-8 md:p-16 space-y-8">
            <h2 className="text-3xl font-black text-[#0F172A] uppercase tracking-tight">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Your Name</label>
                  <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0F172A] transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Admission No.</label>
                  <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0F172A] transition-all" placeholder="LPS-XXXX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Issue Subject</label>
                <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0F172A] transition-all text-slate-500 font-bold uppercase text-xs tracking-widest">
                  <option>PDF Access Request</option>
                  <option>Login Issues</option>
                  <option>Missing Study Material</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Message Detail</label>
                <textarea className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0F172A] transition-all h-32" placeholder="Tell us more about your issue..."></textarea>
              </div>
              <button className="w-full bg-[#3B82F6] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">Submit Support Request</button>
            </form>
          </div>
          
          <div className="bg-[#0F172A] h-full p-8 md:p-16 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-40 h-40" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Our Campus</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-white/10 p-4 rounded-2xl h-fit">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm mb-2">Main Office</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Education Connect Campus,<br/>
                    Educational Block, Sector 42,<br/>
                    New Delhi, India - 110001
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-white/10 p-4 rounded-2xl h-fit">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm mb-2">Office Hours</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Monday - Friday: 08:00 AM - 04:00 PM<br/>
                    Saturday: 08:00 AM - 12:00 PM<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-20 p-8 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xs italic text-white/70">
                "We are committed to providing a seamless digital learning experience for every student at Education Connect."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-[#3B82F6]"></div>
                <div>
                  <div className="text-[10px] font-black uppercase">Dr. Amit Verma</div>
                  <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Head of Administration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportContainer;
