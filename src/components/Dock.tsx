import React from 'react'
import {
  Terminal,
  Mail,
  SlidersHorizontal,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons'
import type { TabType, ThemeMode } from '../types'

interface DockProps {
  activeTab: TabType
  onSelectTab: (tab: TabType) => void
  onToggleControlCenter: () => void
  theme: ThemeMode
  isFocusMode?: boolean
}

export const Dock: React.FC<DockProps> = ({
  activeTab,
  onSelectTab,
  onToggleControlCenter,
  isFocusMode = false,
}) => {
  return (
    <div
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-30 select-none transition-all duration-300 ease-in-out ${
        isFocusMode
          ? 'translate-y-28 opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="apple-liquid-glass bg-white/30 dark:bg-black/35 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl px-3 py-2 flex items-center space-x-2 border-none">
        {/* Item 0: Finder (Projetos) */}
        <button
          type="button"
          onClick={() => onSelectTab('projetos')}
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Projetos (Finder)"
        >
          {/* Tooltip com delay suave */}
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Projetos
          </span>
          {/* Halo de luz sutil da cor do app */}
          <div className="absolute inset-0 rounded-xl bg-blue-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <img 
            src="/finder.png" 
            alt="Finder" 
            className="w-10 h-10 object-contain rounded-xl drop-shadow-md select-none pointer-events-none relative z-10"
            onError={(e) => {
              // Fallback com gradiente suave oficial caso a imagem ainda não esteja na pasta
              e.currentTarget.style.display = 'none';
            }}
          />
          {activeTab === 'projetos' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-color,#007aff)] shadow-sm" />
          )}
        </button>

        {/* Item 1: Sobre Este Mac (Sobre Mim) */}
        <button
          type="button"
          onClick={() => onSelectTab('sobre')}
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Sobre & Trajetória (MacBook)"
        >
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Sobre Mim
          </span>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-zinc-700 dark:to-zinc-800 p-2 flex items-center justify-center shadow-md text-white border border-white/20 relative z-10">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          {activeTab === 'sobre' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-color,#007aff)] shadow-sm" />
          )}
        </button>

        {/* Item 2: Terminal (Habilidades) */}
        <button
          type="button"
          onClick={() => onSelectTab('habilidades')}
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Habilidades & Stack (Terminal)"
        >
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Habilidades
          </span>
          <div className="absolute inset-0 rounded-xl bg-emerald-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gray-800 to-black text-white flex items-center justify-center shadow-md border border-white/20 relative z-10">
            <Terminal className="w-5 h-5 text-[#34c759]" />
          </div>
          {activeTab === 'habilidades' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-color,#007aff)] shadow-sm" />
          )}
        </button>

        {/* Item 3: Mail (Contato) */}
        <button
          type="button"
          onClick={() => onSelectTab('contato')}
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Contato (Mail)"
        >
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Contato
          </span>
          <div className="absolute inset-0 rounded-xl bg-sky-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center shadow-md relative z-10">
            <Mail className="w-5 h-5" />
          </div>
          {activeTab === 'contato' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-color,#007aff)] shadow-sm" />
          )}
        </button>

        {/* Divisor do Dock */}
        <div className="w-[1px] h-6 bg-black/15 dark:bg-white/15 mx-1" />

        {/* Item 4: Central de Controle */}
        <button
          type="button"
          onClick={onToggleControlCenter}
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Central de Controle & Ajustes"
        >
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Central de Controle
          </span>
          <div className="absolute inset-0 rounded-xl bg-neutral-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neutral-400 to-neutral-600 text-white flex items-center justify-center shadow-md relative z-10">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </button>

        {/* Item 5: GitHub */}
        <a
          href="https://github.com/fabiorodrigues-tech-dev"
          target="_blank"
          rel="noreferrer"
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Perfil no GitHub: @fabiorodrigues-tech-dev"
        >
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            GitHub
          </span>
          <div className="absolute inset-0 rounded-xl bg-zinc-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-[#0d1117] border border-white/20 text-white flex items-center justify-center shadow-md relative z-10">
            <GithubIcon className="w-5 h-5" />
          </div>
        </a>

        {/* Item 6: LinkedIn Oficial */}
        <a
          href="https://www.linkedin.com/in/fabiorodrigues-dev/"
          target="_blank"
          rel="noreferrer"
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Perfil no LinkedIn: Fábio Rodrigues"
        >
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            LinkedIn
          </span>
          <div className="absolute inset-0 rounded-xl bg-[#0A66C2]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-md relative z-10">
            <LinkedinIcon className="w-5 h-5" />
          </div>
        </a>
      </div>
    </div>
  )
}
