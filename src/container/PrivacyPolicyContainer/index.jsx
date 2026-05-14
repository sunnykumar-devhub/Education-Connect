import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicyContainer = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-[#0F172A] p-12 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Shield className="w-40 h-40" />
             </div>
             <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Privacy Policy</h1>
             <p className="text-white/70 font-medium uppercase tracking-[0.2em] text-xs">Effective Date: May 12, 2024</p>
          </div>
          
          <div className="p-8 md:p-16 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3B82F6]/10 p-2 rounded-lg text-[#3B82F6]">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">Introduction</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">
                At Education Connect Public School, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our Digital Library Portal. By accessing this portal, you agree to the terms described in this policy.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3B82F6]/10 p-2 rounded-lg text-[#3B82F6]">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">Data We Collect</h2>
              </div>
              <ul className="space-y-4 text-slate-600 font-medium">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6] mt-2 shrink-0"></div>
                  <span><strong>Student Identification:</strong> Name, Admission Number, and Grade.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6] mt-2 shrink-0"></div>
                  <span><strong>Usage Data:</strong> Reading progress, book access history, and time spent on the portal.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6] mt-2 shrink-0"></div>
                  <span><strong>Device Information:</strong> IP address, browser type, and device identifiers used for security audits.</span>
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3B82F6]/10 p-2 rounded-lg text-[#3B82F6]">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">How We Use Your Data</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Your data is used solely for academic and security purposes within Education Connect Public School:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-[#0F172A] uppercase text-xs mb-2">Personalization</h4>
                  <p className="text-slate-500 text-xs">To show you relevant study materials and track your reading progress.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-[#0F172A] uppercase text-xs mb-2">Security</h4>
                  <p className="text-slate-500 text-xs">To prevent unauthorized access to premium academic resources.</p>
                </div>
              </div>
            </section>

            <div className="pt-12 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                If you have any questions regarding your data, please contact the <br/> 
                <a href="/support" className="text-[#0F172A] hover:underline">IT Security Department</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContainer;
