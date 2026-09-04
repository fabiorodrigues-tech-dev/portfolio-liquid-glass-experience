import React, { useState, useEffect, useMemo } from 'react'
import { Search, FolderGit2, Sparkles, User, Send, ArrowRight } from 'lucide-react'
import { PROJECTS_DATA, SKILL_CATEGORIES } from '../data/portfolioData'
import type { TabType, ThemeMode } from '../types'

interface SpotlightModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTab: (tab: TabType) => void
  onOpenProject?: (projectId: string) => void
  theme: ThemeMode
}

interface SearchItem {
  id: string
  title: string
  subtitle: string
  category: 'Projeto' | 'Habilidade' | 'Seção' | 'Contato'
  tab: TabType
  icon: React.ComponentType<{ className?: string }>
}

export const SpotlightModal: React.FC<SpotlightModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenProject,
}) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Build searchable index
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [
      { id: 'tab-projetos', title: 'Projetos em Destaque', subtitle: 'Ver portfólio completo de aplicações', category: 'Seção', tab: 'projetos', icon: FolderGit2 },
      { id: 'tab-sobre', title: 'Sobre o Desenvolvedor', subtitle: 'Trajetória, experiência e filosofia técnica', category: 'Seção', tab: 'sobre', icon: User },
      { id: 'tab-habilidades', title: 'Habilidades & Stack', subtitle: 'Frontend, WebGPU, Cloud e Design Systems', category: 'Seção', tab: 'habilidades', icon: Sparkles },
      { id: 'tab-contato', title: 'Fale Conosco / Contato', subtitle: 'Enviar mensagem direta ou agendar reunião', category: 'Seção', tab: 'contato', icon: Send },
    ]

    PROJECTS_DATA.forEach((p) => {
      items.push({
        id: `proj-${p.id}`,
        title: p.title,
        subtitle: `${p.subtitle} • ${p.tags.join(', ')}`,
        category: 'Projeto',
        tab: 'projetos',
        icon: FolderGit2,
      })
    })

    SKILL_CATEGORIES.forEach((cat) => {
      cat.skills.forEach((s) => {
        items.push({
          id: `skill-${s.name}`,
          title: s.name,
          subtitle: `${cat.title} • Nível ${s.level}%: ${s.description}`,
          category: 'Habilidade',
          tab: 'habilidades',
          icon: Sparkles,
        })
      })
    })

    return items
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 7)
    const lower = query.toLowerCase()
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    ).slice(0, 8)
  }, [allItems, query])

  // Handle keyboard shortcuts (Cmd+K, Escape, Enter, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open handled outside or toggled
        }
      }
      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          const item = filtered[selectedIndex]
          onSelectTab(item.tab)
          if (item.category === 'Projeto' && onOpenProject) {
            onOpenProject(item.id.replace('proj-', ''))
          }
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex, onClose, onSelectTab, onOpenProject])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 md:pt-24 px-3 md:px-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      {/* Spotlight Window - Frosted Glass Container */}
      <div
        className="w-full max-w-xl rounded-2xl bg-[#f5f6fa]/95 dark:bg-[#0c0d14]/95 backdrop-blur-2xl p-3 shadow-2xl animate-in zoom-in-95 duration-150 overflow-hidden border border-black/15 dark:border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10">
          <Search className="w-5 h-5 text-[#007aff]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Spotlight: busque projetos, tecnologias, bio..."
            autoFocus
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-zinc-900 dark:text-white font-medium"
          />
          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/15 text-zinc-600 dark:text-zinc-400 font-semibold">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="mt-2.5 max-h-72 overflow-y-auto space-y-1 pr-0.5">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex
              const IconComp = item.icon

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.tab)
                    if (item.category === 'Projeto' && onOpenProject) {
                      onOpenProject(item.id.replace('proj-', ''))
                    }
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-[#007aff] text-white shadow-sm'
                      : 'hover:bg-black/5 dark:hover:bg-white/10 text-zinc-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-black/5 dark:bg-white/10 text-[#007aff]'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[13px] font-bold truncate leading-tight">
                        {item.title}
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isSelected ? 'text-white/85' : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'opacity-100' : 'opacity-40'
                      }`}
                    />
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/15 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 px-2 font-medium">
          <span>Navegue com as setas ↑ ↓ e pressione Enter</span>
          <span className="font-mono">macOS Tahoe Spotlight</span>
        </div>
      </div>
    </div>
  )
}
