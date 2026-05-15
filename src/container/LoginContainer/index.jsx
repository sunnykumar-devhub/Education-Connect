import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import Logo from '../../components/UI/Logo';

const LoginContainer = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("token", "ec_auth_token_v2");
      navigate('/portal');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0f172a]/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3B82F6]/10 blur-[100px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative z-10"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-10">
            <Logo />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">Student Login</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Enter your credentials to access your portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                <User className="w-3 h-3 text-[#0F172A]" />
                Student ID / Admission No.
              </label>
              <input 
                required
                type="text"
                placeholder="EC-2024-XXXX"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0F172A] focus:bg-white transition-all text-slate-900 font-bold"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                <Lock className="w-3 h-3 text-[#0F172A]" />
                Password
              </label>
              <div className="relative">
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#0F172A] focus:bg-white transition-all text-slate-900 font-bold"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F172A] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group relative overflow-hidden uppercase text-sm tracking-widest"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate Access
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Education Connect <br/> 
            <span className="text-slate-300">Security Portal v2.0</span>
          </p>
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          New Student? <a href="#" className="text-[#0F172A] hover:underline">Contact Admissions</a>
        </p>
      </div>
    </div>
  );
};

export default LoginContainer;
