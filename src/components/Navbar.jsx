import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isScrolled, isDarkMode, toggleTheme, mobileMenuOpen, setMobileMenuOpen, navBg, textSub }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? `backdrop-blur-lg border-b py-3 md:py-4 ${isDarkMode ? 'bg-[#030712]/80 border-white/5' : 'bg-white/80 border-blue-50'}` : 'bg-transparent py-5 md:py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-2xl font-bold tracking-tight z-50">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Andhika Eka.</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Experience', 'Projects', 'Certificates', 'Articles'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-blue-500 ${textSub}`}>
              {item}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-white border-blue-100 text-blue-600 shadow-sm hover:bg-blue-50'}`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Menu Icons */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button onClick={toggleTheme} className={`p-2 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-white border-blue-100 text-blue-600'}`}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-blue-100 text-gray-900'}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-[100%] left-0 w-full p-4 md:hidden`}
          >
            <div className={`rounded-2xl border p-4 flex flex-col gap-2 shadow-2xl backdrop-blur-xl ${navBg}`}>
              {['About', 'Experience', 'Projects', 'Certificates', 'Articles'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-bold uppercase tracking-widest p-4 rounded-xl transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'}`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;