import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`relative z-10 py-10 md:py-12 border-t text-center ${isDarkMode ? 'border-white/5 text-gray-500' : 'border-blue-50 text-gray-400'}`}>
      <p className="font-bold tracking-[0.3em] uppercase text-[9px] mb-4">Dhika • Kudus, Indonesia</p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 px-4">
        {['About', 'Experience', 'Projects', 'Contact'].map(f => (
          <a key={f} href={`#${f.toLowerCase()}`} className="text-[9px] font-bold uppercase tracking-widest hover:text-blue-500 transition-colors">{f}</a>
        ))}
      </div>
      <p className="text-[8px] md:text-[9px] px-6">© 2024 Andhika Eka Santosa. Crafted with React, Tailwind & Passion.</p>
    </footer>
  );
};

export default Footer;