import React from 'react'
import { Maximize2, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './icons/SocialIcons'
import type { Project } from '../types'
import { ACCENT_COLORS } from '../data/accentColors'

export interface ProjectCardProps {
  project: Project
  onSelectProject: (project: Project) => void
  isDark?: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  backend: 'Backend & LGPD',
  ai: 'Voice AI',
  '3d': 'Unreal 3D',
  b2b: 'FuturePrint B2B',
  marketing: 'Marketing Hub',
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  isDark = false,
}) => {
  const accentDef = ACCENT_COLORS[project.accentColor] || ACCENT_COLORS.blue
  const accentHex = isDark ? accentDef.dark : accentDef.light

  return (
    <article
      onClick={() => onSelectProject(project)}
      className="apple-liquid-glass rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer group flex flex-col justify-between relative overflow-hidden"
    >
      {/* Card Ambient Glow */}
      <div
        className={`absolute -right-16 -top-16 w-36 h-36 rounded-full bg-gradient-to-br ${project.imageGradient} blur-2xl opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity`}
      />

      <div>
        {/* Header: Category Badge & QuickLook trigger */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08]"
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
            className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/15 transition-colors opacity-70 group-hover:opacity-100"
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

        {/* Specific Action Buttons (e.g. Demo NOVA, Ação SOFIA, Repositório GitHub) */}
        {project.actionButtons && project.actionButtons.length > 0 && (
          <div
            className="flex flex-col sm:flex-row flex-wrap gap-2 my-3 pt-2 border-t border-black/10 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {project.actionButtons.map((btn, bIdx) => (
              <a
                key={bIdx}
                href={btn.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95 ${
                  btn.customClass
                    ? btn.customClass
                    : btn.variant === 'primary'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl'
                    : 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/15 font-bold px-4 py-2 rounded-xl'
                }`}
              >
                <span>{btn.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
              </a>
            ))}
          </div>
        )}

        {/* Project Metrics Display with Kit Accents */}
        <div className="grid grid-cols-3 gap-2 my-4">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-black/[0.03] dark:bg-white/[0.03] rounded-xl p-3 text-center"
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
      <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-100"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/[0.04] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
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
              className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/15 transition-colors"
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
}

export default ProjectCard
