import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Layout,
  Server,
  Cloud,
  Database,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Terminal,
  Cpu,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const ThreeSkillPolyhedron = lazy(() => import('./ThreeSkillPolyhedron').then((module) => ({ default: module.ThreeSkillPolyhedron })));

export const Skills3DMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Programming Languages': <Code className="w-5 h-5 text-amber-400" />,
    'Front-end Development': <Layout className="w-5 h-5 text-blue-400" />,
    'Backend & Microservices': <Server className="w-5 h-5 text-emerald-400" />,
    'Cloud, DevOps & Observability': <Cloud className="w-5 h-5 text-cyan-400" />,
    'Databases & CMS': <Database className="w-5 h-5 text-purple-400" />,
    'Payments & Authentication': <ShieldCheck className="w-5 h-5 text-amber-400" />,
  };

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.category)];

  const displayedCategories = selectedCategory === 'All'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            3D Technical Proficiency Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Core Technical Skills
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Comprehensive breakdown of languages, frameworks, cloud platforms, databases, and microservice tools.
          </p>
        </div>

        {/* Interactive 3D Skill Polyhedron Canvas */}
        <div className="mb-10 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-4 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2 space-y-3 px-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-mono">
              <Cpu className="w-3.5 h-3.5" />
              WebGL Polyhedron • Mouse Responsive
            </div>
            <h3 className="text-xl font-bold text-white">
              Interactive Skill Geometry
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hover over or drag across the 3D crystal to rotate. Select different skill domains below to trigger real-time lighting transitions and orbital particle reconfiguration.
            </p>
          </div>

          <div className="w-full md:w-1/2 h-64 relative rounded-xl bg-slate-950/60 border border-slate-800/60 overflow-hidden">
            <Suspense fallback={<div className="w-full h-full rounded-xl bg-slate-950/60" />}> 
              <ThreeSkillPolyhedron activeCategory={selectedCategory} className="w-full h-full" />
            </Suspense>
          </div>
        </div>

        {/* Category Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-12">
          {displayedCategories.map((catGroup, idx) => (
            <motion.div
              key={catGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl"
            >
              {/* Group Title */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {categoryIcons[catGroup.category] || <Code className="w-5 h-5 text-amber-400" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{catGroup.category}</h3>
                  <p className="text-xs text-slate-400">{catGroup.description}</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catGroup.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-200 group-hover:text-amber-400 transition-colors">
                          {skill.name}
                        </span>
                        {skill.featured && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold">
                            CORE
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-amber-400">{skill.experience}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                      {skill.tagline}
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-1">
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-blue-500 rounded-full group-hover:from-amber-400 group-hover:to-blue-400 transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
