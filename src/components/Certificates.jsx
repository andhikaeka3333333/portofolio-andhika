import React, { useState } from 'react';
import { ExternalLink, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/portfolioData';

const Certificates = ({ isDarkMode, glassStyle, textSub }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 md:mb-12 text-center tracking-tight">Sertifikasi Resmi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              onClick={() => setSelectedCert(cert)}
              className={`cursor-pointer rounded-2xl overflow-hidden border ${glassStyle} hover:shadow-lg hover:border-blue-500/30 transition-all group block`}
            >
              <div className="h-36 md:h-40 overflow-hidden relative">
                <img src={cert.image} alt={cert.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={14} />
                </div>
              </div>
              <div className="p-5 flex items-start gap-4">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold mb-1 group-hover:text-blue-500 transition-colors tracking-tight line-clamp-1">{cert.name}</h3>
                  <p className={`${textSub} text-[9px] md:text-[10px] font-medium tracking-wide`}>{cert.issuer} • {cert.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL POP UP */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-3xl overflow-hidden rounded-2xl border ${glassStyle} shadow-2xl flex flex-col ${isDarkMode ? 'bg-[#030712]' : 'bg-white'}`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>
              <div className={`relative w-full p-4 flex justify-center items-center h-[40vh] sm:h-[50vh] ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                />
              </div>
              <div className={`p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${isDarkMode ? 'bg-[#030712]' : 'bg-white'}`}>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">
                    {selectedCert.name}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-500 font-medium text-sm md:text-base">
                    <Award size={18} />
                    <span>{selectedCert.issuer}</span>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-gray-500 dark:text-gray-400">{selectedCert.year}</span>
                  </div>
                </div>
                {selectedCert.link && (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 shrink-0"
                  >
                    <span>Lihat Bukti</span>
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;