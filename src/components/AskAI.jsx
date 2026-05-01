import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, X, Briefcase, Terminal, MessageCircle, ChevronRight } from 'lucide-react';

// Import data portofolio kamu untuk dijadikan "Otak" AI
import { profile, projects, timelineData, skillCategories } from '../data/portfolioData';

const AskAI = ({ isOpen, onClose, isDarkMode, textSub }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setMode(null);
      setMessages([]);
    }
  }, [isOpen]);

  // Mengganti emoji dengan Lucide Icons untuk kesan profesional
  const personas = [
    { 
      id: 'recruiter', 
      label: 'HR / Recruiter', 
      icon: Briefcase, 
      color: 'from-blue-600/20 to-blue-400/20', 
      iconColor: 'text-blue-500',
      desc: 'Tanya soal pengalaman kerja & profesionalisme.' 
    },
    { 
      id: 'developer', 
      label: 'Tech Enthusiast', 
      icon: Terminal, 
      color: 'from-purple-600/20 to-purple-400/20', 
      iconColor: 'text-purple-500',
      desc: 'Ngobrol teknis soal coding & arsitektur sistem.' 
    },
    { 
      id: 'casual', 
      label: 'Teman Santai', 
      icon: MessageCircle, 
      color: 'from-emerald-600/20 to-emerald-400/20', 
      iconColor: 'text-emerald-500',
      desc: 'Kenali Andhika lebih dekat secara personal.' 
    }
  ];

  const getSystemPrompt = (currentMode) => {
    const portfolioContext = JSON.stringify({ profile, projects, timelineData, skillCategories });
    let personaPrompt = "";
    if (currentMode === 'recruiter') {
      personaPrompt = "Anda berbicara secara profesional, sopan, dan berorientasi pada hasil. Fokuskan jawaban pada dampak bisnis, kerja sama tim, pengalaman di PT Starindo dan Polytron.";
    } else if (currentMode === 'developer') {
      personaPrompt = "Anda berbicara seperti Senior Developer. Gunakan istilah teknis (ReactJS, Laravel, MySQL). Fokus pada tech stack dan alasan teknis pembangunan sistem.";
    } else {
      personaPrompt = "Anda berbicara dengan santai (gaul Indonesia). Fokus pada hobi, visi masuk ITS, dan antusiasme belajar.";
    }

    return `Kamu adalah AI representasi Andhika Eka Santosa, Fullstack Developer ${profile.age} tahun. 
    Data: ${portfolioContext}. Gaya: ${personaPrompt}. 
    PENTING: Jika ditanya pencapaian terbesar, jawab soal keberhasilan proyek intern di Polytron. Jangan halusinasi!`;
  };

  const handleSend = async (text, initialMode = null) => {
    const activeMode = initialMode || mode;
    if (!text.trim() || !activeMode) return;

    if (initialMode) setMode(initialMode);
    
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', 
          messages: [
            { role: 'system', content: getSystemPrompt(activeMode) },
            ...messages,
            userMsg
          ],
          temperature: 0.7,
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Server lagi sibuk, coba tanya lagi ya!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
            className={`relative w-full max-w-4xl h-full md:h-[90vh] flex flex-col overflow-hidden md:rounded-3xl border shadow-2xl ${isDarkMode ? 'bg-[#030712]/95 border-white/10' : 'bg-white border-gray-200'}`}
          >
            {/* Header */}
            <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <Sparkles className="text-blue-500 w-5 h-5" />
                <span className="font-bold tracking-tight">Andhika.AI</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors group">
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto relative scrollbar-hide">
              <AnimatePresence mode="wait">
                {!mode ? (
                  <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative mb-8">
                      <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative z-10">
                        <img src="images/maskot.png" alt="Maskot" className="w-60 h-60 md:w-70 md:h-70 object-contain" />
                      </motion.div>
                      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-36 h-4 blur-2xl rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-900/10'}`} />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Halo! Saya Virtual Andhika</h2>
                    <p className={`text-sm max-w-md mb-10 leading-relaxed ${textSub}`}>Pilih satu mode untuk mulai mengobrol. Saya akan menyesuaikan respon sesuai kebutuhan kamu.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl px-4">
                      {personas.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSend("Halo, bisa ceritakan tentang dirimu?", p.id)}
                          className={`group p-5 rounded-2xl border text-left transition-all hover:scale-[1.02] ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-white/[0.07]' : 'bg-gray-50 border-gray-200 hover:border-blue-500 hover:bg-white'}`}
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                            <p.icon className={`w-6 h-6 ${p.iconColor}`} />
                          </div>
                          <h4 className="font-bold text-sm mb-1.5 group-hover:text-blue-500 transition-colors">{p.label}</h4>
                          <p className="text-[10px] opacity-60 leading-relaxed font-medium">{p.desc}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 md:p-8 flex flex-col gap-6">
                    {messages.map((msg, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full shrink-0 border flex items-center justify-center overflow-hidden ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 border-gray-200'}`}>
                          {msg.role === 'user' ? <User size={18} /> : <img src="images/profile.png" alt="Profile" className="w-full h-full object-cover" />}
                        </div>
                        <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : isDarkMode ? 'bg-white/5 border border-white/10 rounded-tl-none text-gray-200' : 'bg-gray-100 border-gray-200 rounded-tl-none text-gray-800'}`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                       <div className="flex items-center gap-2 opacity-50 text-xs ml-14">
                        <div className="animate-bounce">●</div><div className="animate-bounce delay-100">●</div><div className="animate-bounce delay-200">●</div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {mode && (
              <div className={`p-4 md:p-6 border-t ${isDarkMode ? 'bg-[#030712] border-white/10' : 'bg-white border-gray-100'}`}>
                <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative max-w-4xl mx-auto flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Kirim pesan sebagai ${mode}...`}
                    className={`flex-1 p-4 pr-12 rounded-2xl outline-none border transition-all text-sm md:text-base ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500 text-gray-900'}`}
                  />
                  <button type="submit" disabled={isLoading || !input.trim()} className={`p-4 rounded-2xl transition-all shadow-lg ${input.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30 hover:scale-105' : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'}`}>
                    <Send size={20} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AskAI;