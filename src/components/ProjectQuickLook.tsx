import React from 'react'
import { ExternalLink, X } from 'lucide-react'
import { GithubIcon } from './icons/SocialIcons'
import type { Project, ThemeMode } from '../types'
import { ACCENT_COLORS } from '../data/accentColors'

interface ProjectQuickLookProps {
  project: Project | null
  onClose: () => void
  theme: ThemeMode
}

export const ProjectQuickLook: React.FC<ProjectQuickLookProps> = ({
  project,
  onClose,
  theme,
}) => {
  if (!project) return null

  const isDark = theme === 'dark'
  const accentDef = ACCENT_COLORS[project.accentColor]
  const accentHex = isDark ? accentDef.dark : accentDef.light

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Window */}
      <div
        className="w-full max-w-2xl bg-[#f5f6fa]/95 dark:bg-[#0c0d14]/95 backdrop-blur-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-black/10 dark:border-white/15 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Title and Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: accentHex }}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Visualização Rápida macOS (Quick Look)
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-zinc-900 dark:text-white"
            title="Fechar (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Visual Hero Banner with Liquid Glass Accent Gradient */}
          <div
            className={`w-full h-44 rounded-2xl bg-gradient-to-br ${project.imageGradient} p-6 flex flex-col justify-end relative overflow-hidden border border-black/10 dark:border-white/10`}
          >
            <div className="absolute top-4 right-4 flex space-x-2">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10"
                style={{ color: accentHex }}
              >
                {project.category.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight drop-shadow-sm">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Sobre a Arquitetura
            </h3>
            <p className="text-[14.5px] leading-relaxed text-zinc-900 dark:text-white">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Metrics Grid with Tahoe Accents */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Métricas & Desempenho
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/5 rounded-xl p-3 text-center transition-transform hover:scale-[1.02]"
                >
                  <div
                    className="text-xl font-bold tracking-tight"
                    style={{ color: accentHex }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2.5">
              Stack Tecnológica
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Specific Action Buttons (e.g. Marketing Hub Drive Portfolios) */}
          {project.actionButtons && project.actionButtons.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-black/10 dark:border-white/10">
              <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Acesso Direto aos Portfólios
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.actionButtons.map((btn, bIdx) => (
                  <a
                    key={bIdx}
                    href={btn.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 ${
                      btn.customClass
                        ? btn.customClass
                        : btn.variant === 'primary'
                        ? 'bg-[#007aff] text-white hover:bg-[#0062cc]'
                        : 'bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/15'
                    }`}
                  >
                    <span>{btn.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-2 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-black/10 dark:border-white/10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/20 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center space-x-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repositório</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center space-x-2 active:scale-95 ${
                  project.id === 'nova-enterprise'
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : project.id === 'sofia-voice-ai'
                    ? 'bg-purple-600 hover:bg-purple-500'
                    : ''
                }`}
                style={
                  project.id !== 'nova-enterprise' && project.id !== 'sofia-voice-ai'
                    ? { backgroundColor: accentHex }
                    : undefined
                }
              >
                <span>
                  {project.id === 'nova-enterprise'
                    ? 'Demo NOVA (LGPD)'
                    : project.id === 'sofia-voice-ai'
                    ? 'Demo SOFIA (Voice AI)'
                    : 'Acessar Case / Link Oficial'}
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
