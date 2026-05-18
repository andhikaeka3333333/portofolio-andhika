import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CommentSection from './CommentSection';

const Articles = ({ glassStyle, textSub, isDarkMode, setHideNavbar }) => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data artikel dari Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  // 2. Logic untuk Menyembunyikan/Memunculkan Navbar
  useEffect(() => {
    if (setHideNavbar) {
      if (selectedArticle) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
    }
    return () => {
      if (setHideNavbar) setHideNavbar(false);
    };
  }, [selectedArticle, setHideNavbar]);

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setCurrentImgIndex(0);
  };

  return (
    <section id="articles" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tight">
            Tulisan & <span className="text-blue-500">Insight.</span>
          </h2>
          <p className={`${textSub} max-w-xl mx-auto text-sm md:text-base`}>
            Catatan teknis serta pembaruan seputar saya dan juga dunia software development.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => {
              const coverImage = article.image_url ? article.image_url.split(',')[0].trim() : '';

              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedArticle(article)}
                  className={`group cursor-pointer rounded-[24px] border ${glassStyle} overflow-hidden hover:border-blue-500/50 transition-all duration-500`}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={coverImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  </div>
                  <div className="p-6">
                    <span className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">
                      <Calendar size={12}/> {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className={`${textSub} text-sm line-clamp-2 mb-6`}>
                      {article.content}
                    </p>
                    <div className="pt-4 border-t border-white/5 flex items-center text-blue-500 text-xs font-bold gap-2 group-hover:gap-4 transition-all">
                      BACA SELENGKAPNYA <ArrowRight size={14}/>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL DETAIL ARTIKEL */}
      <AnimatePresence>
        {selectedArticle && (() => {
          const images = selectedArticle.image_url ? selectedArticle.image_url.split(',') : [];

          const nextImage = (e) => {
            e.stopPropagation();
            setCurrentImgIndex((prev) => (prev + 1) % images.length);
          };

          const prevImage = (e) => {
            e.stopPropagation();
            setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
          };

          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className={`relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[32px] border border-white/10 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-2xl custom-scrollbar`}
              >
                <button onClick={handleCloseModal} className="absolute top-6 right-6 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-red-500 transition-colors">
                  <X size={20}/>
                </button>
                
                {/* === AREA SLIDER GAMBAR DENGAN ANIMASI === */}
                <div className="w-full h-64 md:h-96 bg-black/30 flex items-center justify-center overflow-hidden relative group/slider">
                  {images.length > 0 ? (
                    <>
                      {/* AnimatePresence internal untuk transisi antar gambar */}
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={currentImgIndex} // Sangat penting untuk memicu re-render animasi
                          src={images[currentImgIndex].trim()} 
                          alt={`${selectedArticle.title} - ${currentImgIndex + 1}`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-full h-full object-contain absolute" 
                        />
                      </AnimatePresence>

                      {/* Navigasi Tombol Slider */}
                      {images.length > 1 && (
                        <>
                          <button 
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-blue-500 transition-colors backdrop-blur-sm z-10"
                          >
                            <ArrowRight className="rotate-180" size={18} />
                          </button>

                          <button 
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-blue-500 transition-colors backdrop-blur-sm z-10"
                          >
                            <ArrowRight size={18} />
                          </button>

                          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm tracking-wider z-10">
                            {currentImgIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-500 text-sm">Tidak ada gambar</div>
                  )}
                </div>

                {/* AREA TEKS ISI ARTIKEL */}
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 ">{selectedArticle.title}</h2>
                  <p className={`${textSub} text-base md:text-lg leading-relaxed mb-12 whitespace-pre-wrap`}>
                    {selectedArticle.content}
                  </p>
                  
                  <CommentSection articleId={selectedArticle.id} textSub={textSub} />
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

export default Articles;

// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar, ArrowRight, X, Loader2 } from 'lucide-react';
// import { supabase } from '../lib/supabase';
// import CommentSection from './CommentSection';

// // Tambahkan destructuring setHideNavbar di props komponen
// const Articles = ({ glassStyle, textSub, isDarkMode, setHideNavbar }) => {
//   const [articles, setArticles] = useState([]);
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 1. Fetch data artikel dari Supabase
//   useEffect(() => {
//     const fetchArticles = async () => {
//       const { data, error } = await supabase
//         .from('articles')
//         .select('*')
//         .order('created_at', { ascending: false });

//       if (!error) setArticles(data);
//       setLoading(false);
//     };
//     fetchArticles();
//   }, []);

//   // 2. Logic Efek untuk Menyembunyikan/Memunculkan Navbar saat modal dibuka-tutup
//   useEffect(() => {
//     if (setHideNavbar) {
//       if (selectedArticle) {
//         setHideNavbar(true); // Sembunyikan navbar saat modal terbuka
//       } else {
//         setHideNavbar(false); // Munculkan kembali navbar saat modal ditutup
//       }
//     }

//     // Cleanup function untuk mengantisipasi jika komponen di-unmount tiba-tiba
//     return () => {
//       if (setHideNavbar) setHideNavbar(false);
//     };
//   }, [selectedArticle, setHideNavbar]);

//   return (
//     <section id="articles" className="py-24 px-6 relative">
//       <div className="container mx-auto max-w-6xl">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tight">
//             Tulisan & <span className="text-blue-500">Insight.</span>
//           </h2>
//           <p className={`${textSub} max-w-xl mx-auto text-sm md:text-base`}>
//             Catatan teknis serta pembaruan seputar saya dan juga dunia software development.
//           </p>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="animate-spin text-blue-500" size={40} />
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {articles.map((article, index) => (
//               <motion.div
//                 key={article.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 onClick={() => setSelectedArticle(article)}
//                 className={`group cursor-pointer rounded-[24px] border ${glassStyle} overflow-hidden hover:border-blue-500/50 transition-all duration-500`}
//               >
//                 <div className="aspect-video overflow-hidden relative">
//                   <img src={article.image_url} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
//                 </div>
//                 <div className="p-6">
//                   <span className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">
//                     <Calendar size={12} /> {new Date(article.created_at).toLocaleDateString()}
//                   </span>
//                   <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">{article.title}</h3>
//                   <p className={`${textSub} text-sm line-clamp-2 mb-6`}>{article.content}</p>
//                   <div className="pt-4 border-t border-white/5 flex items-center text-blue-500 text-xs font-bold gap-2 group-hover:gap-4 transition-all">
//                     BACA SELENGKAPNYA <ArrowRight size={14} />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* MODAL DETAIL ARTIKEL */}
//       <AnimatePresence>
//         {selectedArticle && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArticle(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
//               className={`relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-[32px] border border-white/10 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-2xl custom-scrollbar`}
//             >
//               <button onClick={() => setSelectedArticle(null)} className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-red-500 transition-colors"><X size={20} /></button>
//               {/* GANTI LINE GAMBAR DI DALAM MODAL DENGAN INI */}
//               <div className="w-full h-64 md:h-96 bg-black/40 flex items-center justify-center overflow-hidden rounded-t-[32px]">
//                 <img
//                   src={selectedArticle.image_url}
//                   alt={selectedArticle.title}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <div className="p-8 md:p-12">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-6 ">{selectedArticle.title}</h2>
//                 <p className={`${textSub} text-base md:text-lg leading-relaxed mb-12 whitespace-pre-wrap`}>{selectedArticle.content}</p>

//                 {/* KOMENTAR */}
//                 <CommentSection articleId={selectedArticle.id} textSub={textSub} />
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default Articles;