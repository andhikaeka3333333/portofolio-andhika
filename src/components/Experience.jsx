import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../data/portfolioData';

const Experience = ({ isDarkMode, glassStyle, textSub }) => {
  return (
    <section id="experience" className="py-16 md:py-24 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Timeline Karir</h2>
          <p className={`${textSub} text-sm md:text-base`}>Perjalanan profesional saya sejauh ini.</p>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/20 transform -translate-x-1/2 rounded-full" />

          {timelineData.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative w-full mb-10 md:mb-16"
              >
                <div className={`absolute left-[21px] md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-colors duration-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] ${isDarkMode ? 'border-[#030712]' : 'border-[#f8fafc]'}`} />
                <div className={`flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className={`p-5 md:p-6 rounded-2xl border ${glassStyle} hover:border-blue-500/40 hover:shadow-[0_5px_20px_rgba(59,130,246,0.1)] transition-all duration-300 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      <p className="text-[9px] md:text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">{item.period}</p>
                      <h3 className="text-base md:text-lg font-bold mb-1 tracking-tight">{item.company}</h3>
                      <p className="text-xs font-semibold text-purple-500 mb-3">{item.role}</p>
                      <p className={`${textSub} text-xs leading-relaxed`}>{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;