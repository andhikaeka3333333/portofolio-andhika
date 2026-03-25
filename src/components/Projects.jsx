import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';

const Projects = ({ glassStyle, textSub }) => {
  return (
    <section id="projects" className="py-16 md:py-24 px-6 bg-blue-500/[0.01]">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 md:mb-12 text-center tracking-tight">Proyek Pilihan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {projects.map((proj, i) => (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} href={proj.link} target="_blank" rel="noopener noreferrer"
              className={`rounded-2xl overflow-hidden border ${glassStyle} group transition-all block relative hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]`}
            >
              <div className="h-40 md:h-48 overflow-hidden relative">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <ExternalLink size={24} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.tech.map(t => <span key={t} className="text-[9px] font-bold uppercase px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded">{t}</span>)}
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight group-hover:text-blue-500 transition-colors">{proj.title}</h3>
                <p className={`${textSub} text-xs leading-relaxed line-clamp-3`}>{proj.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;