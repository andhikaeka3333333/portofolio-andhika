import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCV from './components/FloatingCV';
import AskAI from './components/AskAI';
import { Helmet } from "react-helmet";

<Helmet>
  <title>Andhika Eka Santosa - Software Developer</title>
  <meta
    name="description"
    content="Portfolio Andhika Eka Santosa, Software Developer dari Indonesia yang fokus pada Flutter, Laravel, dan Web Development."
  />
  <meta name="keywords" content="Andhika Eka Santosa, Software Developer, Flutter Developer, Laravel Developer" />

  {/* Open Graph (biar bagus kalau dishare) */}
  <meta property="og:title" content="Andhika Eka Santosa Portfolio" />
  <meta property="og:description" content="Portfolio developer Andhika Eka Santosa" />
  <meta property="og:type" content="website" />
</Helmet>

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAIOpen, setIsAIOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Styling Variables
  const glassStyle = isDarkMode
    ? "bg-white/5 border-white/10 backdrop-blur-md"
    : "bg-white/60 border-blue-100/50 backdrop-blur-md shadow-sm";

  const textSub = isDarkMode ? "text-gray-400" : "text-gray-600";
  const navBg = isDarkMode ? 'bg-[#030712]/90 border-white/10' : 'bg-white/90 border-blue-50';

  return (
    <div
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className={`min-h-screen transition-colors duration-500 selection:bg-blue-500/30 overflow-x-hidden ${isDarkMode ? 'bg-[#030712] text-white' : 'bg-[#f8fafc] text-gray-900'}`}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          html { scroll-behavior: smooth; }
        `}
      </style>

      {/* Global Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-5%] w-[60%] h-[40%] md:w-[40%] ${isDarkMode ? 'bg-blue-600/10' : 'bg-blue-400/10'} blur-[100px] md:blur-[120px] rounded-full`} />
        <div className={`absolute bottom-0 right-0 w-[50%] h-[30%] md:w-[30%] ${isDarkMode ? 'bg-indigo-600/10' : 'bg-indigo-400/10'} blur-[80px] md:blur-[100px] rounded-full`} />
      </div>

      <Navbar
        isAIOpen={isAIOpen}
        isScrolled={isScrolled}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navBg={navBg}
        textSub={textSub}
      />

      <main className="relative z-10">
        <Hero isDarkMode={isDarkMode} textSub={textSub} onOpenAI={() => setIsAIOpen(true)} />

        <About glassStyle={glassStyle} textSub={textSub} />
        <Experience isDarkMode={isDarkMode} glassStyle={glassStyle} textSub={textSub} />
        <Projects glassStyle={glassStyle} textSub={textSub} />
        <Certificates isDarkMode={isDarkMode} glassStyle={glassStyle} textSub={textSub} />
        <Skills glassStyle={glassStyle} textSub={textSub} />
        <Articles isDarkMode={isDarkMode} glassStyle={glassStyle} textSub={textSub} />
        <Contact glassStyle={glassStyle} textSub={textSub} />
        <AskAI
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          isDarkMode={isDarkMode}
          textSub={textSub}
        />
      </main>

      <Footer isDarkMode={isDarkMode} />
      <FloatingCV isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;