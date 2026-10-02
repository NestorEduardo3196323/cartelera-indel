import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  LayoutGrid,
  CheckCircle2,
  Code2,
  FolderKanban,
  ArrowRight,
  Plus,
  Trash2,
  Sliders,
  Laptop,
  Database,
  Bot
} from 'lucide-react';

interface ProjectIdea {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  tags: string[];
}

export default function App() {
  const [quickNotes, setQuickNotes] = useState<string[]>([
    'Definir la temática principal de la aplicación',
    'Conectar componentes visuales y datos interactivos',
  ]);
  const [noteInput, setNoteInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const templates: ProjectIdea[] = [
    {
      id: '1',
      title: 'Panel SaaS & Analíticas',
      category: 'dashboard',
      description: 'Métricas en tiempo real, gráficos de ventas, conversión y control de usuarios.',
      icon: '📊',
      tags: ['Dashboard', 'Finanzas', 'Métricas'],
    },
    {
      id: '2',
      title: 'Gestor de Tareas & Proyectos',
      category: 'productividad',
      description: 'Tableros Kanban interactivos, asignación de prioridades y calendario de entregas.',
      icon: '📋',
      tags: ['Kanban', 'Organización', 'Equipos'],
    },
    {
      id: '3',
      title: 'Plataforma E-commerce & Tienda',
      category: 'tienda',
      description: 'Catálogo de productos con carrito interactivo, checkout dinámico y filtros avanzados.',
      icon: '🛍️',
      tags: ['Catálogo', 'Carrito', 'Ventas'],
    },
    {
      id: '4',
      title: 'Herramienta de Asistente IA',
      category: 'ia',
      description: 'Generador de contenido, análisis inteligente y asistentes conversacionales a medida.',
      icon: '✨',
      tags: ['Gemini', 'Generador', 'Productividad'],
    },
    {
      id: '5',
      title: 'Centro Educativo & Cursos',
      category: 'educacion',
      description: 'Módulos de aprendizaje, exámenes interactivos y seguimiento de progreso del estudiante.',
      icon: '🎓',
      tags: ['Cursos', 'Quiz', 'Progreso'],
    },
    {
      id: '6',
      title: 'Calculadora & Herramienta Especializada',
      category: 'herramientas',
      description: 'Simulador financiero, conversor especializado o cálculo de presupuestos.',
      icon: '⚡',
      tags: ['Fórmulas', 'Simulador', 'Exportar'],
    },
  ];

  const filteredTemplates = selectedCategory === 'todos' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    setQuickNotes([...quickNotes, noteInput.trim()]);
    setNoteInput('');
  };

  const removeNote = (index: number) => {
    setQuickNotes(quickNotes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Studio Space
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                En línea
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span className="hidden sm:inline">¿Qué aplicación construiremos hoy?</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-neutral-900/30 p-8 sm:p-12 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-xs text-neutral-300 font-medium">
              <Rocket className="w-3.5 h-3.5 text-indigo-400" />
              <span>Listo para desarrollar</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              ¡Hola! Tu nuevo entorno de creación está listo.
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Dime qué tipo de aplicación o herramienta quieres crear (por ejemplo: un CRM, una tienda online, un panel de control, un juego interactivo o un asistente inteligente) y lo construiré paso a paso con interfaces modernas y funcionales.
            </p>
          </div>
        </section>

        {/* Explore Categories / Ideas */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-indigo-400" />
                Explora ideas de proyectos
              </h2>
              <p className="text-sm text-neutral-400">
                Selecciona una idea o cuéntame tu concepto personalizado en el chat.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'dashboard', label: 'Dashboards' },
                { id: 'productividad', label: 'Productividad' },
                { id: 'tienda', label: 'E-Commerce' },
                { id: 'ia', label: 'Inteligencia Artificial' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/50 hover:border-neutral-700 transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2 rounded-xl bg-neutral-800 border border-neutral-700">
                      {template.icon}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                    {template.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Quick Notes & Plan Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-indigo-400" />
                  Notas rápidas del proyecto
                </h3>
                <p className="text-xs text-neutral-400">
                  Anota requisitos o ideas que quieras tener a mano.
                </p>
              </div>
              <span className="text-xs text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-full">
                {quickNotes.length} elementos
              </span>
            </div>

            <form onSubmit={addNote} className="flex gap-2">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Escribe un requisito o idea..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </form>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {quickNotes.length === 0 ? (
                <p className="text-xs text-neutral-400 py-6 text-center">No hay notas agregadas aún.</p>
              ) : (
                quickNotes.map((note, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 group"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-sm text-neutral-200">{note}</span>
                    </div>
                    <button
                      onClick={() => removeNote(index)}
                      className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-400 transition-all p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Capabilities Info */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                Capacidades integradas
              </h3>
              <p className="text-xs text-neutral-400">
                La aplicación está configurada con un stack de alto rendimiento:
              </p>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-indigo-400" /> React 19 + TypeScript + Vite
                </li>
                <li className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" /> Tailwind CSS v4 para diseño dinámico
                </li>
                <li className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-400" /> Soporte para Backend, APIs y Base de Datos
                </li>
                <li className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-400" /> Integraciones de IA con Gemini
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200">
              💡 Simplemente dime qué deseas construir y adaptaré toda la aplicación a tus especificaciones.
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-400">
        Studio Space • Desarrollado para ti
      </footer>
    </div>
  );
}
