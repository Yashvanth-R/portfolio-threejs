import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  MapPin,
  Clock,
  Briefcase,
  ShieldCheck,
  Check,
  Languages,
  Calendar,
  Send,
  Plane,
  Building,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeGlobe } from './ThreeGlobe';

export const RelocationBanner: React.FC = () => {
  // Live World Time Calculator (Bangalore vs Budapest vs London)
  const [times, setTimes] = useState({
    ist: '',
    cet: '',
    gmt: '',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        ist: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }),
        cet: now.toLocaleTimeString('en-US', { timeZone: 'Europe/Budapest', hour: '2-digit', minute: '2-digit' }),
        gmt: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="relocation" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Plane className="w-3.5 h-3.5" />
            Global Mobility & Relocation Readiness
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Targeting International Career Roles
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Ready to join innovative tech teams in <strong className="text-amber-300">Budapest (Hungary)</strong>, Germany, Netherlands, United Kingdom, and across Europe & Global Remote.
          </p>
        </div>

        {/* Main Mobility Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Relocation Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-amber-500" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-6 h-6 text-amber-400" />
                    Preferred Destination: Budapest, Hungary 🇭🇺
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Also open to: Germany, Netherlands, UK, EU-wide & Global Remote
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                  Active Applicant
                </span>
              </div>

              {/* Interactive 3D Relocation Arc Globe */}
              <div className="relative mb-6 rounded-xl bg-slate-950/80 border border-slate-800/80 overflow-hidden">
                <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  3D Flight Vector: Bangalore ➔ Budapest
                </div>
                <ThreeGlobe className="w-full h-52" />
              </div>

              {/* World Clocks Comparison */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6 text-center">
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Budapest (CET)</p>
                  <p className="text-lg font-bold text-amber-400 font-mono mt-0.5">{times.cet || '00:00'}</p>
                </div>
                <div className="border-x border-slate-800">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">London (GMT)</p>
                  <p className="text-lg font-bold text-blue-400 font-mono mt-0.5">{times.gmt || '00:00'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Bangalore (IST)</p>
                  <p className="text-lg font-bold text-slate-200 font-mono mt-0.5">{times.ist || '00:00'}</p>
                </div>
              </div>

              {/* Mobility Checklist */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Work Visa & Permit Readiness</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Eligible for Hungarian Guest Worker / White Card / Tech Work Visa and EU Blue Card sponsorship. Complete academic credentials verified.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Relocation Timeline & Notice Period</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Available to relocate physically within 30 to 45 days upon receiving job offer and visa green light. Immediate remote start available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Language & Communication</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Full professional English fluency in technical and business contexts. Actively learning Hungarian language basics for cultural integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Pitch CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Contact: <strong className="text-slate-200">{PERSONAL_INFO.email}</strong>
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Job%20Opportunity%20in%20Budapest%2FEU%20-%20Full%20Stack%20Developer&body=Hi%20Yashvanth,%20we%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20full%20stack%20engineering%20role.`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Pitch Opportunity Directly</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Key Relocation Details & Languages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
          >
            {/* Preferred Work Models */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                Work Engagement Models
              </h3>

              {/* <div className="grid grid-cols-1 gap-2.5">
                {RELOCATION_INFO.workModel.map((model, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-200"
                  >
                    <span>{model}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                ))}
              </div> */}
            </div>

            {/* Language Proficiency Card */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Languages className="w-5 h-5 text-blue-400" />
                Language Fluency
              </h3>

              {/* <div className="space-y-3">
                {RELOCATION_INFO.languages.map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200">{lang.language}</span>
                      <span className="font-mono text-amber-400">{lang.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-blue-500 rounded-full"
                        style={{
                          width:
                            lang.language === 'English'
                              ? '100%'
                              : lang.language === 'Kannada'
                              ? '100%'
                              : lang.language === 'Hindi'
                              ? '90%'
                              : '40%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Degree Distinction Badge */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl font-mono shrink-0">
                9.14
              </div>
              <div>
                <p className="text-xs font-mono text-amber-400 font-semibold">B.E. Degree in AI & Data Science</p>
                <p className="text-xs text-slate-300">Global Academy of Technology (First Class Distinction)</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
