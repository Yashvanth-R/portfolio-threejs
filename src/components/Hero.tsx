import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  FileText,
  Code2,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const Hero3DIcons = lazy(() => import('./Hero3DIcons').then((module) => ({ default: module.Hero3DIcons })));

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const roles = [
    'Full Stack Web Developer (Next.js & React)',
    'Microservices & REST API Specialist',
    'FastAPI & Node.js Backend Engineer',
    'Docker & AWS Cloud Architect',
    'AI & Data Science Graduate',
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-blue-400">Next-Gen</span> Scalable Web Systems
              </h1>

              {/* Typewriter Rotator */}
              <div className="h-8 sm:h-10 flex items-center">
                <span className="text-lg sm:text-2xl font-mono text-amber-400/90 font-semibold flex items-center gap-2">
                  <span className="text-slate-500">&gt;</span>
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </span>
              </div>
            </motion.div>

            {/* Brief Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Full Stack Developer with <strong className="text-white">1.8+ years of experience</strong> engineering robust RESTful APIs, CMS eCommerce platforms, and event-driven microservices. B.E. in AI & Data Science graduate passionate about high-availability web architectures and clean UI engineering.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <Code2 className="w-4 h-4" />
                <span>Explore Projects</span>
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Resume PDF</span>
              </button>
            </motion.div>

            {/* Floating 3D Tech Stack Icons Canvas */}
            {/* <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="relative rounded-2xl bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-950/80 border border-slate-800/80 p-2 shadow-xl backdrop-blur-md max-w-xl overflow-hidden group hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between px-3 pt-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Cpu className="w-3.5 h-3.5" />
                  3D Tech Core
                </span>
                <span className="text-slate-500 text-[10px]">React Three Fiber • Mouse Responsive</span>
              </div>
              <Suspense fallback={<div className="w-full h-44 sm:h-48 rounded-xl border border-slate-800/60 bg-slate-950/40" />}> 
                <Hero3DIcons className="w-full h-44 sm:h-48" />
              </Suspense>
            </motion.div> */}

            {/* Quick Guarantee Badges */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-xl"
            >
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Docker & AWS Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Stack Specialist</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>English Fluent</span>
              </div>
            </motion.div> */}
          </div>

          {/* Profile & Stats Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/90 p-6 shadow-2xl backdrop-blur-xl group hover:border-amber-500/50 transition-all duration-300"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Developer Profile Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-blue-600 p-0.5 shadow-xl">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-xl font-mono">
                      YR
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {PERSONAL_INFO.name}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      B.E. AI & DS
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Bangalore, Karnataka, India
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {PERSONAL_INFO.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <p className="text-2xl font-black text-amber-400 font-mono tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Engineering Highlights Summary Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    Core Architecture Focus
                  </span>
                  <span className="text-emerald-400 font-mono">Full Stack</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Specialized in building end-to-end applications with Next.js, React, Node.js, FastAPI, Docker, and AWS deployments.
                </p>
              </div>

              {/* Direct Quick Contact Trigger */}
              <a
                href="#contact"
                className="mt-5 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700"
              >
                <span>Get in Touch</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center pt-16">
          <a
            href="#projects"
            className="p-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all animate-bounce"
            title="Scroll to Projects"
          >
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
