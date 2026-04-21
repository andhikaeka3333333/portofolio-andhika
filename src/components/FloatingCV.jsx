import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCV = ({ isDarkMode }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const cvLink = "https://drive.google.com/file/d/1XNcLL-4XVrwOMqx0HIuo1RdWOF_ECdid/view?usp=sharing";

  // Efek untuk memicu "highlight" otomatis setiap 8 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHighlighted(true);
      
      // Biarkan terbuka selama 2 detik, lalu tutup lagi
      setTimeout(() => {
        setIsHighlighted(false);
      }, 2500);
      
    }, 8000); // Muncul setiap 8 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-[100]"
    >
      {/* Efek Glow/Napas di belakang tombol */}
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
        {/* Kontainer Teks: Muncul kalau di-hover ATAU saat isHighlighted true */}
        <div className={`
          overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out
          ${isHighlighted ? 'max-w-[100px] mr-3' : 'max-w-0 group-hover:max-w-[100px] group-hover:mr-3'}
        `}>
          <span className="text-xs md:text-sm font-bold tracking-wide">
            Unduh CV
          </span>
        </div>
        
        {/* Icon */}
        <div className="relative shrink-0">
          <FileText 
            size={22} 
            className={`transition-transform duration-500 ${(isHighlighted) ? 'rotate-12 scale-110' : 'group-hover:rotate-12'}`} 
          />
          {/* Dot Notifikasi */}
          <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white/10" />
          <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
        </div>
      </a>
    </motion.div>
  );
};

export default FloatingCV;