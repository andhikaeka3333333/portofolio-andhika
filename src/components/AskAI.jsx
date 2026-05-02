import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, X, Briefcase, Terminal, MessageCircle, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Data portofolio representasi Andhika
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

  const personas = [
    { id: 'recruiter', label: 'HR / Recruiter', icon: Briefcase, color: 'from-blue-600/20 to-blue-400/20', iconColor: 'text-blue-500', desc: 'Tanya soal pengalaman kerja.' },
    { id: 'developer', label: 'Tech Enthusiast', icon: Terminal, color: 'from-purple-600/20 to-purple-400/20', iconColor: 'text-purple-500', desc: 'Ngobrol teknis coding.' },
    { id: 'casual', label: 'Teman Santai', icon: MessageCircle, color: 'from-emerald-600/20 to-emerald-400/20', iconColor: 'text-emerald-500', desc: 'Kenali Andhika secara personal.' }
  ];

  const getSystemPrompt = (currentMode) => {
    const portfolioContext = JSON.stringify({ profile, projects, timelineData, skillCategories });
    let personaPrompt = currentMode === 'recruiter'
      ? "Profesional, sopan, fokus pada pengalaman kerja dan pencapaian. Projek Polytron hanya yang ada Polytron saja. starindo juga yang ada starindo saja. jangan mengarang"
      : currentMode === 'developer'
        ? "Senior Developer vibe, gunakan istilah teknis (React, Laravel, MySQL)."
        : "Santai, gaul, bahas hobi dan visi masuk ITS.";

    return `Kamu adalah AI representasi Andhika Eka Santosa. 
    Data: ${portfolioContext}. Gaya: ${personaPrompt}. 
    PENTING: Selalu gunakan format tabel Markdown standar (|---|) untuk menyajikan list data seperti pendidikan atau skill atau apapun agar terbaca sistem.`;
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
          messages: [{ role: 'system', content: getSystemPrompt(activeMode) }, ...messages, userMsg],
          temperature: 0.7,
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Waduh, koneksi lagi bermasalah nih!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Styling Tabel Custom agar memiliki garis (Border)
  const markdownComponents = {
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-lg border border-white/20 shadow-inner">
        <table className="w-full text-left border-collapse min-w-[300px]">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className={`${isDarkMode ? 'bg-white/10' : 'bg-gray-100'} border-b border-white/20`}>
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className={`p-3 text-xs font-bold uppercase tracking-wider border-r border-white/10 last:border-r-0`}>
        {children}
      </th>
    ),
    tr: ({ children }) => (
      <tr className={`border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors`}>
        {children}
      </tr>
    ),
    td: ({ children }) => (
      <td className={`p-3 text-xs border-r border-white/10 last:border-r-0`}>
        {children}
      </td>
    ),
    strong: ({ children }) => <strong className="font-bold text-blue-400">{children}</strong>,
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
            <div className="flex-1 overflow-y-auto relative scrollbar-hide flex flex-col">
              <AnimatePresence mode="wait">
                {!mode ? (
                  <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                    <div className="relative mb-6 mt-auto md:mt-0">
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative z-10">
                        <img src="images/maskot.png" alt="Maskot" className="w-40 h-40 md:w-64 md:h-64 object-contain mx-auto" />
                      </motion.div>
                      <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-3 blur-2xl rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-900/10'}`} />
                    </div>
                    <div className="mb-auto md:mb-0 text-center w-full">
                      <h2 className="text-xl md:text-3xl font-bold mb-2 tracking-tight">Halo! Saya Virtual Andhika</h2>
                      <p className={`text-xs md:text-sm max-w-md mb-8 mx-auto px-4 ${textSub}`}>Pilih satu mode untuk mulai mengobrol.</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl px-4 mx-auto">
                        {personas.map((p) => (
                          <button key={p.id} onClick={() => handleSend("Halo, bisa ceritakan tentang dirimu?", p.id)} className={`group p-4 md:p-5 rounded-2xl border text-left transition-all active:scale-[0.98] md:hover:scale-[1.02] ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-blue-500/50' : 'bg-gray-50 border-gray-200 hover:border-blue-500'}`}>
                            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center md:mb-4 shrink-0`}>
                                <p.icon className={`w-5 h-5 md:w-6 md:h-6 ${p.iconColor}`} />
                              </div>
                              <div className="flex-1 text-sm font-bold group-hover:text-blue-500 transition-colors">{p.label}</div>
                              <ChevronRight className="md:hidden opacity-30 w-4 h-4" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 md:p-8 flex flex-col gap-6">
                    {messages.map((msg, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full shrink-0 border flex items-center justify-center overflow-hidden ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100'}`}>
                          {msg.role === 'user' ? <User size={16} /> : <img src="images/profile.png" alt="Profile" className="w-full h-full object-cover" />}
                        </div>
                        <div className={`max-w-[95%] md:max-w-[85%] p-3 md:p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : isDarkMode ? 'bg-white/5 border border-white/10 rounded-tl-none text-gray-200' : 'bg-gray-100 border-gray-200 rounded-tl-none text-gray-800'}`}>
                          <div className="text-xs md:text-sm leading-relaxed overflow-x-auto">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && <div className="flex items-center gap-2 opacity-50 text-[10px] ml-12 animate-pulse">Berpikir...</div>}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Footer */}
            {mode && (
              <div className={`p-4 md:p-6 border-t ${isDarkMode ? 'bg-[#030712] border-white/10' : 'bg-white'}`}>
                <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative max-w-4xl mx-auto flex gap-2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Tanya sebagai ${mode}...`} className={`flex-1 p-3 md:p-4 rounded-2xl outline-none border transition-all text-sm ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-blue-500 text-white' : 'bg-gray-50 focus:border-blue-500'}`} />
                  <button type="submit" disabled={isLoading || !input.trim()} className={`p-3 md:p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30`}><Send size={18} /></button>
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