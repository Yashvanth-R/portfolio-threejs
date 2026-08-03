import React, { Suspense, lazy, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';

const ProjectsShowcase = lazy(() => import('./components/ProjectsShowcase').then((module) => ({ default: module.ProjectsShowcase })));
const ExperienceTimeline = lazy(() => import('./components/ExperienceTimeline').then((module) => ({ default: module.ExperienceTimeline })));
const EducationCertifications = lazy(() => import('./components/EducationCertifications').then((module) => ({ default: module.EducationCertifications })));
const ContactSection = lazy(() => import('./components/ContactSection').then((module) => ({ default: module.ContactSection })));
const Footer = lazy(() => import('./components/Footer').then((module) => ({ default: module.Footer })));
const ThreeCanvasHero = lazy(() => import('./components/ThreeCanvasHero').then((module) => ({ default: module.ThreeCanvasHero })));
const Skills3DMatrix = lazy(() => import('./components/Skills3DMatrix').then((module) => ({ default: module.Skills3DMatrix })));
const ResumeModal = lazy(() => import('./components/ResumeModal').then((module) => ({ default: module.ResumeModal })));

export default function App() {
  const [theme3D, setTheme3D] = useState<'budapest' | 'cyber' | 'emerald' | 'obsidian'>('budapest');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Interactive Dual-Layer Custom Cursor */}
      <CustomCursor />

      {/* 1. Hardware Accelerated Three.js WebGL 3D Background */}
      <Suspense fallback={null}>
        <ThreeCanvasHero theme={theme3D} />
      </Suspense>

      {/* 2. Top Navigation Bar */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        current3DTheme={theme3D}
        onChange3DTheme={setTheme3D}
      />

      {/* 3. Main Hero Section */}
      <Hero
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* 4. Projects Showcase */}
      <Suspense fallback={null}>
        <ProjectsShowcase />
      </Suspense>

      {/* 5. Professional Work Experience Timeline */}
      <Suspense fallback={null}>
        <ExperienceTimeline />
      </Suspense>

      {/* 6. 3D Skills Proficiency Matrix */}
      <Suspense fallback={null}>
        <Skills3DMatrix />
      </Suspense>

      {/* 7. Educational Background & Academic Distinction */}
      <Suspense fallback={null}>
        <EducationCertifications />
      </Suspense>

      {/* 8. Contact Hub */}
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>

      {/* 9. Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Modals */}
      <Suspense fallback={null}>
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      </Suspense>
    </div>
  );
}
