import React, { useState, useMemo } from 'react'
import { Maximize2, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../icons/SocialIcons'
import type { Project, ThemeMode } from '../../types'
import { PROJECTS_DATA } from '../../data/portfolioData'
import { ACCENT_COLORS } from '../../data/accentColors'

interface ProjectsTabProps {
  onSelectProject: (project: Project) => void
  theme: ThemeMode
}

type FilterCategory = 'todos' | 'backend' | 'ai' | '3d' | 'b2b' | 'marketing'

const CATEGORY_LABELS: Record<string, string> = {
  backend: 'Backend & LGPD',
  ai: 'Voice AI',
  '3d': 'Unreal 3D',
  b2b: 'FuturePrint B2B',
  marketing: 'Marketing Hub',
}

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
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 self-start md:self-auto">
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
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'apple-segmented-active shadow-sm font-semibold text-zinc-900 dark:text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
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
        {filteredProjects.map((project) => {
          const accentDef = ACCENT_COLORS[project.accentColor] || ACCENT_COLORS.blue
          const accentHex = isDark ? accentDef.dark : accentDef.light

          return (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Ambient Glow */}
              <div
                className={`absolute -right-16 -top-16 w-36 h-36 rounded-full bg-gradient-to-br ${project.imageGradient} blur-2xl opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity`}
              />

              <div>
                {/* Header: Category Badge & QuickLook trigger */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10"
                    style={{ color: accentHex }}
                  >
                    {CATEGORY_LABELS[project.category] || project.category.toUpperCase()}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectProject(project)
                    }}
                    className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors opacity-70 group-hover:opacity-100"
                    title="Visualização Rápida (Espaço)"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                  </button>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-[#007aff] transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-0.5">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-[12.5px] leading-relaxed text-zinc-800 dark:text-zinc-100 mt-2.5">
                  {project.description}
                </p>

                {/* Specific Action Buttons (e.g. Drive Portfolios for Marketing Hub) */}
                {project.actionButtons && project.actionButtons.length > 0 && (
                  <div
                    className="flex flex-col gap-1.5 my-3 pt-2 border-t border-black/10 dark:border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.actionButtons.map((btn, bIdx) => (
                      <a
                        key={bIdx}
                        href={btn.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-[10.5px] font-bold tracking-wide transition-all shadow-sm active:scale-95 ${
                          btn.customClass
                            ? btn.customClass
                            : btn.variant === 'primary'
                            ? 'bg-[#007aff] text-white hover:bg-[#0062cc]'
                            : 'bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/15'
                        }`}
                      >
                        <span>{btn.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1 shrink-0" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Project Metrics Display with Kit Accents */}
                <div className="grid grid-cols-3 gap-2 my-4">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-xl p-2 text-center"
                    >
                      <div
                        className="text-sm font-bold tracking-tight"
                        style={{ color: accentHex }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 mt-0.5 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech Tags & Links */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2 mt-auto">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-100"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors text-zinc-900 dark:text-white"
                      title="GitHub / Repositório"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-white shadow-sm transition-transform active:scale-95"
                      style={{ backgroundColor: accentHex }}
                      title="Abrir Link / Detalhes"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
