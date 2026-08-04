import React from 'react';
import { ArrowUp, Heart, Globe, Cpu, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-bold text-slate-200 text-sm">
            {PERSONAL_INFO.name} • Full Stack Developer
          </p>
          <p className="text-slate-400">
            Building High-Performance Web Applications & Cloud Systems.
          </p>
        </div>

        {/* Center Tech Stack Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>Built with React, Three.js & Tailwind CSS</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            System Status: 100% Active
          </span>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
