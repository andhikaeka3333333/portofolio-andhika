import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { timelineData } from '../data/portfolioData';

// Sub-komponen Khusus untuk Slider Gambar per Kartu
const CompanyImageSlider = ({ images, isDarkMode, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Fungsi baru untuk pindah ke gambar spesifik saat titik dipencet
  const goToSlide = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden group mb-5 bg-gray-100 dark:bg-gray-800 touch-pan-y">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Dokumentasi ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          onClick={() => onImageClick(images[currentIndex])}

          drag={images.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              nextImage();
            } else if (swipe > swipeConfidenceThreshold) {
              prevImage();
            }
          }}

          className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 md:group-hover:scale-105 ${images.length > 1 ? 'cursor-grab active:cursor-grabbing md:cursor-zoom-in' : 'cursor-zoom-in'
            }`}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* Gradient overlay - selalu muncul di HP (opacity-100), tapi pakai hover di PC (md:opacity-0 md:group-hover:opacity-100) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Panah Kiri */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110 z-10"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Panah Kanan */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110 z-10"
          >
            <ChevronRight size={18} />
          </button>

          {/* Indikator titik (Dots) - Sekarang bisa dipencet (button) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => goToSlide(e, idx)}
                className={`transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-4 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                  }`}
                aria-label={`Lihat gambar ke-${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Experience = ({ isDarkMode, glassStyle, textSub }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="experience" className="py-16 md:py-24 px-6 relative">
      <div className="container mx-auto max-w-5xl">

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Jejak <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Karir</span>
          </h2>
          <p className={`${textSub} text-sm md:text-base max-w-xl mx-auto`}>
            Dokumentasi perjalanan profesional di korporasi dan pendidikan yang saya tempuh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-5 md:p-6 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isDarkMode
                  ? 'bg-[#030712]/80 border-white/10 hover:border-blue-500/30 hover:shadow-blue-900/20'
                  : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-blue-500/10'
                } ${glassStyle}`}
            >
              <CompanyImageSlider
                images={item.images}
                isDarkMode={isDarkMode}
                onImageClick={setSelectedImage}
              />

              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold tracking-tight">{item.company}</h3>
                  <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-blue-50 border-blue-100 text-blue-600'
                    }`}>
                    {item.period}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-blue-500 mb-4">{item.role}</h4>
                <p className={`${textSub} text-sm leading-relaxed`}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md z-50"
            >
              <X size={24} />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Detail Proyek"
              className="max-w-full max-h-full rounded-2xl shadow-2xl cursor-default object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;