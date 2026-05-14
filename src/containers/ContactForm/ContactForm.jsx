import React from 'react';
import { User, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const ContactForm = ({ onSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Request Sent! Our academic advisors will reach out shortly.');
    if (onSuccess) onSuccess();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="text-slate-500 text-sm mb-4">You've reached the limit for free preview. Contact us to unlock the full library.</p>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" required className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-academic-500 focus:border-transparent outline-none text-slate-700" placeholder="John Doe" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Academic Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="email" required className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-academic-500 focus:border-transparent outline-none text-slate-700" placeholder="john@university.edu" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message (Optional)</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
          <textarea rows="3" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-academic-500 focus:border-transparent outline-none text-slate-700" placeholder="I'm interested in the full version..."></textarea>
        </div>
      </div>
      <Button type="submit" className="w-full py-4">
        Request Full Access <ArrowRight size={18} />
      </Button>
    </form>
  );
};

export default ContactForm;
