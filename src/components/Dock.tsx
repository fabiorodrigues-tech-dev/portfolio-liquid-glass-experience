import React from 'react'
import {
  Terminal,
  Mail,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons'
import { AppleControlCenterIcon } from './icons/ControlCenterIcon'
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
  theme,
  isFocusMode = false,
}) => {
  const isDark = theme === 'dark'

  return (
    <div
      style={{
        backgroundColor: isDark ? 'rgba(18, 20, 28, 0.55)' : 'rgba(255, 255, 255, 0.60)',
        backdropFilter: 'blur(28px) saturate(200%)',
        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
      }}
      className={`select-none fixed z-40 transition-all duration-300 ease-in-out
        /* Mobile: Edge-to-Edge Continuous Liquid Glass Tab Bar (< md) */
        bottom-0 inset-x-0 w-full rounded-none border-t border-x-0 border-b-0 border-white/25 dark:border-white/15 shadow-[0_-8px_32px_rgba(0,0,0,0.25)] px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] flex items-center justify-around
        /* Desktop: Floating macOS Capsule (>= md) */
        md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:rounded-[22px] md:border md:border-white/25 md:dark:border-white/20 md:shadow-[0_16px_40px_rgba(0,0,0,0.45)] md:px-3 md:py-1.5 md:gap-2 md:justify-center
        ${isFocusMode ? 'translate-y-28 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
    >
      {/* Item 0: Finder (Projetos) */}
      <button
        type="button"
        onClick={() => onSelectTab('projetos')}
        className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-transform duration-200 ease-out md:hover:-translate-y-2 md:hover:scale-115 active:scale-95 will-change-transform"
        aria-label="Projetos (Finder)"
      >
        {/* Tooltip com delay suave */}
        <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden md:inline-block">
          Projetos
        </span>
        {/* Halo de luz sutil da cor do app */}
        <div className="absolute inset-0 rounded-xl bg-blue-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <img 
          src="/finder.png" 
          alt="Finder" 
          className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-xl drop-shadow-md select-none pointer-events-none relative z-10"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {activeTab === 'projetos' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Item 1: Sobre Este Mac (Sobre Mim) */}
      <button
        type="button"
        onClick={() => onSelectTab('sobre')}
        className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-transform duration-200 ease-out md:hover:-translate-y-2 md:hover:scale-115 active:scale-95 will-change-transform"
        aria-label="Sobre & Trajetória (MacBook)"
      >
        <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden md:inline-block">
          Sobre Mim
        </span>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-zinc-700 dark:to-zinc-800 p-1.5 md:p-2 flex items-center justify-center shadow-md text-white border border-white/20 relative z-10">
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        {activeTab === 'sobre' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Item 2: Terminal (Habilidades) */}
      <button
        type="button"
        onClick={() => onSelectTab('habilidades')}
        className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-transform duration-200 ease-out md:hover:-translate-y-2 md:hover:scale-115 active:scale-95 will-change-transform"
        aria-label="Habilidades & Stack (Terminal)"
      >
        <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden md:inline-block">
          Habilidades
        </span>
        <div className="absolute inset-0 rounded-xl bg-emerald-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-gray-800 to-black text-white flex items-center justify-center shadow-md border border-white/20 relative z-10">
          <Terminal className="w-4 h-4 md:w-5 md:h-5 text-[#34c759]" />
        </div>
        {activeTab === 'habilidades' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Item 3: Mail (Contato) */}
      <button
        type="button"
        onClick={() => onSelectTab('contato')}
        className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-transform duration-200 ease-out md:hover:-translate-y-2 md:hover:scale-115 active:scale-95 will-change-transform"
        aria-label="Contato (Mail)"
      >
        <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden md:inline-block">
          Contato
        </span>
        <div className="absolute inset-0 rounded-xl bg-sky-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center shadow-md relative z-10">
          <Mail className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        {activeTab === 'contato' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Divisor do Dock */}
      <div className="w-[1px] h-6 md:h-7 bg-black/15 dark:bg-white/15 mx-0.5 md:mx-1 shrink-0" />

      {/* Item 4: Central de Controle */}
      <button
        type="button"
        onClick={onToggleControlCenter}
        className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-transform duration-200 ease-out md:hover:-translate-y-2 md:hover:scale-115 active:scale-95 will-change-transform"
        aria-label="Central de Controle"
      >
        <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden md:inline-block">
          Central de Controle
        </span>
        <div className="absolute inset-0 rounded-xl bg-neutral-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 flex items-center justify-center shadow-md relative z-10">
          <AppleControlCenterIcon className="w-4 h-4 md:w-5 md:h-5 text-zinc-900 dark:text-white" />
        </div>
      </button>

      {/* Item 5: GitHub */}
      <a
        href="https://github.com/fabiorodrigues-tech-dev"
        target="_blank"
        rel="noreferrer"
        className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-transform duration-200 ease-out md:hover:-translate-y-2 md:hover:scale-115 active:scale-95 will-change-transform"
        aria-label="Perfil no GitHub: @fabiorodrigues-tech-dev"
      >
        <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden md:inline-block">
          GitHub
        </span>
        <div className="absolute inset-0 rounded-xl bg-zinc-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#0d1117] border border-white/20 text-white flex items-center justify-center shadow-md relative z-10">
          <GithubIcon className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </a>

      {/* Item 6: LinkedIn Oficial */}
      <a
        href="https://www.linkedin.com/in/fabiorodrigues-dev/"
        target="_blank"
        rel="noreferrer"
        className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-transform duration-200 ease-out md:hover:-translate-y-2 md:hover:scale-115 active:scale-95 will-change-transform"
        aria-label="Perfil no LinkedIn: Fábio Rodrigues"
      >
        <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hidden md:inline-block">
          LinkedIn
        </span>
        <div className="absolute inset-0 rounded-xl bg-[#0A66C2]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-md relative z-10">
          <LinkedinIcon className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </a>
    </div>
  )
}
