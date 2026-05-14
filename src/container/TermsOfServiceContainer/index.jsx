import React from 'react';
import { Gavel, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

const TermsOfServiceContainer = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-[#0F172A] p-12 text-white text-center relative overflow-hidden">
             <div className="absolute bottom-0 left-0 p-8 opacity-10">
               <Gavel className="w-40 h-40" />
             </div>
             <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Terms of Service</h1>
             <p className="text-white/70 font-medium uppercase tracking-[0.2em] text-xs">Last Updated: May 12, 2024</p>
          </div>
          
          <div className="p-8 md:p-16 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3B82F6]/10 p-2 rounded-lg text-[#3B82F6]">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">Agreement to Terms</h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">
                By accessing the Education Connect Public School Digital Library Portal, you agree to abide by these Terms of Service. These terms govern the use of all digital materials, including PDFs, interactive content, and portal features.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3B82F6]/10 p-2 rounded-lg text-[#3B82F6]">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">Acceptable Use</h2>
              </div>
              <ul className="space-y-4 text-slate-600 font-medium">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <span>Students may only use their own assigned credentials to log in.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <span>Digital materials are for personal academic use only and may not be redistributed.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <span>Students must report any unauthorized access or security breaches immediately.</span>
                </li>
              </ul>
            </section>

            <section className="bg-orange-50 border-2 border-orange-100 rounded-[2rem] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3B82F6] p-2 rounded-lg text-white">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-[#3B82F6] uppercase tracking-tight">Prohibited Activities</h2>
              </div>
              <p className="text-slate-700 leading-relaxed font-bold mb-6">
                The following actions are strictly prohibited and may lead to suspension of library access:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 font-medium text-sm">
                <li>• Downloading restricted PDFs without admin approval.</li>
                <li>• Sharing portal passwords with other students or third parties.</li>
                <li>• Attempting to scrape or bulk-download the library catalog.</li>
                <li>• Using the portal for non-academic purposes.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tight mb-4">Termination of Access</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Education Connect Public School reserves the right to terminate or suspend access to the portal at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users of the portal.
              </p>
            </section>

            <div className="pt-12 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                Violation of these terms is subject to the school's disciplinary committee. <br/> 
                <span className="text-slate-300">Education Connect Public School Digital Board</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceContainer;
