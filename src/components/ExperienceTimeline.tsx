import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Building2,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import { WORK_EXPERIENCE } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<string>(WORK_EXPERIENCE[0].id);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            Professional Experience & Track Record
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            1.8+ years of hands-on software engineering across production web platforms, CMS integrations, and AI machine learning research.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Steps */}
          <div className="lg:col-span-4 space-y-3">
            {WORK_EXPERIENCE.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExp(exp.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  selectedExp === exp.id
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-xl shadow-amber-500/10 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-4 h-4 ${selectedExp === exp.id ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="font-bold text-sm text-slate-200">{exp.company}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">{exp.role}</p>
                  <p className="text-[11px] font-mono text-amber-400">{exp.period}</p>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    selectedExp === exp.id ? 'translate-x-1 text-amber-400' : 'text-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Detail Card */}
          <div className="lg:col-span-8">
            {WORK_EXPERIENCE.filter((e) => e.id === selectedExp).map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl"
              >
                {/* Experience Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                      {exp.type}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">{exp.role}</h3>
                    <p className="text-sm font-semibold text-amber-400 mt-0.5">{exp.company}</p>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 justify-end">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-slate-300 text-sm leading-relaxed">{exp.summary}</p>

                {/* Key Achievements Highlight Box */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <Award className="w-4 h-4 text-amber-400" />
                    Key Architectural Achievement
                  </div>
                  <p className="text-xs text-slate-200">{exp.keyAchievement}</p>
                </div>

                {/* Bullet Points */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                    Responsibilities & System Deliverables
                  </h4>
                  <div className="space-y-2.5">
                    {exp.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Technologies Utilized
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
