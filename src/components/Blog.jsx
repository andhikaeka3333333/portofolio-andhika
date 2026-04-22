import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const Blog = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles()
  }, [])

  async function getArticles() {
    const { data } = await supabase.from('articles').select('*')
    if (data) setArticles(data)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Artikel Terbaru
      </h1>
      
      <div className="grid gap-6">
        {articles.map((article) => (
          <div key={article.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all">
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-400 leading-relaxed">{article.content}</p>
            
            {/* Bagian Komentar Nanti di Sini */}
            <CommentSection articleId={article.id} />
          </div>
        ))}
      </div>
    </div>
  )
}