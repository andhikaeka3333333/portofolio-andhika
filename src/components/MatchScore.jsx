import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, X, Zap, Loader2, CheckCircle2, TrendingUp, AlertCircle, Sparkles, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Ambil data asli portofolio kamu
import { profile, projects, skillCategories } from '../data/portfolioData';

const MatchScore = ({ isOpen, onClose, isDarkMode }) => {
    const [jobDesc, setJobDesc] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const resultRef = useRef(null);

    const candidateData = {
        name: profile.name,
        about: profile.about,
        skills: skillCategories.flatMap(cat => cat.skills),
        projects: projects.map(p => ({ title: p.title, tech: p.techStack, desc: p.description })),
        experience: ["R&D Web Developer Intern at Polytron", "Software Developer at PT Starindo Jaya Packaging"]
    };

    const analyzeMatch = async () => {
        if (!jobDesc.trim()) return;
        setIsLoading(true);
        setAnalysis(null);

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
                        {
                            role: 'system',
                            content: `You are an AI Match Evaluator. Compare Candidate Data with Job Description.
              Candidate Data: ${JSON.stringify(candidateData)}
              
              Rules:
              1. Do NOT rely only on exact keyword matching. Infer related skills.
              2. Score must be above 90% if there's a strong relation to candidate's background.
              3. Score must be above 90% if there is one or two job descriptions that are related to the candidate's experience or skills
              4. If the job description is in Indonesian, you answer in Indonesian. If it is in English, you answer in English.
              4. Output MUST follow this EXACT Markdown structure for parsing:
                 
                 # [Percentage]%
                 
                 ### Strong Match
                 - Skill 1, Skill 2, Skill 3
                 
                 ### Related Skills
                 - Skill A (Reasoning), Skill B (Reasoning)
                 
                 ### Growth Areas
                 - Skill X, Skill Y
                 
                 ### Insight
                 [Short narrative]`
                        },
                        { role: 'user', content: `Analyze this Job Description: ${jobDesc}` }
                    ],
                    temperature: 0.5,
                })
            });

            const data = await response.json();
            setAnalysis(data.choices[0].message.content);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Custom Components untuk Render Markdown menjadi Card & Bubbles
    const MarkdownComponents = {
        // Header 1 digunakan untuk Score raksasa
        h1: ({ children }) => (
            <div className="text-center mb-10">
                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-50 block mb-2">Match Rating</span>
                <div className="text-6xl md:text-7xl font-black bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent inline-block">
                    {children}
                </div>
            </div>
        ),
        // Section Headers
        h3: ({ children }) => {
            const isStrong = children.toString().includes('Strong');
            const isRelated = children.toString().includes('Related');
            const isGrowth = children.toString().includes('Growth');
            const isInsight = children.toString().includes('Insight');

            const config = isStrong
                ? { color: 'text-emerald-400', icon: <CheckCircle2 size={18} />, label: 'Strong Match' }
                : isRelated
                    ? { color: 'text-blue-400', icon: <TrendingUp size={18} />, label: 'Related Skills' }
                    : isGrowth
                        ? { color: 'text-amber-400', icon: <AlertCircle size={18} />, label: 'Growth Areas' }
                        : { color: 'text-purple-400', icon: <Lightbulb size={18} />, label: 'Expert Insight' };

            return (
                <div className={`flex items-center gap-2 font-bold mb-4 ${config.color}`}>
                    {config.icon} <span className="uppercase tracking-wider text-sm">{config.label}</span>
                </div>
            );
        },
        // Mengubah List menjadi Flexbox Bubbles
        ul: ({ children }) => (
            <div className="flex flex-wrap gap-2 mb-8 italic">
                {children}
            </div>
        ),
        li: ({ children }) => {
            // Logika warna berdasarkan konteks parent bisa kompleks, kita gunakan warna netral/transparan yang rapi
            return (
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'
                    }`}>
                    {children}
                </span>
            );
        },
        p: ({ children }) => <p className="text-sm leading-relaxed opacity-80 italic">{children}</p>
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className={`relative w-full max-w-4xl h-full md:h-[90vh] flex flex-col overflow-hidden md:rounded-3xl border shadow-2xl ${isDarkMode ? 'bg-[#030712] border-white/10' : 'bg-white border-gray-200'}`}
                    >
                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                                    <Target className="text-white w-5 h-5" />
                                </div>
                                <h2 className="font-bold text-lg">AI Match Evaluator</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"><X size={20} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 scrollbar-hide">
                            {/* Input */}
                            <section className="max-w-2xl mx-auto space-y-4">
                                <textarea
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                    placeholder="Paste Job Description di sini untuk melihat kecocokan skill Andhika..."
                                    className={`w-full h-40 p-5 rounded-2xl border outline-none transition-all resize-none text-sm leading-relaxed ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-blue-500/50' : 'bg-gray-50 border-gray-200 focus:border-blue-500'}`}
                                />
                                <button
                                    onClick={analyzeMatch}
                                    disabled={isLoading || !jobDesc.trim()}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? <><Loader2 className="animate-spin" size={20} /> <span>Analyzing Profile...</span></> : <><Zap size={18} /> <span>Check Match Score</span></>}
                                </button>
                            </section>

                            {/* Results */}
                            <div ref={resultRef} className="max-w-2xl mx-auto">
                                {analysis && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        {/* Hasil Markdown di-render di sini */}
                                        <div className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={MarkdownComponents}
                                            >
                                                {analysis}
                                            </ReactMarkdown>
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 opacity-40 text-[10px] uppercase tracking-widest font-medium">
                                            <span>Verified via Andhika's Portfolio Data</span>
                                            {/* <span>Model: Llama-3.3-70B-Versatile</span> */}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MatchScore;