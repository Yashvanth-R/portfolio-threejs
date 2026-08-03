import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  X,
  Play,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Database,
  Server,
  Terminal,
  DollarSign,
  Plus,
  Trash2,
  RefreshCw,
  Send,
  Lock,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

export const ProjectsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'interactive'>('overview');

  // Simulator States
  // 1. Currency Store State
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');
  const [cartTotal, setCartTotal] = useState<number>(149.99);

  // 2. Microservice Queue Simulator State
  const [queueLogs, setQueueLogs] = useState<{ id: string; event: string; status: string; time: string }[]>([
    { id: '1', event: 'user.signup', status: 'Processed by Worker-1 (Email)', time: '04:12:01' },
  ]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  // 3. Dynamic Form Builder State
  const [formFields, setFormFields] = useState<{ id: string; label: string; type: string; required: boolean }[]>([
    { id: 'f1', label: 'Full Name', type: 'text', required: true },
    { id: 'f2', label: 'Date of Birth', type: 'date', required: true },
  ]);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');

  // 4. Notes Simulator State
  const [simNotes, setSimNotes] = useState<{ id: string; title: string; body: string }[]>([
    { id: '1', title: 'Budapest Relocation Plan', body: 'Prepare visa document verification & portfolio review.' },
  ]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');

  const categories = ['All', 'Full Stack', 'Microservices', 'Front-end'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handlePushQueueEvent = (eventType: string) => {
    setIsProcessingQueue(true);
    const newLog = {
      id: String(Date.now()),
      event: eventType,
      status: 'Enqueued to RabbitMQ Exchange...',
      time: new Date().toLocaleTimeString(),
    };

    setQueueLogs((prev) => [newLog, ...prev]);

    setTimeout(() => {
      setQueueLogs((prev) =>
        prev.map((item) =>
          item.id === newLog.id
            ? { ...item, status: 'Consuming from Queue ➔ Processed by Consumer Worker' }
            : item
        )
      );
      setIsProcessingQueue(false);
    }, 1200);
  };

  const handleAddFormField = () => {
    if (!newFieldLabel) return;
    setFormFields((prev) => [
      ...prev,
      { id: String(Date.now()), label: newFieldLabel, type: newFieldType, required: true },
    ]);
    setNewFieldLabel('');
  };

  const handleAddSimNote = () => {
    if (!noteTitle) return;
    setSimNotes((prev) => [{ id: String(Date.now()), title: noteTitle, body: noteBody }, ...prev]);
    setNoteTitle('');
    setNoteBody('');
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Featured Production Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Architected & Built Projects
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Click any project to explore its <strong className="text-amber-400">architecture breakdown</strong> and test live feature simulators.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => {
                setSelectedProject(project);
                setActiveTab('overview');
              }}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/50 p-5 cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Project Image Banner */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-[10px] font-mono font-bold">
                    {project.category}
                  </span>

                  {project.interactiveType && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/40 text-blue-300 text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      Live Interactive
                    </span>
                  )}
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-amber-400/90 mt-1 line-clamp-1">
                  {project.subtitle}
                </p>
                <p className="text-slate-300 text-xs mt-3 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags & Footer */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 text-[10px] font-mono border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-500 text-[10px] font-mono border border-slate-800">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Architecture & Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detailed Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="pr-8 space-y-2 mb-6">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{selectedProject.subtitle}</p>
                </div>

                {/* Tab Controls */}
                <div className="flex border-b border-slate-800 mb-6 gap-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 ${
                      activeTab === 'overview'
                        ? 'border-amber-400 text-amber-400'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Overview & Metrics
                  </button>
                  {selectedProject.architectureNodes && (
                    <button
                      onClick={() => setActiveTab('architecture')}
                      className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                        activeTab === 'architecture'
                          ? 'border-amber-400 text-amber-400'
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Architecture Diagram
                    </button>
                  )}
                  {selectedProject.interactiveType && (
                    <button
                      onClick={() => setActiveTab('interactive')}
                      className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                        activeTab === 'interactive'
                          ? 'border-amber-400 text-amber-400'
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                      Live Simulator
                    </button>
                  )}
                </div>

                {/* Tab 1: Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    {/* Key Metrics Grid */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                        Key Performance Highlights
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {selectedProject.metrics.map((m, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Tech Stack */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                        Technologies & Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((t, i) => (
                          <span key={i} className="px-3 py-1 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Interactive Architecture Diagram */}
                {activeTab === 'architecture' && selectedProject.architectureNodes && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <p className="text-xs text-slate-400 mb-4 font-mono">
                        Interactive System Topology — Shows flow of data packets across clients, microservices, databases, and message brokers:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedProject.architectureNodes.map((node) => (
                          <div
                            key={node.id}
                            className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 relative overflow-hidden"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                                {node.type}
                              </span>
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <h5 className="font-bold text-sm text-white">{node.label}</h5>
                            <p className="text-xs text-slate-400">{node.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Live Interactive Simulators */}
                {activeTab === 'interactive' && (
                  <div className="space-y-6">
                    {/* Currency Store Simulator */}
                    {selectedProject.interactiveType === 'currency-store' && (
                      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-amber-400" />
                            Sams Shopping Multi-Currency Converter & Checkout Simulator
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setCurrency('USD')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                currency === 'USD' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                              }`}
                            >
                              USD ($)
                            </button>
                            <button
                              onClick={() => setCurrency('INR')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                currency === 'INR' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                              }`}
                            >
                              INR (₹)
                            </button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-slate-400">Cart Total</p>
                            <p className="text-2xl font-bold font-mono text-amber-400">
                              {currency === 'USD' ? `$${cartTotal.toFixed(2)}` : `₹${(cartTotal * 86.5).toFixed(2)}`}
                            </p>
                          </div>
                          <button
                            onClick={() => alert(`Simulated ${currency === 'USD' ? 'PayPal Global' : 'PayU India'} Checkout Triggered!`)}
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                          >
                            Checkout with {currency === 'USD' ? 'PayPal (USD)' : 'PayU (INR)'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Microservices Queue Simulator */}
                    {selectedProject.interactiveType === 'microservice-queue' && (
                      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Server className="w-4 h-4 text-amber-400" />
                          RabbitMQ Event Pub/Sub Queue Simulator
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handlePushQueueEvent('user.registered')}
                            disabled={isProcessingQueue}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                          >
                            + Publish 'user.registered' Event
                          </button>
                          <button
                            onClick={() => handlePushQueueEvent('order.placed')}
                            disabled={isProcessingQueue}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                          >
                            + Publish 'order.placed' Event
                          </button>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto border border-slate-800">
                          {queueLogs.map((log) => (
                            <div key={log.id} className="flex justify-between border-b border-slate-800/60 pb-1">
                              <span className="text-amber-400">[{log.time}] {log.event}</span>
                              <span className="text-emerald-400">{log.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dynamic Form Builder Simulator */}
                    {selectedProject.interactiveType === 'form-builder' && (
                      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Plus className="w-4 h-4 text-amber-400" />
                          Live Dynamic Form Builder
                        </h4>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="New field label..."
                            value={newFieldLabel}
                            onChange={(e) => setNewFieldLabel(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                          />
                          <select
                            value={newFieldType}
                            onChange={(e) => setNewFieldType(e.target.value)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                          >
                            <option value="text">Text Input</option>
                            <option value="date">Date Picker</option>
                            <option value="email">Email Address</option>
                          </select>
                          <button
                            onClick={handleAddFormField}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                          >
                            Add Field
                          </button>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
                          <p className="text-xs font-mono text-amber-400">Rendered Dynamic Form Preview:</p>
                          {formFields.map((field) => (
                            <div key={field.id} className="space-y-1">
                              <label className="text-xs text-slate-300 font-semibold">{field.label}</label>
                              <input
                                type={field.type}
                                placeholder={`Enter ${field.label}...`}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Keep Notes Simulator */}
                    {selectedProject.interactiveType === 'notes-app' && (
                      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Lock className="w-4 h-4 text-amber-400" />
                          Encrypted Notes State (FastAPI + Zustand)
                        </h4>

                        <div className="space-y-2">
                          <input
                            type="text"
                            placeholder="Note Title..."
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                          />
                          <textarea
                            placeholder="Note Content..."
                            value={noteBody}
                            onChange={(e) => setNoteBody(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white h-16"
                          />
                          <button
                            onClick={handleAddSimNote}
                            className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                          >
                            Save Note to Zustand State
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {simNotes.map((note) => (
                            <div key={note.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                              <h5 className="font-bold text-xs text-amber-400">{note.title}</h5>
                              <p className="text-xs text-slate-300 mt-1">{note.body}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
