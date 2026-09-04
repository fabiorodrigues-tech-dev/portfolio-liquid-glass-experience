import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { AppleControlCenterIcon } from './icons/ControlCenterIcon'
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
    <header className={`fixed top-0 left-0 w-full h-8 px-4 flex items-center justify-between apple-liquid-glass z-40 select-none ${isDark ? 'dark-theme' : 'light-theme'} text-zinc-900 dark:text-white`}>
      {/* 1. Lado Esquerdo: Título do Sistema "Portfólio OS" com Popover Sobre Este Portfólio */}
      <div className="flex items-center">
        <div className="relative">
          <div
            onClick={(e) => {
              e.stopPropagation()
              setActiveMenu(activeMenu === 'about' ? null : 'about')
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
          >
            <span className="font-bold text-xs text-zinc-900 dark:text-white">⌘ Portfólio OS</span>
            <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">• RECIFE, BR</span>
          </div>

          {activeMenu === 'about' && (
            <div
              className={`absolute left-0 top-10 w-72 p-5 rounded-2xl apple-liquid-glass ${
                isDark ? 'bg-[#0c0d14]/85 text-white' : 'bg-white/90 text-zinc-950'
              } shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100 border-none select-none`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-zinc-950 dark:text-white">
                    Fábio Rodrigues
                  </h3>
                  <p className="text-xs text-[#374151] dark:text-zinc-400 mb-3">
                    Desenvolvedor Full Stack & Filmmaker
                  </p>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#34c759] mt-1 shrink-0 animate-pulse" title="Status: Online" />
              </div>

              {/* Detalhes do Sistema em micro-linhas de fonte mono */}
              <div className="space-y-1.5 py-3 border-y border-black/10 dark:border-white/10 text-[11px] font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#374151] dark:text-zinc-400">Versão:</span>
                  <span className="text-[#09090b] dark:text-zinc-200 font-medium">macOS 26 Tahoe (Liquid Glass)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#374151] dark:text-zinc-400">Origem:</span>
                  <span className="text-[#09090b] dark:text-zinc-200 font-medium">Recife - PE, Brasil</span>
                </div>
                <div className="flex flex-col gap-0.5 pt-1">
                  <span className="text-[#374151] dark:text-zinc-400">Core:</span>
                  <span className="text-[#09090b] dark:text-zinc-200 text-[10.5px]">Java 21 LTS, Spring Boot, React 19, 4K ProRes</span>
                </div>
              </div>

              {/* Botão com sombra de elevação tátil Apple */}
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(null)
                  onSelectTab?.('sobre')
                }}
                className="w-full mt-3 py-2.5 px-4 rounded-xl font-semibold text-xs text-zinc-900 dark:text-white bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 shadow-[0_3px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Trajetória Completa</span>
              </button>
            </div>
          )}
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
          <AppleControlCenterIcon className={`w-4 h-4 ${isControlCenterOpen ? 'text-[#007aff]' : 'text-zinc-900 dark:text-white'}`} />
        </button>
      </div>
    </header>
  )
}
