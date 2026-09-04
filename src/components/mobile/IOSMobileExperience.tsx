import React, { useState, useEffect } from 'react'
import {
  Wifi,
  Battery,
  CloudSun,
  MapPin,
  ExternalLink,
  X,
  FolderGit2,
  User,
  Send,
  Home,
  ArrowUpRight,
} from 'lucide-react'
import { GithubIcon } from '../icons/SocialIcons'
import type { ThemeMode, Project } from '../../types'
import { AboutTab } from '../tabs/AboutTab'
import { ContactTab } from '../tabs/ContactTab'
import { playHapticClick } from '../../lib/soundEffects'

interface IOSMobileExperienceProps {
  theme: ThemeMode
  onToggleTheme: () => void
  soundEffectsEnabled?: boolean
  onSelectProject?: (project: Project) => void
}

export const IOSMobileExperience: React.FC<IOSMobileExperienceProps> = ({
  theme,
  onToggleTheme,
  soundEffectsEnabled = true,
}) => {
  const [activeSheet, setActiveSheet] = useState<'about' | 'contact' | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('09:41')
  const [currentDateFormatted, setCurrentDateFormatted] = useState<string>('')
  const isDark = theme === 'dark'

  // Live iPhone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }
      const dateStr = now.toLocaleDateString('pt-BR', options)
      setCurrentDateFormatted(dateStr.toUpperCase())
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const triggerHaptic = () => {
    if (soundEffectsEnabled) {
      playHapticClick()
    }
  }

  const handleOpenSheet = (sheet: 'about' | 'contact') => {
    triggerHaptic()
    setActiveSheet(sheet)
  }

  const handleCloseSheet = () => {
    triggerHaptic()
    setActiveSheet(null)
  }

  const scrollToSection = (id: string) => {
    triggerHaptic()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen bg-[#f2f2f7] dark:bg-[#000000] text-zinc-900 dark:text-white pb-28 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* 1. iOS Dynamic Silk Wallpaper Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-60 transition-all duration-700 ${
            isDark ? 'bg-indigo-900/30' : 'bg-blue-300/40'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl opacity-50 transition-all duration-700 ${
            isDark ? 'bg-purple-900/30' : 'bg-pink-200/40'
          }`}
        />
        <div
          className={`absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-40 transition-all duration-700 ${
            isDark ? 'bg-cyan-900/20' : 'bg-sky-200/30'
          }`}
        />
      </div>

      {/* 2. iPhone Status Bar (Top Fixed) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-2.5 pb-2 flex items-center justify-between pointer-events-none select-none backdrop-blur-md bg-white/20 dark:bg-black/20 border-b border-black/5 dark:border-white/5">
        {/* Left: Clock */}
        <div className="w-16 flex items-center">
          <span className="font-semibold text-[14.5px] tracking-tight text-zinc-950 dark:text-white">
            {currentTime}
          </span>
        </div>

        {/* Center: Apple Dynamic Island */}
        <div
          onClick={onToggleTheme}
          className="pointer-events-auto h-7 w-28 bg-black dark:bg-[#121214] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-between px-2.5 cursor-pointer active:scale-95 transition-transform"
          title="Dynamic Island • Toque para alternar tema Claro/Escuro"
        >
          {/* Camera Lens */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#0a84ff]/60" />
          </div>

          {/* Active Sensor Glow */}
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-white/90 tracking-wider uppercase">
              {isDark ? 'DARK' : 'LIGHT'}
            </span>
          </div>
        </div>

        {/* Right: Cellular, Wi-Fi & Battery */}
        <div className="w-16 flex items-center justify-end space-x-1.5 text-zinc-900 dark:text-white">
          <div className="flex items-end space-x-0.5 h-3">
            <span className="w-0.5 h-1 bg-current rounded-full" />
            <span className="w-0.5 h-1.5 bg-current rounded-full" />
            <span className="w-0.5 h-2 bg-current rounded-full" />
            <span className="w-0.5 h-2.5 bg-current rounded-full" />
          </div>
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center">
            <Battery className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-14 px-4 space-y-5" id="topo">
        {/* 3. Bloco Superior de Widgets (Inspirado na Home Screen do iOS) */}
        <section className="grid grid-cols-2 gap-3 pt-2">
          {/* Widget 1: Clima (Recife, PE) */}
          <div className="backdrop-blur-2xl bg-white/70 dark:bg-[#1c1c1e]/70 border border-white/40 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.3)] rounded-[24px] p-4 flex flex-col justify-between select-none relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Recife
                </span>
                <span className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mt-0.5 block">
                  25°
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm">
                <CloudSun className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 block truncate">
                Predominantemente Limpo
              </span>
              <span className="text-[9.5px] text-zinc-500 dark:text-zinc-400 block font-mono">
                Máx: 29° • Mín: 23°
              </span>
            </div>
          </div>

          {/* Widget 2: Perfil do Desenvolvedor */}
          <div
            onClick={() => handleOpenSheet('about')}
            className="backdrop-blur-2xl bg-white/70 dark:bg-[#1c1c1e]/70 border border-white/40 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.3)] rounded-[24px] p-4 flex flex-col justify-between select-none cursor-pointer active:scale-98 transition-transform relative overflow-hidden"
          >
            <div className="flex items-center space-x-2.5">
              <div className="relative shrink-0">
                <img
                  src="/profile.jpg"
                  alt="Fábio Rodrigues"
                  className="w-10 h-10 rounded-2xl object-cover border border-white/50 dark:border-white/20 shadow-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#34c759] border-2 border-white dark:border-[#1c1c1e] animate-pulse" />
              </div>
              <div className="overflow-hidden">
                <h2 className="text-xs font-bold text-zinc-950 dark:text-white truncate">
                  Fábio Rodrigues
                </h2>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium block truncate">
                  Creative Technologist
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-zinc-600 dark:text-zinc-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-[#ff3b30]" /> Recife, PE
              </span>
              <span className="text-[9.5px] text-blue-600 dark:text-blue-400 font-semibold flex items-center">
                Ver Bio <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
              </span>
            </div>
          </div>
        </section>

        {/* 4. Feed de Projetos no Padrão App Store ("Hoje") */}
        <section className="space-y-3" id="projetos">
          {/* Header de Seção estilo iOS Hoje */}
          <div className="pt-2 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-mono">
              {currentDateFormatted || '4 DE SETEMBRO'}
            </span>
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
              Hoje
            </h2>
          </div>

          {/* CARD 1: PROJETO NOVA (Flagship Backend) */}
          <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                FLAGSHIP BACKEND
              </span>
              <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                Java 21 LTS
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                NOVA Enterprise Platform
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Plataforma corporativa de microsserviços sob rigorosa conformidade com a LGPD. Desenvolvida com Java 21, Spring Boot 3, persistência JPA e suíte de testes com JUnit 5.
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">99.99%</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Uptime</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">100%</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">LGPD</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">&lt; 45ms</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Latência</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://nova-control-center-alsl.onrender.com/"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#007aff] hover:bg-[#0071eb] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>TESTAR LGPD</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/fabiorodrigues-tech-dev/NOVA"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="py-2.5 px-4 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-zinc-900 dark:text-white text-xs font-bold flex items-center gap-1.5 border border-black/10 dark:border-white/10 active:scale-98 transition-transform"
                title="Repositório GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>CÓDIGO</span>
              </a>
            </div>
          </article>

          {/* CARD 2: PROJETO SOFIA (Voice AI) */}
          <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                VOICE AI ASSISTANT
              </span>
              <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                Vapi & ElevenLabs
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                SOFIA Voice AI Assistant
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Agente conversacional de voz ultra-realista com latência inferior a 600ms. Orquestrado via Vapi, ElevenLabs, OpenAI GPT-4o e webhooks assíncronos em tempo real.
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">&lt; 600ms</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Latência Voz</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">98.5%</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Acurácia</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">24/7</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Ativo</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7493208152142794754/"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#5856d6] hover:bg-[#4745c4] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>DEMO LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/fabiorodrigues-tech-dev"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="py-2.5 px-4 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-zinc-900 dark:text-white text-xs font-bold flex items-center gap-1.5 border border-black/10 dark:border-white/10 active:scale-98 transition-transform"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>
          </article>

          {/* CARD 3: UNREAL 5.2 (MetaHuman Vivian) */}
          <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                3D & METAHUMAN
              </span>
              <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                Unreal Engine 5.2
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                UNREAL 5.2 — MetaHuman Vivian
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Avatar digital fotorrealista integrado com iluminação global Lumen em tempo real, virtualização geométrica Nanite e materiais Quixel Megascans.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block">4K 60FPS</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Render Realtime</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Nanite</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Mesh Tech</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">Lumen GI</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Iluminação</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="https://drive.google.com/drive/folders/1AsF5mKlXNVl4OMfU4rnzychZqWkDMy63?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>VER GRAVAÇÃO E ASSETS (DRIVE)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* CARD 4: FUTUREPRINT SP (Infinit B2B) */}
          <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                B2B & PRODUÇÃO INDUSTRIAL
              </span>
              <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                Expo Center Norte, SP
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                FUTUREPRINT SP // INFINIT TECNOLOGIA
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Cobertura audiovisual oficial na maior feira da América Latina. Demonstração de maquinário industrial, captação 4K ProRes (60fps), lâminas comerciais e geração de +120 leads B2B qualificados.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">+120</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Leads B2B</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block">ProRes 60fps</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Captação 4K</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Same-Day</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Entrega Diária</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/infinit.sublimacao/"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>VER INSTAGRAM</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://drive.google.com/file/d/12XZ2AXfChOl-CMwwQnqybZ028MCq3ijt/view?usp=drivesdk"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>RELATÓRIO</span>
              </a>
            </div>
          </article>

          {/* CARD 5: MARKETING & AUDIOVISUAL (Collabs Recife Ordinário) */}
          <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                MARKETING & FILMMAKER
              </span>
              <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                Performance & Virais
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                MARKETING HUB — Inteligência Multicanal
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Campanhas orientadas a dados no Google Ads e Meta Ads com ROAS +185%, somadas a produções audiovisuais cinematográficas (incluindo collabs com @recifeordinario) editadas no Final Cut e masterizadas no Logic Pro.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">+185%</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">ROAS Médio</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">2.8M+</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Impressões</span>
              </div>
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">15+</span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Canais Ads</span>
              </div>
            </div>

            {/* Dual Action Buttons: Blue and Red Drives */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href="https://drive.google.com/drive/folders/1Mz7BoxVzmUnZd24H7n9zrvByGN_bzFxm?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>PORTFÓLIO MARKETING (DRIVE)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://drive.google.com/drive/folders/1fhmqNSZG9h7Tv4pFzqysuuBcIY4Sw-ri?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>PORTFÓLIO AUDIOVISUAL (DRIVE)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        </section>
      </main>

      {/* 5. Bottom Sheets Deslizantes do iOS (Sobre e Contato) */}
      {activeSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm"
            onClick={handleCloseSheet}
          />

          {/* Sheet Container */}
          <div
            className="relative z-10 w-full max-h-[88dvh] rounded-t-[32px] bg-[#f2f2f7]/95 dark:bg-[#12141c]/95 border-t border-white/40 dark:border-white/15 shadow-[0_-12px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl flex flex-col animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber Handle & Close Header */}
            <div className="pt-3 px-5 pb-2 flex items-center justify-between border-b border-black/5 dark:border-white/10 shrink-0">
              <div className="w-8" />
              <div className="w-10 h-1 rounded-full bg-black/25 dark:bg-white/30" />
              <button
                type="button"
                onClick={handleCloseSheet}
                className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-zinc-700 dark:text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar painel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content inside Sheet */}
            <div className="flex-1 overflow-y-auto p-4 pb-12">
              {activeSheet === 'about' && <AboutTab theme={theme} />}
              {activeSheet === 'contact' && <ContactTab theme={theme} />}
            </div>
          </div>
        </div>
      )}

      {/* 6. Dock Flutuante do iPhone (Fixed Bottom Tab Bar) */}
      <nav
        className="fixed bottom-5 left-4 right-4 max-w-sm mx-auto z-40 backdrop-blur-2xl bg-white/80 dark:bg-[#161822]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-full px-4 py-2 flex items-center justify-around select-none"
        aria-label="Navegação móvel"
      >
        <button
          type="button"
          onClick={() => scrollToSection('topo')}
          className="flex flex-col items-center justify-center p-1 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[9.5px] font-medium mt-0.5">Início</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('projetos')}
          className="flex flex-col items-center justify-center p-1 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          <FolderGit2 className="w-5 h-5" />
          <span className="text-[9.5px] font-medium mt-0.5">Projetos</span>
        </button>

        <button
          type="button"
          onClick={() => handleOpenSheet('about')}
          className={`flex flex-col items-center justify-center p-1 cursor-pointer active:scale-95 transition-all ${
            activeSheet === 'about'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[9.5px] font-medium mt-0.5">Sobre</span>
        </button>

        <button
          type="button"
          onClick={() => handleOpenSheet('contact')}
          className={`flex flex-col items-center justify-center p-1 cursor-pointer active:scale-95 transition-all ${
            activeSheet === 'contact'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <Send className="w-5 h-5" />
          <span className="text-[9.5px] font-medium mt-0.5">Contato</span>
        </button>
      </nav>

      {/* 7. Home Indicator da Apple (Fixed at bottom center) */}
      <div
        className="fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[134px] h-[4.5px] bg-black/40 dark:bg-white/40 rounded-full z-50 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}

export default IOSMobileExperience
