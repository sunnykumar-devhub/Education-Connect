import React from 'react';
import { ClipboardList, CheckCircle, ArrowRight } from 'lucide-react';

const AdmissionContainer = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0F172A] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-4 tracking-tight">Access Your Future 2024-25</h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">Start your journey towards digital excellence with Education Connect.</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Process Section */}
          <div>
            <h2 className="text-3xl font-black text-[#0F172A] mb-10 uppercase tracking-tight">Onboarding Process</h2>
            <div className="space-y-12">
              {[
                { step: "01", title: "Digital Registration", desc: "Fill out the online registration form to create your student identity on our platform." },
                { step: "02", title: "Verification", desc: "A brief verification process to confirm student enrollment details and grade." },
                { step: "03", title: "Full Access", desc: "Once verified, gain immediate access to all textbooks and interactive study materials." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-5xl font-black text-slate-100 group-hover:text-[#3B82F6]/20 transition-colors">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-8 bg-[#3B82F6]/5 rounded-[3rem] border border-[#3B82F6]/10">
              <h3 className="text-xl font-black text-[#3B82F6] mb-6 flex items-center gap-2 uppercase tracking-tight">
                <ClipboardList /> Document Checklist
              </h3>
              <ul className="space-y-4">
                {["Digital Student ID", "Grade Confirmation", "Recent Photograph", "Contact Details"].map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <CheckCircle className="text-[#3B82F6]" size={18} /> {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#3B82F6]/5 rounded-full -mr-16 -mt-16"></div>
            
            <h3 className="text-2xl font-black text-[#0F172A] mb-10 uppercase tracking-tight">Online Registration</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Registration submitted successfully!'); }}>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Student Name</label>
                <input type="text" required className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-bold text-slate-900" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Class/Grade</label>
                  <select className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-bold text-slate-900">
                    <option>Class 1-5</option>
                    <option>Class 6-8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Date of Birth</label>
                  <input type="date" required className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-bold text-slate-900" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Phone Number</label>
                <input type="tel" required className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-bold text-slate-900" placeholder="+91 00000 00000" />
              </div>
              <button type="submit" className="w-full bg-[#3B82F6] text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/20 mt-8 active:scale-95">
                Join Education Connect <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionContainer;
