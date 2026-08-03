import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Distinction & Foundations
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Educational Background
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Rigorous background in Artificial Intelligence, Data Science, Algorithms, and Mathematics.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 p-6 space-y-5 shadow-xl backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Score Pill */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-sm border border-amber-500/30">
                    {edu.score}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {edu.scoreLabel}
                  </span>
                </div>

                {/* Degree Title */}
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">{edu.degree}</h3>
                  <p className="text-xs font-semibold text-amber-400 mt-1">{edu.institution}</p>
                </div>

                {/* Dates & Location */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 pt-2">
                  {edu.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-amber-400/80">
                <span>Degree Certificate Verified</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
