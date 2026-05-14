import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, icon: Icon }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-academic-600 p-6 text-white relative">
              <button onClick={onClose} className="absolute top-4 right-4 hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                {Icon && (
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Icon size={24} />
                  </div>
                )}
                <h3 className="text-xl font-bold">{title}</h3>
              </div>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
