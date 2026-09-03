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
      className="apple-segmented-container inline-flex items-center relative select-none"
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
            className={`relative flex items-center space-x-1.5 px-3 py-1 text-[13px] font-medium transition-all duration-200 rounded-full cursor-default outline-none ${
              isActive
                ? 'apple-segmented-active'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-current' : 'opacity-70'}`} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
