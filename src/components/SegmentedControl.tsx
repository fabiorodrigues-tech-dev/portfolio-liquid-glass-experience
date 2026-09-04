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
      className="backdrop-blur-2xl backdrop-saturate-180 bg-black/5 dark:bg-white/[0.07] border border-black/10 dark:border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.15)] rounded-full p-1 flex items-center gap-1 transition-all select-none"
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
            className={`relative flex items-center space-x-1 sm:space-x-1.5 cursor-pointer outline-none ${
              isActive
                ? 'bg-white/95 text-zinc-950 dark:bg-white/20 dark:text-white backdrop-blur-md shadow-sm rounded-full px-4 py-1.5 font-semibold text-xs transition-all'
                : 'text-zinc-600 hover:text-zinc-950 dark:text-white/60 dark:hover:text-white rounded-full px-2.5 sm:px-4 py-1 sm:py-1.5 font-medium text-xs transition-colors'
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
