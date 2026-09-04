import React from 'react'
import {
  Code2,
  TrendingUp,
  Box,
  Server,
  Video,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { SKILL_CATEGORIES } from '../../data/portfolioData'
import { ACCENT_COLORS } from '../../data/accentColors'
import type { ThemeMode } from '../../types'

interface SkillsTabProps {
  theme: ThemeMode
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <div className="space-y-6 pb-8">
      {/* Intro Header */}
      <div className="pb-2 border-b border-black/15 dark:border-white/10">
        <div className="flex items-center space-x-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#af52de]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4b5563] dark:text-[#8e8e93]">
            Matriz de Competências Técnicas
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Habilidades & Arquitetura
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
          Conjunto de tecnologias, padrões de design e ferramentas de alta eficiência dominadas ao longo de anos de desenvolvimento contínuo.
        </p>
      </div>

      {/* Categories Grid with Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const accentDef = ACCENT_COLORS[cat.accentColor] || ACCENT_COLORS.blue
          const accentHex = isDark ? accentDef.dark : accentDef.light

          return (
            <div
              key={idx}
              className="bg-white/80 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/10 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none p-5 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Specular Edge Glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ backgroundColor: accentHex }}
              />

              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10"
                    style={{ color: accentHex }}
                  >
                    {idx === 0 && <Code2 className="w-4 h-4" />}
                    {idx === 1 && <TrendingUp className="w-4 h-4" />}
                    {idx === 2 && <Box className="w-4 h-4" />}
                    {idx === 3 && <Server className="w-4 h-4" />}
                    {idx === 4 && <Video className="w-4 h-4" />}
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                      {cat.title}
                    </h2>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skills Progress List */}
                <div className="space-y-4 my-4">
                  {cat.skills.map((skill) => {
                    const skillAccent = ACCENT_COLORS[skill.accentColor] || ACCENT_COLORS.blue
                    const skillHex = isDark ? skillAccent.dark : skillAccent.light

                    return (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: skillHex }}
                            />
                            {skill.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400 font-medium">
                              {skill.tag}
                            </span>
                            <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Liquid Progress Bar */}
                        <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden p-[0.5px]">
                          <div
                            className="h-full rounded-full transition-all duration-1000 shadow-sm"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: skillHex,
                            }}
                          />
                        </div>

                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 pl-3 leading-tight">
                          {skill.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom tag indicator */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400">
                <span>Práticas de Desenvolvimento & Clean Code</span>
                <span className="flex items-center space-x-1 font-medium text-[#007aff] dark:text-[#0a84ff]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Nível Sênior / Staff</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Specialized Tooling Cards: 4 Compact Categories with Microbadges */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#ff9500]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Stack de Produtividade & Ferramentas no macOS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Categoria 1: Desenvolvimento & Stack Dev */}
          <div className="bg-white/90 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/10 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white">
              <Code2 className="w-3.5 h-3.5 text-[#007aff]" />
              <span>Desenvolvimento & Stack Dev</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Java 21 LTS',
                'Spring Boot 3',
                'JUnit 5',
                'TypeScript',
                'React 19 / Next.js',
                'Antigravity IDE',
                'RESTful APIs',
                'PostgreSQL',
                'Docker & OrbStack',
                'Cursor IDE',
                'IntelliJ IDEA',
                'Git/GitHub',
                'Vercel & Render Cloud',
                'Tailwind CSS',
                'Unreal Engine 5.2',
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-lg text-[10.5px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-100 border border-black/10 dark:border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Categoria 2: Audiovisual & Criativo */}
          <div className="bg-white/90 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/10 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white">
              <Video className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span>Audiovisual & Criativo</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Final Cut Pro',
                'Logic Pro (Sound Design)',
                'CapCut Pro',
                'DaVinci Resolve',
                'Figma',
                'Canva Pro',
                'Adobe Photoshop',
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-lg text-[10.5px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-100 border border-black/10 dark:border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Categoria 3: Marketing & Dados */}
          <div className="bg-white/90 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/10 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white">
              <TrendingUp className="w-3.5 h-3.5 text-[#34c759]" />
              <span>Marketing & Dados</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Google Ads',
                'Meta Ads Manager',
                'Google Analytics 4 (GA4)',
                'Looker Studio',
                'Google Tag Manager',
                'Excel Avançado',
                'ERP Qyon',
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-lg text-[10.5px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-100 border border-black/10 dark:border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Categoria 4: Hardware & Sistema */}
          <div className="bg-white/90 dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/10 rounded-2xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white">
              <Box className="w-3.5 h-3.5 text-[#af52de]" />
              <span>Hardware & Sistema</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'MacBook Air M1',
                'Câmera 4K ProRes (60fps)',
                'Ghostty & Zsh',
                'Apple macOS Sequoia/Tahoe',
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 rounded-lg text-[10.5px] font-medium bg-black/[0.04] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-100 border border-black/10 dark:border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
