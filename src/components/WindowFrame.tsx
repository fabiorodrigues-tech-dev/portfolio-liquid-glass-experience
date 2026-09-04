import React, { useState } from 'react'
import { TrafficLights } from './TrafficLights'
import { SegmentedControl } from './SegmentedControl'
import type { TabType, ThemeMode, Project } from '../types'
import { ProjectsTab } from './tabs/ProjectsTab'
import { AboutTab } from './tabs/AboutTab'
import { SkillsTab } from './tabs/SkillsTab'
import { ContactTab } from './tabs/ContactTab'
import { Sun, Moon, Search } from 'lucide-react'

interface WindowFrameProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  theme: ThemeMode
  onToggleTheme: () => void
  onOpenSpotlight: () => void
  onSelectProject: (project: Project) => void
  isFocusMode?: boolean
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  activeTab,
  onTabChange,
  theme,
  onToggleTheme,
  onOpenSpotlight,
  onSelectProject,
  isFocusMode = false,
}) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const isDark = theme === 'dark'

  const handleClose = () => {
    setIsMinimized(true)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleZoom = () => {
    setIsMaximized(!isMaximized)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="bg-[#f5f6fa]/95 dark:bg-[#0c0d14]/95 backdrop-blur-xl border border-black/15 dark:border-white/15 rounded-xl px-4 py-2 flex items-center space-x-2 text-xs font-semibold shadow-2xl hover:scale-105 transition-transform text-zinc-900 dark:text-white cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span>Restaurar Janela de Fábio Rodrigues (macOS)</span>
        </button>
      </div>
    )
  }

  return (
    <div
      className={`w-full transition-all duration-300 relative ${
        isMaximized
          ? 'max-w-[98vw] h-[calc(100vh-75px)] mt-9'
          : isFocusMode
          ? 'max-w-5xl h-[calc(100vh-62px)] mt-8'
          : 'max-w-5xl h-[calc(100vh-110px)] mt-10'
      } ${isDark ? 'dark-theme' : 'light-theme'} mx-auto flex flex-col apple-liquid-glass window-frame rounded-3xl overflow-hidden select-none`}
    >
      {/* Window Top Toolbar Header */}
      <div className="h-13 px-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 shrink-0 relative">
        {/* Left: Official Apple Traffic Lights & Window Title */}
        <div className="flex items-center space-x-3.5">
          <TrafficLights
            onClose={handleClose}
            onMinimize={handleMinimize}
            onZoom={handleZoom}
            isMaximized={isMaximized}
          />

          <div className="hidden sm:flex items-center space-x-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span>Fábio Rodrigues</span>
            <span className="text-[10px] opacity-40">/</span>
            <span className="text-zinc-900 dark:text-white font-semibold capitalize">
              {activeTab}
            </span>
          </div>
        </div>

        {/* Center: Apple Segmented Control for the 4 Tabs */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <SegmentedControl activeTab={activeTab} onChange={onTabChange} />
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center space-x-1.5">
          {/* Spotlight Trigger */}
          <button
            type="button"
            onClick={onOpenSpotlight}
            className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 border-none flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-zinc-900 dark:text-white cursor-pointer"
            title="Spotlight Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Dark / Light Mode Direct Quick Switch */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/10 border-none flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-zinc-900 dark:text-white cursor-pointer"
            title={isDark ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-[#0a84ff]" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#ff9500]" />
            )}
          </button>
        </div>
      </div>

      {/* Window Scrollable Content Pane */}
      <main className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar text-zinc-900 dark:text-white">
        {activeTab === 'projetos' && (
          <ProjectsTab onSelectProject={onSelectProject} theme={theme} />
        )}
        {activeTab === 'sobre' && <AboutTab theme={theme} />}
        {activeTab === 'habilidades' && <SkillsTab theme={theme} />}
        {activeTab === 'contato' && <ContactTab theme={theme} />}
      </main>

      {/* Window Status Bar Footer */}
      <footer className="h-7 px-4 flex items-center justify-between border-t border-black/10 dark:border-white/15 text-[11px] text-zinc-600 dark:text-zinc-400 shrink-0 font-medium">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
          <span>macOS 26 Tahoe UI Kit • Liquid Glass Large (Calibrado)</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline">Pressione ⌘K para Spotlight</span>
          <span className="font-mono">React 19 + Tailwind v4</span>
        </div>
      </footer>
    </div>
  )
}
