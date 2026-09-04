import React, { useState, useMemo } from 'react'
import { ProjectCard } from '../ProjectCard'
import type { Project, ThemeMode } from '../../types'
import { PROJECTS_DATA } from '../../data/portfolioData'

interface ProjectsTabProps {
  onSelectProject: (project: Project) => void
  theme: ThemeMode
}

type FilterCategory = 'todos' | 'backend' | 'ai' | '3d' | 'b2b' | 'marketing'

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ onSelectProject, theme }) => {
  const [filter, setFilter] = useState<FilterCategory>('todos')
  const isDark = theme === 'dark'

  const filteredProjects = useMemo(() => {
    if (filter === 'todos') return PROJECTS_DATA
    return PROJECTS_DATA.filter((p) => p.category === filter)
  }, [filter])

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner & Section Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-black/10 dark:border-white/10">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#007aff] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              PORTFÓLIO DE DESENVOLVIMENTO DE SOFTWARE & DESIGN
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Projetos Selecionados
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
            Cases corporativos reais: microsserviços em Java 21, inteligência conversacional por voz, renderização 3D em tempo real e infraestrutura de alta conversão.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="apple-liquid-glass rounded-full p-1 flex flex-wrap gap-1 self-start md:self-auto select-none">
          {(
            [
              { id: 'todos', label: 'Todos' },
              { id: 'backend', label: 'Backend' },
              { id: 'ai', label: 'IA' },
              { id: '3d', label: '3D' },
              { id: 'b2b', label: 'B2B' },
              { id: 'marketing', label: 'Marketing' },
            ] as const
          ).map((item) => {
            const isActive = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id as FilterCategory)}
                className={`relative px-4 py-1.5 text-xs rounded-full cursor-pointer outline-none transition-all duration-300 ease-out ${
                  isActive
                    ? 'bg-white/95 text-zinc-950 dark:bg-white/20 dark:text-white font-bold shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-white/60 dark:hover:text-white font-medium'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelectProject={onSelectProject}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  )
}

