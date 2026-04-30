import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, Briefcase, Code, Coffee, X } from 'lucide-react';

// Import data portofolio kamu untuk dijadikan "Otak" AI
import { profile, projects, timelineData, skillCategories } from '../data/portfolioData';

const AskAI = ({ isOpen, onClose, isDarkMode, glassStyle, textSub }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Halo! Saya AI representasi dari Andhika Eka. Ingin tahu lebih dalam tentang pengalaman, skill, atau proyek saya? Pilih mode di bawah dan tanyakan apa saja!' }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('recruiter');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const modes = [
    { id: 'recruiter', label: 'Recruiter', icon: Briefcase },
    { id: 'developer', label: 'Developer', icon: Code },
    { id: 'casual', label: 'Casual', icon: Coffee }
  ];

  const quickPrompts = {
    recruiter: ["Ceritakan pengalaman di Polytron", "Apa pencapaian terbesarmu?", "Kenapa kami harus rekrut kamu?"],
    developer: ["Kenapa pakai Laravel untuk GoodLife?", "Gimana cara kerja AI di proyekmu?", "State management di Flutter?"],
    casual: ["Hobi kamu apa?", "Kenapa tertarik AI?", "Target di ITS nanti?"]
  };

  const getSystemPrompt = (currentMode) => {
    const portfolioContext = JSON.stringify({ profile, projects, timelineData, skillCategories });
    
    let personaPrompt = "";
    if (currentMode === 'recruiter') {
      personaPrompt = "Anda berbicara secara profesional, sopan, dan berorientasi pada hasil (result-oriented). Fokuskan jawaban pada dampak bisnis, kerja sama tim, pengalaman kerja di PT Starindo dan Polytron, serta efisiensi solusi yang dibuat.";
    } else if (currentMode === 'developer') {
      personaPrompt = "Anda berbicara seperti seorang Tech Lead atau Senior Developer. Gunakan istilah teknis (seperti arsitektur, state management, optimasi API). Fokus pada tech stack (Laravel, React, Flutter), alasan teknis pengambilan keputusan, dan bagaimana sistem dibangun.";
    } else {
      personaPrompt = "Anda berbicara dengan santai, ramah, dan asyik (seperti ngobrol dengan teman). Boleh pakai bahasa gaul Indonesia secukupnya. Fokus pada passion, hobi, visi masa depan, dan antusiasme masuk Teknik Informatika ITS.";
    }

    return `Kamu adalah AI representasi dari Andhika Eka Santosa, seorang Fullstack & Mobile Developer berumur ${profile.age} tahun. 
    Sumber pengetahuan absolutmu adalah data JSON berikut: ${portfolioContext}.
    Gaya bahasamu: ${personaPrompt}. 
    Aturan: Jawablah dengan sopan, relevan dengan pertanyaan, dan jangan pernah halusinasi (mengarang) informasi di luar data JSON yang diberikan. kamu juga harus kalo ditanya pencapaian terbesar kamu jawab soal keberhasilan proyek di polytron`;
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : msg.role,
        content: msg.content
      }));

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', 
          messages: [
            { role: 'system', content: getSystemPrompt(mode) },
            ...chatHistory,
            userMsg
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const aiReply = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);

    } catch (error) {
      console.error("Error fetching AI:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, koneksi ke server AI sedang gangguan. Silakan coba lagi nanti." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* z-[9999] memastikan elemen ini menimpa SEMUA elemen di web kamu termasuk Navbar */
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6">
          
          {/* Latar Belakang Gelap (Backdrop) */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
          />

          {/* Tombol Silang (X) Mengambang di Pojok Kanan Atas Layar */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all border border-white/20 shadow-xl"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-[95vw] max-w-5xl h-[88vh] md:h-[85vh] mt-8 md:mt-0 flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${
              isDarkMode ? 'bg-[#030712]/95 border-white/10 shadow-purple-900/20' : 'bg-white/95 border-gray-200 shadow-blue-900/10'
            } backdrop-blur-xl`}
          >
            {/* Header Popup */}
            <div className={`flex items-center gap-3 p-4 md:p-5 border-b shrink-0 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-500 shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse shrink-0" />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">Andhika.AI</span></h3>
                <p className={`text-xs ${textSub}`}>Same content. Different explanation.</p>
              </div>
            </div>

            {/* Mode Selector */}
            <div className={`flex border-b shrink-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
              {modes.map((m) => {
                const Icon = m.icon;
                const isActive = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-1 transition-all duration-300 relative ${isActive ? (isDarkMode ? 'text-purple-400' : 'text-purple-600') : textSub}`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center">{m.label}</span>
                    {isActive && <motion.div layoutId="activeModeModal" className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500" />}
                  </button>
                );
              })}
            </div>

            {/* Chat Window */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 scrollbar-hide">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    <div className={`shrink-0 flex items-center justify-center shadow-md overflow-hidden ${msg.role === 'user' ? 'bg-blue-600 text-white w-8 h-8 md:w-10 md:h-10 p-2 rounded-full' : 'w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200'}`}>
                      {msg.role === 'user' ? (
                        <User className="w-full h-full shrink-0" />
                      ) : (
                        <img src="images/profile.png" alt="AI Profile" className="w-full h-full object-cover" />
                      )}
                    </div>
                    
                    <div className={`max-w-[85%] md:max-w-[75%] p-3 md:p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : isDarkMode ? 'bg-white/10 border border-white/5 text-gray-200 rounded-tl-sm' : 'bg-gray-100 border border-gray-200 text-gray-800 rounded-tl-sm'}`}>
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 md:gap-4">
                  <div className="shrink-0 flex items-center justify-center shadow-md overflow-hidden w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200">
                    <img src="images/profile.png" alt="AI Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className={`p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 md:p-5 border-t shrink-0 ${isDarkMode ? 'border-white/10 bg-[#030712]/80' : 'border-gray-100 bg-white'}`}>
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                {quickPrompts[mode].map((prompt, idx) => (
                  <button key={idx} onClick={() => handleSend(prompt)} disabled={isLoading} className={`shrink-0 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-full border transition-all whitespace-nowrap ${isDarkMode ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/20' : 'border-purple-200 text-purple-700 hover:bg-purple-50'}`}>
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex items-center gap-2 md:gap-3">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Tanya AI Andhika...`} disabled={isLoading} className={`flex-1 p-3 md:p-4 rounded-xl border outline-none transition-all duration-300 text-sm md:text-base ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-purple-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-400'}`} />
                <button type="submit" disabled={!input.trim() || isLoading} className={`p-3 md:p-4 rounded-xl flex items-center justify-center transition-all shrink-0 w-11 h-11 md:w-14 md:h-14 ${input.trim() && !isLoading ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md shadow-blue-600/30' : isDarkMode ? 'bg-white/10 text-gray-500' : 'bg-gray-200 text-gray-400'}`}>
                  <Send className="w-5 h-5 shrink-0" />
                </button>
              </form>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AskAI;