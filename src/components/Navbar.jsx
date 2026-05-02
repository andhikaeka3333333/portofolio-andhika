import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navbar Component
 * @param {boolean} isAIOpen - Status apakah modal AskAI atau MatchScore sedang terbuka
 * @param {boolean} isScrolled - Status scroll window untuk perubahan styling
 * @param {boolean} isDarkMode - Status tema aplikasi
 * @param {function} toggleTheme - Fungsi untuk mengganti tema
 * @param {boolean} mobileMenuOpen - Status menu mobile
 * @param {function} setMobileMenuOpen - Fungsi pengontrol menu mobile
 * @param {string} textSub - Class tailwind untuk warna teks subtitle/secondary
 */
const Navbar = ({ isAIOpen, isScrolled, isDarkMode, toggleTheme, mobileMenuOpen, setMobileMenuOpen, textSub }) => {
  const [activeSection, setActiveSection] = useState('');
  const navItems = ['About', 'Experience', 'Projects', 'Certificates', 'Articles'];

  // Deteksi section aktif saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let current = '';
      for (const item of navItems) {
        const sectionId = item.toLowerCase();
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /**
     * LOGIKA VISIBILITAS:
     * Jika isAIOpen true (AskAI atau MatchScore terbuka), Navbar akan:
     * 1. opacity-0 & invisible: Menghilang secara visual dan fungsional.
     * 2. pointer-events-none: Menghindari interaksi klik yang tidak sengaja.
     */
    <nav className={`fixed top-0 w-full z-40 flex justify-center px-4 md:px-6 pt-4 md:pt-5 transition-all duration-500 
      ${isAIOpen ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible pointer-events-auto'}`}
    >
      <div className={`w-full max-w-6xl transition-all duration-500 flex justify-between items-center rounded-full border 
        ${isScrolled 
          ? `py-3 px-6 md:px-8 shadow-xl backdrop-blur-md ${
              isDarkMode 
                ? 'bg-[#030712]/95 border-white/10 shadow-black/50' 
                : 'bg-white border-gray-200 shadow-blue-900/5' 
            }` 
          : 'py-4 px-6 md:px-8 bg-transparent border-transparent shadow-none'
      }`}>
        
        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-2xl font-bold tracking-tight z-50">
          <a href="#home">
            <img 
              src={isDarkMode ? "images/logo-andhika.png" : "images/logo-andhika-dark.png"} 
              alt="Andhika Eka" 
              className="h-10 md:h-12 w-auto object-contain" 
            />
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`group relative text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:text-blue-500 ${isActive ? 'text-blue-500' : textSub}`}
              >
                {item}
                <span className={`absolute -bottom-1.5 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out rounded-full ${
                  isActive ? 'w-full left-0' : 'w-0 left-1/2 group-hover:w-full group-hover:left-0'
                }`} />
              </a>
            );
          })}
          
          {/* Theme Toggle Desktop */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10 hover:rotate-12' 
                : 'bg-white border-gray-200 text-blue-600 shadow-sm hover:bg-gray-50 hover:-rotate-12'
            }`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3 z-50">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full border transition-all duration-300 ${
              isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-white border-gray-200 text-blue-600'
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full border transition-all duration-300 ${
              isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[100%] left-0 w-full px-4 md:hidden mt-2 pointer-events-auto"
          >
            <div className={`rounded-3xl border p-3 flex flex-col gap-1 shadow-2xl backdrop-blur-xl ${
              isDarkMode ? 'bg-[#030712]/95 border-white/10' : 'bg-white border-gray-100'
            }`}>
              {navItems.map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xs font-bold uppercase tracking-widest p-4 rounded-2xl transition-all flex items-center gap-2 ${
                      isActive 
                        ? (isDarkMode ? 'bg-white/10 text-blue-400' : 'bg-blue-50 text-blue-600') 
                        : (isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-blue-50/50 text-gray-600 hover:text-blue-600')
                    }`}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Menu, X, Sun, Moon } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Tambahkan props 'isAIOpen' untuk menerima status dari App.jsx
