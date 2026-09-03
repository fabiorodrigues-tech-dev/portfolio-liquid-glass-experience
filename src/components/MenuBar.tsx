import React, { useState, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import type { TabType, ThemeMode } from '../types'

interface MenuBarProps {
  onOpenSpotlight: () => void
  onToggleControlCenter: () => void
  isControlCenterOpen: boolean
  onSelectTab?: (tab: TabType) => void
  theme?: ThemeMode
}

export const MenuBar: React.FC<MenuBarProps> = ({
  onOpenSpotlight,
  onToggleControlCenter,
  isControlCenterOpen,
  onSelectTab,
  theme,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')

  const isDark = theme ? theme === 'dark' : (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))

  // Live Apple Clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
      const dateStr = now.toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
      setCurrentTime(timeStr)
      setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null)
    if (activeMenu) {
      window.addEventListener('click', handleClickOutside)
      return () => window.removeEventListener('click', handleClickOutside)
    }
  }, [activeMenu])

  return (
    <header className={`fixed top-0 left-0 w-full h-7 z-30 liquid-glass-menubar flex items-center justify-between px-3 text-[13px] select-none ${isDark ? 'dark-theme' : 'light-theme'} text-zinc-900 dark:text-white`}>
      {/* 1. Lado Esquerdo: Logo FR, FÁBIO RODRIGUES e RECIFE, BR */}
      <div className="flex items-center space-x-2">
        {/* Monograma Logo "FR" com Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActiveMenu(activeMenu === 'fr' ? null : 'fr')
            }}
            className={`w-6 h-5 rounded px-1 flex items-center justify-center font-bold text-[11px] tracking-wider transition-all ${
              activeMenu === 'fr'
                ? 'bg-black/15 dark:bg-white/20 text-[#007aff]'
                : 'hover:bg-black/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white'
            }`}
            title="Menu do Sistema"
          >
            FR
          </button>

          {activeMenu === 'fr' && (
            <div
              className="absolute left-0 top-6.5 w-60 p-1.5 rounded-xl bg-[#f5f6fa]/95 dark:bg-[#0c0d14]/95 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100 border border-black/10 dark:border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Fábio Rodrigues
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null)
                  onSelectTab?.('sobre')
                }}
                className="w-full px-2.5 py-1 text-left text-[12px] font-medium rounded-lg hover:bg-[#007aff] hover:text-white transition-colors flex items-center justify-between text-zinc-900 dark:text-white"
              >
                <span>Sobre o Desenvolvedor</span>
                <span className="text-[10px] opacity-70">Recife - PE</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null)
                  onToggleControlCenter()
                }}
                className="w-full px-2.5 py-1 text-left text-[12px] rounded-lg hover:bg-[#007aff] hover:text-white transition-colors text-zinc-900 dark:text-white"
              >
                Central de Controle...
              </button>
              <div className="h-[1px] my-1 bg-black/10 dark:bg-white/15" />
              <a
                href="https://www.linkedin.com/in/fabiorodrigues-dev/"
                target="_blank"
                rel="noreferrer"
                className="w-full px-2.5 py-1 text-left text-[12px] rounded-lg hover:bg-[#007aff] hover:text-white transition-colors block text-zinc-900 dark:text-white"
              >
                Conectar no LinkedIn
              </a>
              <a
                href="https://github.com/fabiorodrigues-tech-dev"
                target="_blank"
                rel="noreferrer"
                className="w-full px-2.5 py-1 text-left text-[12px] rounded-lg hover:bg-[#007aff] hover:text-white transition-colors block text-zinc-900 dark:text-white"
              >
                Ver Repositório GitHub
              </a>
              <div className="h-[1px] my-1 bg-black/10 dark:bg-white/15" />
              <div className="px-2.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400">
                macOS 26 Tahoe • Recife, BR
              </div>
            </div>
          )}
        </div>

        {/* Nome do Desenvolvedor */}
        <span className="font-bold text-[12px] tracking-tight uppercase text-zinc-900 dark:text-white">
          FÁBIO RODRIGUES
        </span>

        {/* Localização Badge */}
        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full liquid-glass-sm text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 border border-black/10 dark:border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
          <span className="tracking-wide">RECIFE, BR</span>
        </div>
      </div>

      {/* 2. Lado Direito: Spotlight, Relógio e Central de Controle */}
      <div className="flex items-center space-x-2 text-[12px]">
        {/* Spotlight Search (Cmd + K) */}
        <button
          type="button"
          onClick={onOpenSpotlight}
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center space-x-1 text-zinc-900 dark:text-white"
          title="Spotlight Search (⌘K)"
          aria-label="Buscar no portfólio"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px] px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono opacity-85 font-semibold">
            ⌘K
          </span>
        </button>

        {/* Live Date & Time */}
        <div
          className="px-1.5 py-0.5 font-medium text-[12px] tracking-tight text-zinc-900 dark:text-white cursor-default"
          title="Horário Oficial de Brasília / Recife"
        >
          <span>{currentDate} </span>
          <span className="font-bold">{currentTime}</span>
        </div>

        {/* Control Center Toggle */}
        <button
          type="button"
          onClick={onToggleControlCenter}
          className={`p-1 rounded transition-colors ${
            isControlCenterOpen
              ? 'bg-black/15 dark:bg-white/20 text-[#007aff]'
              : 'hover:bg-black/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white'
          }`}
          title="Central de Controle"
          aria-label="Central de Controle"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  )
}
