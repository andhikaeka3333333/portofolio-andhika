import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isDarkMode, textSub }) => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_40%,#000_60%,transparent_100%)]`} />

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`plus-${i}`}
            className={`absolute text-sm md:text-lg font-light ${isDarkMode ? 'text-blue-400/20' : 'text-blue-600/20'}`}
            style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 90}%` }}
            animate={{ y: [0, Math.random() * 40 - 20, 0], rotate: [0, 90, 180], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
          >
            +
          </motion.div>
        ))}

        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: "100vw", opacity: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          className="absolute top-[20%] md:top-[25%] left-0 w-[100px] md:w-[300px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        />
        <motion.div
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute left-[10%] md:left-[15%] bottom-0 w-[1px] h-[100px] md:h-[300px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-4xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border mb-6 md:mb-8 ${isDarkMode ? 'bg-white/5 border-white/10 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'} text-[9px] md:text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm`}>
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse" /> Fullstack Developer
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-[1.15]">
          Mewujudkan Ide Lewat <br className="hidden sm:block" />
          <span className="text-blue-500 italic relative inline-block mt-2 md:mt-0">
            Kode & Sistem.
            <motion.span
              initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-0 md:bottom-1 left-0 h-1 md:h-2 bg-blue-500/30 rounded-full"
            />
          </span>
        </h1>

        <p className={`${textSub} text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12 px-2`}>
          Seorang Software Developer yang berfokus pada pengembangan aplikasi web dan mobile dengan standar industri yang relevan.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
          <a href="#projects" className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-lg shadow-blue-600/20 text-center">
            Lihat Proyek
          </a>
          <a href="#contact" className={`w-full sm:w-auto px-8 py-3.5 md:py-4 border rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-[1.02] text-center ${isDarkMode ? 'border-white/10 hover:bg-white/5 backdrop-blur-sm' : 'border-blue-200 hover:bg-blue-50 backdrop-blur-sm'}`}>
            Hubungi Saya
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-10 hidden sm:flex">
        <div className={`w-[24px] h-[38px] md:w-[26px] md:h-[42px] border-2 rounded-full flex justify-center p-1.5 ${isDarkMode ? 'border-white/30' : 'border-blue-200'}`}>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;