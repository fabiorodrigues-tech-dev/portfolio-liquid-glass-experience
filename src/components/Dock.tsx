import React from 'react'
import {
  FolderGit2,
  Compass,
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
      <div className="h-14 px-3 flex items-center space-x-2 rounded-2xl bg-[#f5f6fa]/80 dark:bg-[#0c0d14]/80 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-2xl">
        {/* Item 0: Finder (Projetos) */}
        <button
          type="button"
          onClick={() => onSelectTab('projetos')}
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Projetos (Finder)"
        >
          {/* Tooltip com delay suave */}
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg liquid-glass-sm bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Projetos
          </span>
          {/* Halo de luz sutil da cor do app */}
          <div className="absolute inset-0 rounded-xl bg-blue-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white flex items-center justify-center shadow-md relative z-10">
            <FolderGit2 className="w-5 h-5" />
          </div>
          {activeTab === 'projetos' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-color,#007aff)] shadow-sm" />
          )}
        </button>

        {/* Item 1: Safari (Sobre) */}
        <button
          type="button"
          onClick={() => onSelectTab('sobre')}
          className="group relative flex flex-col items-center justify-center p-1 cursor-pointer focus:outline-none transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-115 will-change-transform"
          aria-label="Sobre & Trajetória (Safari)"
        >
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg liquid-glass-sm bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Sobre Mim
          </span>
          <div className="absolute inset-0 rounded-xl bg-indigo-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md relative z-10">
            <Compass className="w-5 h-5" />
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
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg liquid-glass-sm bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
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
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg liquid-glass-sm bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
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
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg liquid-glass-sm bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
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
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg liquid-glass-sm bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            GitHub
          </span>
          <div className="absolute inset-0 rounded-xl bg-zinc-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-[#24292e] text-white flex items-center justify-center shadow-md relative z-10">
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
          <span className="pointer-events-none absolute -top-9 px-2.5 py-0.5 rounded-lg liquid-glass-sm bg-white/95 dark:bg-black/95 text-zinc-900 dark:text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            LinkedIn
          </span>
          <div className="absolute inset-0 rounded-xl bg-[#0077b5]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-[#0077b5] text-white flex items-center justify-center shadow-md relative z-10">
            <LinkedinIcon className="w-5 h-5" />
          </div>
        </a>
      </div>
    </div>
  )
}
