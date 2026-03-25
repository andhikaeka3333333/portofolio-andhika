import React from 'react';
import { MapPin, GraduationCap } from 'lucide-react';
import { profile } from '../data/portfolioData';

const About = ({ glassStyle, textSub }) => {
  return (
    <section id="about" className="py-16 md:py-24 px-6 bg-blue-500/[0.01]">
      <div className="container mx-auto max-w-5xl">
        <div className={`p-6 md:p-12 rounded-[24px] md:rounded-[32px] border ${glassStyle} grid md:grid-cols-5 gap-8 md:gap-12 items-center relative overflow-hidden`}>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

          <div className="md:col-span-2 relative z-10 mx-auto w-full max-w-[280px] md:max-w-none">
            <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl relative group">
              <img
                src="images/andhika.png"
                alt={profile.name}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay group-hover:bg-transparent transition-all" />
            </div>
          </div>

          <div className="md:col-span-3 relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-tight italic">Profil Singkat</h2>
            <p className={`${textSub} text-sm md:text-base leading-relaxed mb-6 md:mb-8`}>
              Halo! Saya <span className="text-blue-500 font-bold">{profile.name}</span>. Sebagai pengembang berusia {profile.age} tahun, saya antusias dalam membangun solusi digital yang efisien. Pengalaman saya di dunia profesional dimulai melalui magang di industri manufaktur ternama di Kudus.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 border-t border-white/5 pt-6 md:pt-8 text-left">
              <div className="flex items-start gap-3 group p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-widest">Lokasi</p>
                  <p className="text-sm font-bold">{profile.location.split(',')[0]}, Jateng</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors shrink-0">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-0.5 tracking-widest">Pendidikan</p>
                  <p className="text-sm font-bold">{profile.school}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;