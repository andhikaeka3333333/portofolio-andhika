import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Tambahkan props isAIOpen di sini
const FloatingCV = ({ isDarkMode, isAIOpen }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const cvLink = "https://drive.google.com/file/d/1XNcLL-4XVrwOMqx0HIuo1RdWOF_ECdid/view?usp=sharing";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHighlighted(true);
      setTimeout(() => {
        setIsHighlighted(false);
      }, 2500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      // Tambahkan logika animasi: kalau isAIOpen true, opacity jadi 0
      animate={{ 
        opacity: isAIOpen ? 0 : 1, 
        scale: isAIOpen ? 0.5 : 1, 
        y: isAIOpen ? 50 : 0 
      }}
      transition={{ duration: 0.4 }}
      // Pointer events none supaya tombol gak bisa diklik pas lagi transparan
      className={`fixed bottom-6 right-6 z-[100] ${isAIOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      {/* Efek Glow */}
      <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-1000 ${isHighlighted ? 'bg-blue-500/40 opacity-100' : 'opacity-0'}`} />

      <a
        href={cvLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          relative group flex items-center justify-center p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-700 ease-in-out
          ${isDarkMode 
            ? 'bg-[#030712]/60 border-white/10 text-blue-400 hover:bg-blue-600/20' 
            : 'bg-white/90 border-blue-100 text-blue-600 hover:bg-blue-50'}
          ${isHighlighted ? 'border-blue-500/50 scale-110' : ''}
        `}
      >
        <div className={`
          overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out
          ${isHighlighted ? 'max-w-[100px] mr-3' : 'max-w-0 group-hover:max-w-[100px] group-hover:mr-3'}
        `}>
          <span className="text-xs md:text-sm font-bold tracking-wide">
            Unduh CV
          </span>
        </div>
        
        <div className="relative shrink-0">
          <FileText 
            size={22} 
            className={`transition-transform duration-500 ${(isHighlighted) ? 'rotate-12 scale-110' : 'group-hover:rotate-12'}`} 
          />
          <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white/10" />
          <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
        </div>
      </a>
    </motion.div>
  );
};

export default FloatingCV;