// const Navbar = ({ isAIOpen, isScrolled, isDarkMode, toggleTheme, mobileMenuOpen, setMobileMenuOpen, textSub }) => {
//   const [activeSection, setActiveSection] = useState('');
//   const navItems = ['About', 'Experience', 'Projects', 'Certificates', 'Articles'];

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + 150;
//       let current = '';
//       for (const item of navItems) {
//         const sectionId = item.toLowerCase();
//         const element = document.getElementById(sectionId);
//         if (element) {
//           const offsetTop = element.offsetTop;
//           const offsetHeight = element.offsetHeight;
//           if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
//             current = sectionId;
//           }
//         }
//       }
//       setActiveSection(current);
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     /**
//      * LOGIKA DISEMBUNYIKAN:
//      * Jika isAIOpen true, maka:
//      * 1. opacity-0: Navbar menghilang secara visual.
//      * 2. pointer-events-none: Navbar tidak bisa diklik meski masih ada di DOM.
//      * 3. z-index tetap rendah (z-40) agar tidak menabrak AskAI.
//      */
//     <nav className={`fixed top-0 w-full z-40 flex justify-center px-4 md:px-6 pt-4 md:pt-5 transition-all duration-500 pointer-events-none 
//       ${isAIOpen ? 'opacity-0' : 'opacity-100'}`}
//     >
      
//       <div className={`w-full max-w-6xl transition-all duration-500 flex justify-between items-center rounded-full border 
//         ${isAIOpen ? '' : 'pointer-events-auto'}
//         ${isScrolled 
//           ? `py-3 px-6 md:px-8 shadow-xl backdrop-blur-md ${
//               isDarkMode 
//                 ? 'bg-[#030712]/95 border-white/10 shadow-black/50' 
//                 : 'bg-white border-gray-200 shadow-blue-900/5' 
//             }` 
//           : 'py-4 px-6 md:px-8 bg-transparent border-transparent shadow-none'
//       }`}>
        
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-2xl font-bold tracking-tight z-50">
//           <a href="#home">
//             <img 
//               src={isDarkMode ? "images/logo-andhika.png" : "images/logo-andhika-dark.png"} 
//               alt="Andhika Eka" 
//               className="h-12 w-20 w-auto" 
//             />
//           </a>
//         </motion.div>

//         <div className="hidden md:flex items-center gap-8">
//           {navItems.map((item) => {
//             const isActive = activeSection === item.toLowerCase();
//             return (
//               <a 
//                 key={item} 
//                 href={`#${item.toLowerCase()}`} 
//                 className={`group relative text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:text-blue-500 ${isActive ? 'text-blue-500' : textSub}`}
//               >
//                 {item}
//                 <span className={`absolute -bottom-1.5 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out rounded-full ${
//                   isActive ? 'w-full left-0' : 'w-0 left-1/2 group-hover:w-full group-hover:left-0'
//                 }`} />
//               </a>
//             );
//           })}
//           <button
//             onClick={toggleTheme}
//             className={`p-2 rounded-full border transition-all duration-300 ${
//               isDarkMode 
//                 ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10 hover:rotate-12' 
//                 : 'bg-white border-gray-200 text-blue-600 shadow-sm hover:bg-gray-50 hover:-rotate-12'
//             }`}
//             aria-label="Toggle Theme"
//           >
//             {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
//           </button>
//         </div>

//         <div className="md:hidden flex items-center gap-3 z-50">
//           <button 
//             onClick={toggleTheme} 
//             className={`p-2 rounded-full border transition-all duration-300 ${
//               isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-white border-gray-200 text-blue-600'
//             }`}
//           >
//             {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
//           </button>
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className={`p-2 rounded-full border transition-all duration-300 ${
//               isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'
//             }`}
//           >
//             {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
//           </button>
//         </div>
//       </div>

//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-[100%] left-0 w-full px-4 md:hidden mt-2 pointer-events-auto"
//           >
//             <div className={`rounded-3xl border p-3 flex flex-col gap-1 shadow-2xl backdrop-blur-xl ${
//               isDarkMode ? 'bg-[#030712]/95 border-white/10' : 'bg-white border-gray-100'
//             }`}>
//               {navItems.map((item) => {
//                 const isActive = activeSection === item.toLowerCase();
//                 return (
//                   <a
//                     key={item}
//                     href={`#${item.toLowerCase()}`}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className={`text-xs font-bold uppercase tracking-widest p-4 rounded-2xl transition-all flex items-center gap-2 ${
//                       isActive 
//                         ? (isDarkMode ? 'bg-white/10 text-blue-400' : 'bg-blue-50 text-blue-600') 
//                         : (isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-blue-50/50 text-gray-600 hover:text-blue-600')
//                     }`}
//                   >
//                     {item}
//                   </a>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;