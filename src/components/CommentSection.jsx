import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Send, User, MessageCircle, ReceiptRussianRuble } from 'lucide-react';
import { motion } from 'framer-motion';

const CommentSection = ({ articleId, textSub }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    const { data } = await supabase.from('comments').select('*').eq('article_id', articleId).order('created_at', { ascending: false });
    if (data) setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const { error } = await supabase.from('comments').insert([{ article_id: articleId, user_name: name, comment_text: text }]);
    if (!error) { setName(''); setText(''); fetchComments(); }
    setIsSending(false);
  };

  return (
    <div className="border-t border-white/5 pt-10">
      <div className="flex items-center gap-3 mb-8"><MessageCircle className="text-blue-500" size={24}/><h4 className="text-xl font-bold">Diskusi ({comments.length})</h4></div>
      
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <input type="text" placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500/50 text-sm" required />
        <textarea placeholder="Tulis komentar..." value={text} onChange={(e) => setText(e.target.value)} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500/50 text-sm h-28" required />
        <button type="submit" disabled={isSending} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-blue-700 transition-all">
          {isSending ? 'MENGIRIM...' : <>KIRIM <Send size={14}/></>}
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((c, i) => (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={c.id} className="flex gap-4 group">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500 shrink-0"><User size={18}/></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1"><span className="font-bold text-sm text-blue-400">{c.user_name}</span><span className="text-[9px] text-gray-500 uppercase">{new Date(c.created_at).toLocaleDateString()}</span></div>
              <p className={`${textSub} text-sm bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5`}>{c.comment_text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;