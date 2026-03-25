import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './CustomIcons';

const Contact = ({ glassStyle, textSub }) => {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-3/4 bg-blue-500/5 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto text-center max-w-3xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-tight italic">Mari Bertemu Secara Digital.</h2>
        <p className={`${textSub} text-sm md:text-lg mb-8 md:mb-10 leading-relaxed px-4`}>
          Terbuka untuk kolaborasi, proyek menarik, atau sekadar berbagi pengalaman mengenai pengembangan perangkat lunak.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a href="mailto:andhikaeka311@email.com" className="w-full sm:w-auto flex justify-center items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-blue-600/20 group">
            <Mail size={18} className="group-hover:animate-bounce" /> Kirim Email
          </a>
          <div className="flex gap-4 w-full sm:w-auto justify-center">
            <a href="https://www.linkedin.com/in/andhika-eka-santosa-852b25281/" target="_blank" rel="noopener noreferrer" className={`p-3.5 md:p-4 rounded-xl border ${glassStyle} hover:border-blue-500 hover:text-blue-500 hover:scale-110 transition-all`}>
              <LinkedinIcon size={20} />
            </a>
            <a href="https://github.com/andhikaeka3333333" target="_blank" rel="noopener noreferrer" className={`p-3.5 md:p-4 rounded-xl border ${glassStyle} hover:border-gray-400 hover:text-gray-400 hover:scale-110 transition-all`}>
              <GithubIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;