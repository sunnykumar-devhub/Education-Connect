import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Book, Lock, Smartphone, Search } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#3B82F6]' : 'text-[#0F172A] group-hover:text-[#3B82F6]'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-lg transition-all ${isOpen ? 'bg-[#3B82F6] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-[#0F172A]/10'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-500 leading-relaxed font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQContainer = () => {
  const faqs = [
    {
      category: 'Access & Login',
      icon: Lock,
      items: [
        { q: 'How do I get my Student ID?', a: 'Your Student ID is provided by the school administration at the time of admission. If you have lost it, please contact the IT department.' },
        { q: 'Can I access the library from home?', a: 'Yes! The Education Connect Digital Library is accessible 24/7 from any device with an internet connection using your student credentials.' },
        { q: 'Why can I only read the first 4 pages?', a: 'The 4-page preview is available for all visitors. To access the full textbook, you must log in to your Student Portal and request the full version.' }
      ]
    },
    {
      category: 'Reading Experience',
      icon: Book,
      items: [
        { q: 'Can I download the PDFs for offline use?', a: 'Yes, once your request for full access is approved by the admin, a download button will appear in your reader interface.' },
        { q: 'Is there a limit to how many books I can read?', a: 'No, students have unlimited access to all materials relevant to their grade and subject once they are logged in.' },
        { q: 'Are the books updated regularly?', a: 'Absolutely. We update our digital vault every semester to match the latest academic curriculum.' }
      ]
    },
    {
      category: 'Mobile & Technical',
      icon: Smartphone,
      items: [
        { q: 'Does the library work on smartphones?', a: 'Yes, the portal is fully responsive. You can read your textbooks comfortably on any Android or iOS device.' },
        { q: 'The PDF viewer is not loading, what should I do?', a: 'Please clear your browser cache or try a different browser (Chrome or Firefox is recommended). If the issue persists, contact Support.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-[#0F172A] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#0F172A]/20">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] uppercase tracking-tight mb-4">Frequently Asked <span className="text-[#3B82F6]">Questions</span></h1>
          <p className="text-slate-500 font-medium">Everything you need to know about the Education Connect Digital Library experience.</p>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for a question..." 
            className="w-full bg-white border-2 border-slate-100 rounded-[2rem] px-16 py-5 outline-none focus:border-[#0F172A] shadow-xl text-slate-900 font-bold"
          />
        </div>

        <div className="space-y-12">
          {faqs.map((group, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-[#0F172A] p-8 text-white flex items-center gap-4">
                <group.icon className="w-6 h-6" />
                <h2 className="text-xl font-black uppercase tracking-tight">{group.category}</h2>
              </div>
              <div className="px-8 pb-4">
                {group.items.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-[#3B82F6] rounded-[2.5rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-black uppercase mb-4 relative z-10">Still have questions?</h3>
          <p className="text-white/80 font-medium mb-8 relative z-10">If you can't find the answer you're looking for, please contact our support team.</p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button className="bg-white text-[#3B82F6] px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all">Chat with Admin</button>
            <button className="bg-[#0F172A] text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all">Email Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQContainer;
