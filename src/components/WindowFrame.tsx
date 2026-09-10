import React, { useState, useEffect } from 'react'
import { TrafficLights } from './TrafficLights'
import { SegmentedControl } from './SegmentedControl'
import type { TabType, ThemeMode, Project } from '../types'
import { ProjectsTab } from './tabs/ProjectsTab'
import { AboutTab } from './tabs/AboutTab'
import { SkillsTab } from './tabs/SkillsTab'
import { ContactTab } from './tabs/ContactTab'
import { Sun, Moon, Search } from 'lucide-react'
import { playHapticClick } from '../lib/soundEffects'

interface WindowFrameProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  theme: ThemeMode
  onToggleTheme: () => void
  onOpenSpotlight: () => void
  onSelectProject: (project: Project) => void
  isFocusMode?: boolean
  isMinimized?: boolean
  isMinimizing?: boolean
  isRestoring?: boolean
  onMinimize?: () => void
  onFinishMinimize?: () => void
  onFinishRestore?: () => void
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  activeTab,
  onTabChange,
  theme,
  onToggleTheme,
  onOpenSpotlight,
  onSelectProject,
  isFocusMode = false,
  isMinimized = false,
  isMinimizing = false,
  isRestoring = false,
  onMinimize,
  onFinishMinimize,
  onFinishRestore,
}) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const isDark = theme === 'dark'

  const handleZoom = () => {
    playHapticClick()
    setIsMaximized((prev) => !prev)
  }

  // Fallback safety timers to ensure animation ends cleanly
  useEffect(() => {
    if (isMinimizing) {
      const timer = setTimeout(() => {
        onFinishMinimize?.()
      }, 560)
      return () => clearTimeout(timer)
    }
    if (isRestoring) {
      const timer = setTimeout(() => {
        onFinishRestore?.()
      }, 540)
      return () => clearTimeout(timer)
    }
  }, [isMinimizing, isRestoring, onFinishMinimize, onFinishRestore])

  if (isMinimized && !isMinimizing && !isRestoring) {
    return null
  }

  return (
    <div
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) {
          if (isMinimizing) onFinishMinimize?.()
          if (isRestoring) onFinishRestore?.()
        }
      }}
      className={`w-full relative ${
        isMaximized
          ? isFocusMode
            ? 'max-w-[calc(100vw-32px)] h-[calc(100vh-56px)]'
            : 'max-w-[calc(100vw-32px)] h-[calc(100vh-80px)]'
          : isFocusMode
          ? 'max-w-5xl h-[calc(100vh-64px)]'
          : 'max-w-5xl h-[calc(100vh-112px)]'
      } ${isDark ? 'dark-theme' : 'light-theme'} mx-auto my-auto flex flex-col apple-liquid-glass window-frame ${
        isMinimizing ? 'window-genie-minimizing' : ''
      } ${
        isRestoring ? 'window-genie-restoring' : ''
      } rounded-3xl overflow-hidden select-none
      max-md:fixed max-md:inset-0 max-md:w-full max-md:h-full max-md:h-[100dvh] max-md:max-w-none max-md:m-0 max-md:rounded-none max-md:border-0 max-md:shadow-none max-md:z-10`}
    >
      {/* Window Top Toolbar Header - Desktop Only */}
      <div
        onDoubleClick={(e) => {
          if ((e.target as HTMLElement).closest('button, a, input, [role="tab"]')) return
          handleZoom()
        }}
        className="h-13 px-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 shrink-0 relative max-md:hidden cursor-default"
      >
        {/* Left: Official Apple Traffic Lights & Window Title */}
        <div className="flex items-center space-x-3.5">
          <TrafficLights
            onClose={onMinimize}
            onMinimize={onMinimize}
            onZoom={handleZoom}
            isMaximized={isMaximized}
          />

          <div className="flex items-center space-x-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
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
      <main className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar text-zinc-900 dark:text-white max-md:px-4 max-md:pt-12 max-md:pb-24">
        {activeTab === 'projetos' && (
          <ProjectsTab onSelectProject={onSelectProject} theme={theme} />
        )}
        {activeTab === 'sobre' && <AboutTab theme={theme} />}
        {activeTab === 'habilidades' && <SkillsTab theme={theme} />}
        {activeTab === 'contato' && <ContactTab theme={theme} />}
      </main>

      {/* Window Status Bar Footer - Desktop Only */}
      <footer className="h-7 px-4 flex items-center justify-between border-t border-black/10 dark:border-white/15 text-[11px] text-zinc-600 dark:text-zinc-400 shrink-0 font-medium overflow-hidden max-md:hidden">
        <div className="flex items-center space-x-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] shrink-0" />
          <span className="truncate">macOS 26 Tahoe UI Kit • Liquid Glass</span>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <span className="hidden sm:inline">Pressione ⌘K para Spotlight</span>
          <span className="font-mono text-[10px] sm:text-[11px]">React 19 + Tailwind</span>
        </div>
      </footer>
    </div>
  )
}
