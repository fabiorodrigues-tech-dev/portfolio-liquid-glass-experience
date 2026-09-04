import React from 'react'
import { FolderGit2, User, Sparkles, Send } from 'lucide-react'
import type { TabType } from '../types'

interface SegmentedControlProps {
  activeTab: TabType
  onChange: (tab: TabType) => void
}

interface TabOption {
  id: TabType
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const TABS: TabOption[] = [
  { id: 'projetos', label: 'Projetos', icon: FolderGit2 },
  { id: 'sobre', label: 'Sobre', icon: User },
  { id: 'habilidades', label: 'Habilidades', icon: Sparkles },
  { id: 'contato', label: 'Contato', icon: Send },
]

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ activeTab, onChange }) => {
  return (
    <div
      className="apple-liquid-glass rounded-full p-1 flex items-center gap-1 select-none"
      role="tablist"
      aria-label="Navegação de seções"
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        const IconComponent = tab.icon

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs rounded-full cursor-pointer outline-none transition-all duration-300 ease-out ${
              isActive
                ? 'bg-white/95 text-zinc-950 dark:bg-white/20 dark:text-white font-bold shadow-sm'
                : 'text-zinc-600 hover:text-zinc-950 dark:text-white/60 dark:hover:text-white font-medium'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-current' : 'opacity-70'}`} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
