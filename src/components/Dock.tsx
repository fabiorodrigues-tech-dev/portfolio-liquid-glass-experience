// Dock macOS Desktop (Nota: A Dock oficial móvel com Safari, Files, Contatos, Settings e Messages está em IOSMobileExperience.tsx)
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
  isWindowMinimized?: boolean
  onRestoreWindow?: () => void
  isControlCenterOpen?: boolean
}

export const Dock: React.FC<DockProps> = ({
  activeTab,
  onSelectTab,
  onToggleControlCenter,
  theme: _theme,
  isFocusMode = false,
  isWindowMinimized = false,
  onRestoreWindow,
  isControlCenterOpen = false,
}) => {
  return (
    <div
      className={`macos-dock-bar h-[68px] px-3.5 py-2 rounded-[24px] bg-white/20 dark:bg-white/[0.12] backdrop-blur-3xl border border-white/25 dark:border-white/18 shadow-2xl flex items-center gap-2.5 select-none fixed bottom-2 left-1/2 -translate-x-1/2 z-40 transition-all
        max-md:bottom-2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[calc(100%-24px)] max-md:max-w-[380px] max-md:h-[84px] max-md:px-3.5 max-md:rounded-[36px] max-md:bg-white/20 max-md:dark:bg-white/[0.12] max-md:backdrop-blur-3xl max-md:backdrop-saturate-200 max-md:border max-md:border-white/35 max-md:dark:border-white/20 max-md:shadow-[0_16px_40px_rgba(0,0,0,0.35)] max-md:justify-around
        ${
          isFocusMode
            ? 'translate-y-28 opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100'
        }`}
    >
      {/* Item 0: Finder (Projetos) */}
      <button
        type="button"
        onClick={() => onSelectTab('projetos')}
        className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 max-md:hover:translate-y-0 max-md:hover:scale-100"
        aria-label="Projetos (Finder)"
      >
        {/* Tooltip com delay suave */}
        <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
          Projetos
        </span>
        {/* Halo de luz sutil da cor do app */}
        <div className="absolute inset-0 rounded-xl bg-blue-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <img 
          src="/finder.png" 
          alt="Finder" 
          className="w-12 h-12 max-md:w-9 max-md:h-9 object-contain rounded-xl drop-shadow-md select-none pointer-events-none relative z-10"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {activeTab === 'projetos' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Item 1: Sobre Este Mac (Sobre Mim) */}
      <button
        type="button"
        onClick={() => onSelectTab('sobre')}
        className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 max-md:hover:translate-y-0 max-md:hover:scale-100"
        aria-label="Sobre & Trajetória (MacBook)"
      >
        <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
          Sobre Mim
        </span>
        <div className="w-12 h-12 max-md:w-9 max-md:h-9 rounded-xl bg-gradient-to-b from-blue-500 to-indigo-600 dark:from-zinc-700 dark:to-zinc-800 p-2.5 max-md:p-1.5 flex items-center justify-center shadow-md text-white border border-white/20 relative z-10">
          <svg className="w-12 h-12 max-md:w-5 max-md:h-5 object-contain" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        {activeTab === 'sobre' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Item 2: Terminal (Habilidades) */}
      <button
        type="button"
        onClick={() => onSelectTab('habilidades')}
        className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 max-md:hover:translate-y-0 max-md:hover:scale-100"
        aria-label="Habilidades & Stack (Terminal)"
      >
        <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
          Habilidades
        </span>
        <div className="absolute inset-0 rounded-xl bg-emerald-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-12 h-12 max-md:w-9 max-md:h-9 rounded-xl bg-gradient-to-tr from-gray-800 to-black text-white p-2.5 max-md:p-1.5 flex items-center justify-center shadow-md border border-white/20 relative z-10">
          <Terminal className="w-12 h-12 max-md:w-4 max-md:h-4 object-contain text-[#34c759]" />
        </div>
        {activeTab === 'habilidades' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Item 3: Mail (Contato) */}
      <button
        type="button"
        onClick={() => onSelectTab('contato')}
        className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 max-md:hover:translate-y-0 max-md:hover:scale-100"
        aria-label="Contato (Mail)"
      >
        <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
          Contato
        </span>
        <div className="absolute inset-0 rounded-xl bg-sky-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-12 h-12 max-md:w-9 max-md:h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white p-2.5 max-md:p-1.5 flex items-center justify-center shadow-md relative z-10">
          <Mail className="w-12 h-12 max-md:w-4 max-md:h-4 object-contain" />
        </div>
        {activeTab === 'contato' && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Divisor do Dock */}
      <div className="w-[1px] h-8 max-md:h-6 bg-black/15 dark:bg-white/15 mx-1 max-md:mx-0.5 shrink-0" />

      {/* Miniatura da Janela Minimizada no Dock (Estilo macOS Oficial) */}
      {isWindowMinimized && (
        <button
          type="button"
          onClick={onRestoreWindow}
          className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 animate-in zoom-in-75 duration-300"
          aria-label="Restaurar Janela de Fábio Rodrigues"
          title="Fábio Rodrigues — Portfólio (Clique para restaurar)"
        >
          {/* Tooltip */}
          <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
            Fábio Rodrigues — Portfólio
          </span>

          {/* Halo de luz suave */}
          <div className="absolute inset-0 rounded-xl bg-amber-500/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Cartão miniatura da janela minimizada */}
          <div className="w-11 h-8 max-md:w-8 max-md:h-6 rounded-md bg-white/80 dark:bg-[#12141e]/90 backdrop-blur-md border border-black/15 dark:border-white/20 shadow-md flex flex-col justify-between p-1 relative z-10 overflow-hidden">
            {/* Mini traffic lights */}
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-1 rounded-full bg-[#ff5f57]" />
              <span className="w-1 h-1 rounded-full bg-[#febc2e]" />
              <span className="w-1 h-1 rounded-full bg-[#28c840]" />
            </div>
            {/* Linhas estilizadas representando o conteúdo da janela */}
            <div className="space-y-0.5 opacity-60">
              <div className="w-6 h-0.5 bg-zinc-700 dark:bg-white/70 rounded-full" />
              <div className="w-4 h-0.5 bg-[#007aff] rounded-full" />
            </div>
          </div>

          {/* Indicador de minimizado (ponto âmbar característico com pulso sutil) */}
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.9)] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        </button>
      )}

      {/* Item 4: Central de Controle */}
      <button
        type="button"
        onClick={onToggleControlCenter}
        className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 max-md:hover:translate-y-0 max-md:hover:scale-100"
        aria-label="Central de Controle"
      >
        <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
          Central de Controle
        </span>
        {/* Halo de luz sutil da cor do app */}
        <div className="absolute inset-0 rounded-xl bg-blue-500/35 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        {/* Squircle Adaptativo Oficial Apple Control Center */}
        <div className="w-12 h-12 max-md:w-9 max-md:h-9 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center text-zinc-900 dark:text-white relative z-10 transition-all shadow-sm">
          <AppleControlCenterIcon className="w-6 h-6 max-md:w-4 max-md:h-4 object-contain" fillPills={true} />
        </div>
        {isControlCenterOpen && (
          <span className="w-1 h-1 rounded-full bg-white/80 dark:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.8)] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        )}
      </button>

      {/* Item 5: GitHub */}
      <a
        href="https://github.com/fabiorodrigues-tech-dev"
        target="_blank"
        rel="noreferrer"
        className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 max-md:hover:translate-y-0 max-md:hover:scale-100"
        aria-label="Perfil no GitHub: @fabiorodrigues-tech-dev"
      >
        <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
          GitHub
        </span>
        <div className="absolute inset-0 rounded-xl bg-zinc-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-12 h-12 max-md:w-9 max-md:h-9 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center text-zinc-900 dark:text-white relative z-10 transition-all shadow-sm">
          <GithubIcon className="w-6 h-6 max-md:w-4 max-md:h-4 object-contain" />
        </div>
      </a>

      {/* Item 6: LinkedIn Oficial */}
      <a
        href="https://www.linkedin.com/in/fabiorodrigues-dev/"
        target="_blank"
        rel="noreferrer"
        className="group w-12 h-12 rounded-xl flex items-center justify-center relative cursor-pointer hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all focus:outline-none will-change-transform max-md:w-9 max-md:h-9 max-md:hover:translate-y-0 max-md:hover:scale-100"
        aria-label="Perfil no LinkedIn: Fábio Rodrigues"
      >
        <span className="pointer-events-none absolute -top-10 px-2.5 py-0.5 rounded-lg text-zinc-950 font-bold bg-white/95 border border-black/10 dark:text-white dark:bg-black/95 dark:border-white/15 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md max-md:hidden">
          LinkedIn
        </span>
        <div className="absolute inset-0 rounded-xl bg-[#0A66C2]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="w-12 h-12 max-md:w-9 max-md:h-9 rounded-xl bg-[#0A66C2] text-white p-2.5 max-md:p-1.5 flex items-center justify-center shadow-md relative z-10">
          <LinkedinIcon className="w-12 h-12 max-md:w-4 max-md:h-4 object-contain" />
        </div>
      </a>
    </div>
  )
}

export interface MobileDockProps {
  activeTab: 'inicio' | 'projetos' | 'sobre' | 'habilidades' | 'contato'
  onSelectTab: (tab: 'inicio' | 'projetos' | 'sobre' | 'habilidades' | 'contato') => void
  isDark: boolean
  isFocusMode?: boolean
}

export const MobileDock: React.FC<MobileDockProps> = ({
  activeTab,
  onSelectTab,
  isDark,
  isFocusMode = false,
}) => {
  const icons = [
    {
      id: 'inicio' as const,
      label: 'Início (Safari)',
      src: isDark ? '/icons/dock/safari-dark.png' : '/icons/dock/safari-light.png',
    },
    {
      id: 'projetos' as const,
      label: 'Projetos (Arquivos)',
      src: isDark ? '/icons/dock/files-dark.png' : '/icons/dock/files-light.png',
    },
    {
      id: 'sobre' as const,
      label: 'Sobre (Contatos)',
      src: isDark ? '/icons/dock/contacts-dark.png' : '/icons/dock/contacts-light.png',
    },
    {
      id: 'habilidades' as const,
      label: 'Habilidades (Ajustes)',
      src: isDark ? '/icons/dock/settings-dark.png' : '/icons/dock/settings-light.png',
    },
    {
      id: 'contato' as const,
      label: 'Contato (Mensagens)',
      src: isDark ? '/icons/dock/messages-dark.png' : '/icons/dock/messages-light.png',
    },
  ]

  return (
    <nav
      className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] max-w-[380px] h-[84px] px-3.5 rounded-[36px] bg-white/20 dark:bg-white/[0.12] backdrop-blur-3xl backdrop-saturate-200 border border-white/35 dark:border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.35)] flex items-center justify-around select-none transition-all duration-300 ${
        isFocusMode ? 'translate-y-28 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      aria-label="Navegação móvel oficial em Squircles de Apps"
    >
      {icons.map((icon) => {
        const isContacts = icon.id === 'sobre'
        const scaleClass = isDark ? (isContacts ? 'scale-[1.14]' : 'scale-[1.10]') : 'scale-100'

        return (
          <button
            key={icon.id}
            type="button"
            onClick={() => onSelectTab(icon.id)}
            className="relative flex flex-col items-center justify-center cursor-pointer"
            title={icon.label}
            aria-label={icon.label}
          >
            <div className="w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] rounded-[14px] overflow-hidden flex items-center justify-center shadow-md select-none transition-transform active:scale-90">
              <img
                src={icon.src}
                alt={icon.label}
                className={`w-full h-full object-cover transition-all select-none ${scaleClass}`}
                loading="eager"
                decoding="async"
              />
            </div>
            {activeTab === icon.id && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
            )}
          </button>
        )
      })}
    </nav>
  )
}

