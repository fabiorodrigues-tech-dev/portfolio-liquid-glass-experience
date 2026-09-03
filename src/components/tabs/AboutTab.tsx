import React from 'react'
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Code2,
  TrendingUp,
  Building2,
  Sparkles,
  Video,
} from 'lucide-react'
import { EXPERIENCE_DATA } from '../../data/portfolioData'
import { ACCENT_COLORS } from '../../data/accentColors'
import type { ThemeMode } from '../../types'

interface AboutTabProps {
  theme: ThemeMode
}

export const AboutTab: React.FC<AboutTabProps> = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Profile Card */}
      <div className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden">
        {/* Specular Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#007aff]/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-5">
            {/* Real Profile Photo */}
            <div className="relative">
              <img
                src="/profile.jpg"
                alt="Fábio Rodrigues"
                className="w-16 h-16 rounded-2xl object-cover border border-black/10 dark:border-white/20 shadow-md"
              />
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#34c759] border-2 border-white dark:border-[#161822] shadow-sm animate-pulse"
                title="Status: Disponível para Contratação"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Fábio Rodrigues
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#007aff] dark:text-[#0a84ff]">
                  Founder & Full Stack Dev
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-0.5">
                Bacharel em Design (UniFBV) • Software Architect • Filmmaker & Social Media
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ff3b30]" />
                  <span>Recife - PE, Brasil (Atuação Remota & Global)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#007aff]" />
                  <span>UniFBV Wyden (Design)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 px-3.5 py-2 rounded-2xl self-start md:self-auto flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34c759] animate-pulse" />
            <div>
              <div className="text-[11px] font-semibold text-zinc-900 dark:text-white">
                Disponível para Projetos
              </div>
              <div className="text-[10px] text-zinc-600 dark:text-zinc-400">
                Desenvolvimento, Audiovisual & Mídia
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Bio */}
        <div className="mt-5 pt-5 border-t border-black/10 dark:border-white/10 text-[13.5px] leading-relaxed text-zinc-800 dark:text-zinc-100 space-y-3">
          <p>
            Baseado em <strong>Recife - PE</strong>, sou <strong>Bacharel em Design pela UniFBV</strong> e fundador da <strong>Wolf Agency</strong>. Minha atuação combina desenvolvimento de software distribuído, direção criativa audiovisual de alto impacto e governança de operações digitais escaláveis.
          </p>
          <p>
            Na produção audiovisual, atuo diretamente com <strong>Captação 4K ProRes (60fps)</strong>, edição diária <strong>same-day</strong> para timing de mercado, roteirização com foco estrito em retenção para <strong>Reels e TikTok</strong> e <strong>sound design imersivo no Logic Pro</strong>. Como desenvolvedor full stack, domino desde microsserviços em <strong>Java 21 com conformidade LGPD</strong> e agentes autônomos de voz por IA até gestão de tráfego multicanal de alto retorno.
          </p>
        </div>
      </div>

      {/* Divisão Clara de Competências: 4 Pilares Estratégicos */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3 px-1 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#007aff]" />
          <span>Pilares de Atuação Estratégica</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Pilar 1: Desenvolvimento Full Stack */}
          <div className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4.5 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-[#007aff] flex items-center justify-center mb-2">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Desenvolvimento Full Stack
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                Arquitetura de microsserviços em <strong>Java 21 e Spring Boot 3</strong>, conformidade com a <strong>LGPD</strong>, frontend reativo em <strong>React 19 & Next.js</strong> e agentes de <strong>Voice AI</strong> (Vapi/WebSockets).
              </p>
            </div>
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#007aff]">Java 21</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#007aff]">Spring Boot</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#007aff]">Voice AI</span>
            </div>
          </div>

          {/* Pilar 2: Audiovisual, Edição & Social Media */}
          <div className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4.5 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-[#ff2d55] flex items-center justify-center mb-2">
                <Video className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Audiovisual & Filmmaker
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                <strong>Captação 4K ProRes (60fps)</strong>, edição dinâmica <strong>same-day</strong> em Final Cut/CapCut Pro, roteirização com alta retenção para <strong>Reels/TikTok</strong> e sound design no <strong>Logic Pro</strong>.
              </p>
            </div>
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#ff2d55]">Captação 4K</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#ff2d55]">Final Cut Pro</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#ff2d55]">Logic Pro</span>
            </div>
          </div>

          {/* Pilar 3: Mídia, Performance & Branding */}
          <div className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4.5 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-[#34c759] flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Mídia & Performance
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                Gestão de <strong>tráfego pago em escala (Meta & Google Ads)</strong> com ROAS comprovado, direção de arte fundamentada no <strong>Design UniFBV</strong> e copywriting persuasivo.
              </p>
            </div>
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#34c759]">Meta Ads</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#34c759]">Google Ads</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#34c759]">ROAS & CAC</span>
            </div>
          </div>

          {/* Pilar 4: Gestão & Rotinas Administrativas */}
          <div className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4.5 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-[#af52de] flex items-center justify-center mb-2">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Wolf Agency & Gestão
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">
                <strong>Rotinas administrativas e financeiras completas</strong> na Wolf Agency: planejamento orçamentário, fechamento B2B, governança de equipe e orquestração de entregas.
              </p>
            </div>
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#af52de]">Wolf Agency</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#af52de]">Finanças</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#af52de]">B2B Deals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trajetória Profissional */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3 px-1 flex items-center space-x-2">
          <Briefcase className="w-4 h-4" />
          <span>Trajetória & Experiência Profissional</span>
        </h2>

        <div className="space-y-3">
          {EXPERIENCE_DATA.map((item) => {
            const accentDef = ACCENT_COLORS[item.accentColor] || ACCENT_COLORS.blue
            const accentHex = isDark ? accentDef.dark : accentDef.light

            return (
              <div
                key={item.id}
                className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-5 transition-all hover:translate-x-1"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      {item.role}
                    </h3>
                    <div className="text-xs font-semibold text-[#007aff] dark:text-[#0a84ff]">
                      {item.company} • <span className="text-zinc-600 dark:text-zinc-400 font-normal">{item.type}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-100 self-start md:self-auto font-medium">
                    {item.period}
                  </span>
                </div>

                <p className="text-[13px] text-zinc-800 dark:text-zinc-100 leading-relaxed my-2.5">
                  {item.description}
                </p>

                {/* Key Achievements Bullet points */}
                <ul className="space-y-1.5 my-3">
                  {item.achievements.map((ach, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start space-x-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: accentHex }}
                      />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/10 dark:border-white/10">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
