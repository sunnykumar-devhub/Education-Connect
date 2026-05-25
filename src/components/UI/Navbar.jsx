import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X, ChevronDown, Home, Book, GraduationCap, Laptop, ArrowRight, UserCircle, Search, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Resources', path: '/resources', icon: Laptop },
    { 
      name: 'Grades', 
      icon: GraduationCap,
      items: ['Class 1-5', 'Class 6-8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'] 
    },
    { 
      name: 'Subjects', 
      icon: Book,
      items: ['Mathematics', 'Science', 'English', 'History', 'Geography'] 
    }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-slate-200 py-4 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <Logo variant="dark" className="scale-90 sm:scale-100 origin-left" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-4 py-2">
                {link.path ? (
                  <Link 
                    to={link.path} 
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      location.pathname === link.path ? 'text-[#3B82F6]' : 'text-slate-700 hover:text-[#3B82F6]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#3B82F6] cursor-pointer group transition-colors duration-300">
                    {link.name}
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#3B82F6] group-hover:rotate-180 transition-all" />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-[100%] left-0 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl py-3 overflow-hidden">
                        {link.items.map((item) => (
                          <Link
                            key={item}
                            to={`/category/${link.name.toLowerCase() === 'grades' ? 'grade' : 'subject'}/${item.toLowerCase().replace(/ /g, '-')}`}
                            className="block px-6 py-2.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-[#3B82F6] font-bold uppercase tracking-wider transition-all"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="pl-6">
              <Link 
                to="/portal" 
                className="group relative flex items-center gap-2 bg-[#3B82F6] text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                <UserCircle className="w-4 h-4" />
                <span>Student Portal</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(true)} 
              className="text-white p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-[360px] bg-[#0f172a] shadow-2xl border-l border-white/10 flex flex-col"
            >
              <div className="flex justify-between items-center p-8 border-b border-white/5">
                <Logo variant="light" className="scale-90 origin-left" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                {navLinks.map((link) => (
                  <div key={link.name} className="space-y-6">
                    <p className="text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.4em] flex items-center gap-3">
                      <link.icon size={16} /> {link.name}
                    </p>
                    
                    <div className="flex flex-col gap-3">
                      {link.path ? (
                        <Link 
                          to={link.path}
                          className="group flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl font-bold text-white hover:border-[#3B82F6]/50 transition-all"
                        >
                          {link.name}
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#3B82F6] transition-all" />
                        </Link>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {link.items.map((item) => (
                            <Link
                              key={item}
                              to={`/category/${link.name.toLowerCase() === 'grades' ? 'grade' : 'subject'}/${item.toLowerCase().replace(/ /g, '-')}`}
                              className="p-4 text-xs font-bold text-slate-400 bg-white/5 border border-white/5 rounded-xl hover:text-white hover:border-[#3B82F6]/30 transition-all"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.02]">
                <Link 
                  to="/portal"
                  className="w-full flex items-center justify-center gap-3 bg-[#3B82F6] text-white p-5 rounded-2xl font-bold text-sm tracking-widest hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
                >
                  <UserCircle size={20} />
                  <span>Student Portal</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;