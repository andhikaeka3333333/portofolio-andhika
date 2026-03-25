import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';

const Projects = ({ glassStyle, textSub }) => {
  // State untuk menyimpan proyek yang sedang dipilih/diklik
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 bg-blue-500/[0.01]">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 md:mb-12 text-center tracking-tight">Proyek Pilihan</h2>
        
        {/* Grid Kartu Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {projects.map((proj, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              // Mengubah tag <a> menjadi <div> dan menambahkan event onClick
              onClick={() => setSelectedProject(proj)}
              className={`rounded-2xl overflow-hidden border ${glassStyle} group transition-all block relative cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]`}
            >
              <div className="h-40 md:h-48 overflow-hidden relative">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  {/* Teks hint untuk klik */}
                  <span className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Lihat Detail
                  </span>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.tech.map(t => <span key={t} className="text-[9px] font-bold uppercase px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded">{t}</span>)}
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight group-hover:text-blue-500 transition-colors">{proj.title}</h3>
                <p className={`${textSub} text-xs leading-relaxed line-clamp-3`}>{proj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Pop-up Detail Proyek */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Backdrop blur untuk latar belakang modal
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)} // Tutup modal jika area luar diklik
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika area dalam modal diklik
              className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border ${glassStyle} bg-white dark:bg-slate-900 shadow-2xl flex flex-col`}
            >
              {/* Tombol Close */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              {/* Gambar Hero Modal - DIPERBAIKI */}
              <div className="w-full h-48 md:h-72 shrink-0 bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Konten Modal */}
              <div className="p-6 md:p-8 flex flex-col gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="text-xs font-bold uppercase px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Deskripsi full tanpa line-clamp */}
                <p className={`${textSub} text-sm md:text-base leading-relaxed`}>
                  {selectedProject.desc}
                </p>

                {/* Tombol External Link */}
                <div className="mt-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center"
                  >
                    <span>Kunjungi Proyek</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;