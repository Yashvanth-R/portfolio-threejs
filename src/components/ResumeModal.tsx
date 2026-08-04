import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  FileText,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Award,
} from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION, SKILL_CATEGORIES, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const plainText = `
YASHVANTH R
Bangalore, Karnataka 560079 | (+91) 9591622064 | yashvanthr064@gmail.com
LinkedIn: linkedin.com | GitHub: github.com | Portfolio: yashvanth-portfolio-alpha.vercel.app

PROFESSIONAL SUMMARY:
Full Stack Developer with 1.8+ years of experience designing, building, and deploying scalable web applications from concept to production. Experienced in modern React.js, Next.js, Node.js, TypeScript, Express.js, NestJS, and FastAPI. Skilled in CMS-driven platforms, Supabase auth, dual-currency PayPal/PayU payment integrations, Docker, AWS, and Grafana/Prometheus observability.

EDUCATION:
- Bachelor of Engineering (B.E) in AI and Data Science - Global Academy of Technology (07.2024)
- Pre-University (PU) in PCMB (81.67%) - MES PU College (08.2020)
- Secondary (SSLC) (90.56%) - Max Muller High School (04.2018)

WORK EXPERIENCE:
1. Frontend Developer | Full Stack Developer - Cybrisk Tech Pvt Ltd (11.2024 – Present, Bangalore)
- Next.js, React.js, TypeScript, Node.js, NestJS, FastAPI full stack development.
- Built CMS-driven eCommerce platform (Sams Shopping) with Strapi, Supabase Auth, dual-currency pricing (INR/USD), PayPal & PayU payment gateways.
- Built SVTC Trust student scholarship management platform with Next.js & AWS S3.
- Containerized applications with Docker & Docker Compose; AWS CI/CD pipelines with Grafana & Prometheus observability.

2. Project Intern - Indian Institute of Information Technology (10.2022 – 01.2023, Allahabad)
- Developed ML models for predictive analytics and image classification algorithms.

PROJECTS:
- Dynamic Form Builder (React, TypeScript, Redux Toolkit, Material UI)
- Keep Notes (Next.js, FastAPI, MongoDB, JWT)
- Microservices Architecture (Node.js, Express, RabbitMQ, MongoDB, Docker)
`;

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-10 flex flex-col my-8 max-h-[90vh] overflow-hidden"
        >
          {/* Header Controls */}
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Official Resume — Yashvanth R</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Plaintext' : 'Copy Text'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-slate-950 text-slate-200 space-y-8 font-sans">
            
            {/* Document Header */}
            <div className="text-center space-y-2 border-b border-slate-800 pb-6">
              <h1 className="text-3xl font-extrabold text-white tracking-wide">{PERSONAL_INFO.name}</h1>
              <p className="text-xs font-mono text-amber-400">
                Bangalore, Karnataka 560079 • (+91) 9591622064 • yashvanthr064@gmail.com
              </p>
              <div className="flex justify-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-400">LinkedIn</a>
                <span>•</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-amber-400">GitHub</a>
                <span>•</span>
                <a href={PERSONAL_INFO.portfolioVercel} target="_blank" rel="noreferrer" className="hover:text-amber-400">Portfolio</a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Full Stack Developer with 1.8+ years of experience designing, building, and deploying scalable web applications from concept to production. Experienced in developing modern, responsive applications using React.js, Next.js, Node.js, TypeScript, and JavaScript, with hands-on expertise in building RESTful APIs and integrating backend services using Express.js, NestJS, and FastAPI. Skilled in developing CMS-driven platforms, authentication systems, payment gateway integrations (PayPal, PayU, Stripe), and admin dashboards. Strong experience with Docker, AWS, CI/CD pipelines, Grafana, and Prometheus for deploying and monitoring production applications. Actively seeking international engineering positions.
              </p>
            </div>

            {/* Professional Skills */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                Professional Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                <div><strong className="text-white">Languages:</strong> Python, TypeScript, JavaScript, SQL</div>
                <div><strong className="text-white">Front-end:</strong> React.js, Next.js, Tailwind CSS, Redux, Zustand</div>
                <div><strong className="text-white">Backend:</strong> Node.js, Express, NestJS, FastAPI, RabbitMQ</div>
                <div><strong className="text-white">Databases:</strong> PostgreSQL, MongoDB, MySQL, Redis, Supabase</div>
                <div><strong className="text-white">Cloud/DevOps:</strong> AWS (EC2, S3, Lambda), Docker, Grafana, Prometheus</div>
                <div><strong className="text-white">Payments/Auth:</strong> PayPal, PayU, Stripe, Supabase Auth, JWT</div>
              </div>
            </div>

            {/* Educational Background */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                Educational Background
              </h2>
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div>
                    <h3 className="font-bold text-white">{edu.degree}</h3>
                    <p className="text-slate-400">{edu.institution} • <strong className="text-amber-400">{edu.score}</strong> ({edu.scoreLabel})</p>
                  </div>
                  <span className="font-mono text-slate-400 shrink-0">{edu.period}</span>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                Work Experience
              </h2>
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <h3 className="font-bold text-white">{exp.role}</h3>
                      <p className="text-amber-400 font-semibold">{exp.company} ({exp.location})</p>
                    </div>
                    <span className="font-mono text-slate-400 shrink-0">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-2">
                    {exp.bulletPoints.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                Featured Projects
              </h2>
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <h3 className="font-bold text-white">{proj.title} <span className="text-amber-400 font-mono text-[11px]">({proj.technologies.slice(0, 4).join(', ')})</span></h3>
                  <p className="text-slate-300">{proj.description}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
