import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

const Skills = ({ glassStyle, textSub }) => {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 bg-blue-500/[0.01]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Tech Stack</h2>
          <p className={`${textSub} text-sm md:text-base`}>Teknologi yang saya kuasai dan gunakan setiap hari.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className={`p-6 md:p-8 rounded-3xl border ${glassStyle} hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all`}
            >
              <h4 className="text-[10px] font-black mb-6 uppercase tracking-[0.3em] text-blue-500 text-center">{cat.title}</h4>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2 md:gap-x-4">
                {cat.skills.map((s, sIdx) => (
                  <div key={sIdx} className="flex flex-col items-center group">
                    <div className="w-8 h-8 md:w-10 md:h-10 mb-2 p-1 md:p-1.5 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1">
                      <img src={s.icon} alt={s.name} title={s.name} className="w-full h-full object-contain drop-shadow-sm" />
                    </div>
                    <span className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-tighter text-center transition-colors group-hover:text-blue-500">{s.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;