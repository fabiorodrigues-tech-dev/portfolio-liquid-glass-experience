import React, { useState, useEffect, useRef } from 'react'
import {
  CloudSun,
  MapPin,
  ExternalLink,
  X,
  FolderGit2,
  User,
  Send,
  Home,
  ArrowUpRight,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Sparkles,
  Music,
  Check,
  Copy,
  Mail,
  Briefcase,
  Code2,
  TrendingUp,
  Video,
  Wrench,
} from 'lucide-react'
import { GithubIcon, WhatsAppIcon } from '../icons/SocialIcons'
import { AppleControlCenterIcon } from '../icons/ControlCenterIcon'
import type { ThemeMode, Project, AccentColor } from '../../types'
import { PRIMARY_ACCENT_KEYS, ACCENT_COLORS } from '../../data/accentColors'
import { playHapticClick } from '../../lib/soundEffects'

interface IOSMobileExperienceProps {
  theme: ThemeMode
  onToggleTheme: () => void
  accentColor: AccentColor
  onChangeAccent: (color: AccentColor) => void
  isFocusMode: boolean
  onToggleFocusMode: () => void
  isPlayingMusic: boolean
  onTogglePlayMusic: () => void
  soundVolume: number
  onChangeVolume: (vol: number) => void
  onSkipTrack: () => void
  soundEffectsEnabled?: boolean
  onSelectProject?: (project: Project) => void
}

type MobileTab = 'inicio' | 'projetos' | 'sobre' | 'habilidades' | 'contato'

export const IOSMobileExperience: React.FC<IOSMobileExperienceProps> = ({
  theme,
  onToggleTheme,
  accentColor,
  onChangeAccent,
  isFocusMode,
  onToggleFocusMode,
  isPlayingMusic,
  onTogglePlayMusic,
  soundVolume,
  onChangeVolume,
  onSkipTrack,
  soundEffectsEnabled = true,
}) => {
  // Navigation tab state (Full-screen native scroll views)
  const [activeTab, setActiveTab] = useState<MobileTab>('inicio')

  // Modals & Overlays
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isExpandedPlayerOpen, setIsExpandedPlayerOpen] = useState(false)

  // Real-time iPhone clock & date
  const [currentTime, setCurrentTime] = useState<string>('19:30')
  const [currentDateFormatted, setCurrentDateFormatted] = useState<string>('')

  // Screen Brightness (60% - 100%)
  const [brightness, setBrightness] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_brightness')
      return saved ? Math.max(50, Math.min(100, Number(saved))) : 100
    }
    return 100
  })

  // Contact form states
  const [emailCopied, setEmailCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const isDark = theme === 'dark'
  const isDraggingBrightnessRef = useRef(false)
  const isDraggingVolumeRef = useRef(false)

  // Clock updater
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

  // Sync brightness to HTML root element
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness}%)`
  }, [brightness])

  const triggerHaptic = () => {
    if (soundEffectsEnabled) {
      playHapticClick()
    }
  }

  const handleTabSelect = (tab: MobileTab) => {
    triggerHaptic()
    setActiveTab(tab)
    // Scroll container back to top
    const container = document.getElementById('mobile-scroll-container')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCopyEmail = () => {
    triggerHaptic()
    navigator.clipboard.writeText('fabioandre777@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2500)
  }

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    triggerHaptic()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setFormSubmitted(false)
    }, 4000)
  }

  // Interactive Brightness Slider Drag Handler
  const handleBrightnessPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const pct = Math.round(100 - (y / rect.height) * 100)
    const clamped = Math.max(50, Math.min(100, pct))
    setBrightness(clamped)
    localStorage.setItem('macos_brightness', String(clamped))
  }

  // Interactive Volume Slider Drag Handler
  const handleVolumePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const pct = Math.round(100 - (y / rect.height) * 100)
    const clamped = Math.max(0, Math.min(100, pct))
    onChangeVolume(clamped)
  }

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#f2f2f7] dark:bg-[#000000] text-zinc-900 dark:text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* 1. iOS Dynamic Ambient Silk Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-50 transition-all duration-700 ${
            isDark ? 'bg-indigo-900/35' : 'bg-blue-300/40'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40 transition-all duration-700 ${
            isDark ? 'bg-purple-900/35' : 'bg-pink-200/40'
          }`}
        />
        <div
          className={`absolute bottom-16 left-6 w-72 h-72 rounded-full blur-3xl opacity-35 transition-all duration-700 ${
            isDark ? 'bg-cyan-900/25' : 'bg-sky-200/35'
          }`}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. LIMPEZA DA BARRA DE STATUS DO TOPO (REQUISITO 1)                       */}
      {/* Removido: Câmera, sinal de rede, Wi-Fi, bateria e Home Indicator.         */}
      {/* Mantido: Relógio em tempo real, Dynamic Island e Central de Controle.    */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 px-5 pt-3 pb-2 flex items-center justify-between select-none backdrop-blur-xl bg-white/40 dark:bg-black/40 border-b border-black/5 dark:border-white/5">
        {/* Esquerda: Relógio em tempo real ("19:30") */}
        <div className="w-16 flex items-center">
          <span className="font-semibold text-sm tracking-tight text-zinc-950 dark:text-white">
            {currentTime}
          </span>
        </div>

        {/* Centro: Dynamic Island discreta em pílula preta */}
        <div
          onClick={() => {
            triggerHaptic()
            if (isPlayingMusic) {
              setIsExpandedPlayerOpen(true)
            } else {
              onToggleTheme()
            }
          }}
          className="h-7 w-28 bg-black dark:bg-[#121214] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/15 flex items-center justify-center px-2.5 cursor-pointer active:scale-95 transition-transform"
          title="Dynamic Island • Toque para abrir Player / alternar tema"
        >
          {isPlayingMusic ? (
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-white tracking-wider truncate">
                Lofi ♫
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[9px] font-mono font-bold text-white/90 tracking-wider">
                iOS 26
              </span>
            </div>
          )}
        </div>

        {/* Direita: Botão da Central de Controle com ícone oficial de 2 toggles */}
        <div className="w-16 flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              triggerHaptic()
              setIsControlCenterOpen(true)
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            title="Abrir Central de Controle"
            aria-label="Central de Controle"
          >
            <AppleControlCenterIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. NAVEGAÇÃO POR ABAS EM TELA CHEIA (REQUISITO 4)                         */}
      {/* h-full overflow-y-auto pb-32 sem modais espremidos                       */}
      {/* ========================================================================= */}
      <main
        id="mobile-scroll-container"
        className="relative z-10 w-full h-full pt-14 pb-32 overflow-y-auto scroll-smooth px-4 space-y-4"
      >
        {/* ----------------------------------------------------------------------- */}
        {/* ABA 01: INÍCIO (Widgets de Clima, Foto de Perfil & Apresentação)        */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'inicio' && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            {/* Grid Superior de Widgets */}
            <section className="grid grid-cols-2 gap-3">
              {/* Widget 1: Clima (Recife 25°) */}
              <div className="backdrop-blur-2xl bg-white/70 dark:bg-[#1c1c1e]/75 border border-white/40 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.3)] rounded-[24px] p-4 flex flex-col justify-between select-none relative overflow-hidden group">
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

              {/* Widget 2: Foto de Perfil & Status */}
              <div
                onClick={() => handleTabSelect('sobre')}
                className="backdrop-blur-2xl bg-white/70 dark:bg-[#1c1c1e]/75 border border-white/40 dark:border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.3)] rounded-[24px] p-4 flex flex-col justify-between select-none cursor-pointer active:scale-98 transition-transform relative overflow-hidden"
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

            {/* Cartão de Apresentação Executiva */}
            <section className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  APRESENTAÇÃO EXECUTIVA
                </span>
                <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                  macOS 26 / iOS 26
                </span>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Fábio Rodrigues
                </h1>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  Full Stack Developer • Founder Wolf Agency • Bacharel em Design (UniFBV)
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                  Convergência entre arquitetura de microsserviços corporativos de alta performance (Java 21, Spring Boot 3, LGPD, React 19) e liderança em direção de arte, inteligência de tráfego de alta escala e captação audiovisual 4K ProRes (60fps).
                </p>
              </div>

              {/* Grid de Métricas Chave */}
              <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
                <div className="p-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">99.99%</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Uptime Dev</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">&gt; 185%</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">ROAS Médio</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">4K 60fps</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Captação</span>
                </div>
              </div>

              {/* Botões de Ação Rápida */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleTabSelect('projetos')}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#007aff] hover:bg-[#0071eb] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform cursor-pointer"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>EXPLORAR PROJETOS</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSelect('contato')}
                  className="py-3 px-4 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-zinc-900 dark:text-white text-xs font-bold flex items-center gap-1.5 border border-black/10 dark:border-white/10 active:scale-98 transition-transform cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>CONTATO</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* ABA 02: PROJETOS (Feed Vertical Completo no Padrão App Store "Hoje")   */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'projetos' && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-mono">
                {currentDateFormatted || '4 DE SETEMBRO'}
              </span>
              <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                Hoje • Projetos em Destaque
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
                  SOFIA — Agente Conversacional de Voz
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  Agente de voz inteligente operando pipelines de áudio com baixa latência (&lt; 700ms), integração de LLMs para conversas humanizadas e qualificação de leads comerciais.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">&lt; 700ms</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Resposta</span>
                </div>
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Real-time</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Streaming</span>
                </div>
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">B2B</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Qualificação</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:activity:7493208152142794754/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
                >
                  <span>DEMO SOFIA (VOICE AI)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://github.com/fabiorodrigues-tech-dev"
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

            {/* CARD 3: UNREAL 5.2 — METAHUMAN VIVIAN */}
            <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  REAL-TIME 3D
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
                  Avatar digital fotorrealista integrado na Unreal Engine 5.2 com iluminação Lumen dinâmica em tempo real, virtualização geométrica com Nanite e texturas Quixel Megascans.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block">4K 60FPS</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Resolução</span>
                </div>
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Nanite</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Geometria</span>
                </div>
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">Lumen</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Iluminação</span>
                </div>
              </div>

              <a
                href="https://drive.google.com/drive/folders/1AsF5mKlXNVl4OMfU4rnzychZqWkDMy63?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span>DEMO VIVIAN (DRIVE)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </article>

            {/* CARD 4: FUTUREPRINT SP 2026 // INFINIT TECNOLOGIA */}
            <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  AUDIOVISUAL & B2B
                </span>
                <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                  FuturePrint 2026 SP
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Infinit Tecnologia — FuturePrint SP
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  Cobertura audiovisual oficial na maior feira da América Latina (Expo Center Norte). Demonstrações de maquinário industrial, captação 4K ProRes (60fps), entrega same-day e +120 leads B2B.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">+120</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Leads B2B</span>
                </div>
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-red-500 block">4K 60fps</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">ProRes</span>
                </div>
                <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Same-Day</span>
                  <span className="text-[9px] text-zinc-500 dark:text-zinc-400 block">Entrega</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href="https://www.instagram.com/infinit.sublimacao/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
                >
                  <span>INSTAGRAM INSTITUCIONAL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://drive.google.com/file/d/12XZ2AXfChOl-CMwwQnqybZ028MCq3ijt/view?usp=drivesdk"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
                >
                  <span>RELATÓRIO EXECUTIVO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>

            {/* CARD 5: WOLF AGENCY & PORTFÓLIOS AUDIOVISUAL/MARKETING */}
            <article className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  DIREÇÃO DE MÍDIA & FILMMAKER
                </span>
                <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                  Wolf Agency
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Wolf Agency — Tráfego & Audiovisual
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  Liderança e operação executiva. Gestão de tráfego pago em escala (Meta & Google Ads, ROAS &gt; 185%), direção e edição de vídeos verticais no Final Cut Pro e masterização sonora no Logic Pro.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href="https://drive.google.com/drive/folders/1Mz7BoxVzmUnZd24H7n9zrvByGN_bzFxm?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
                >
                  <span>PORTFÓLIO MARKETING (DRIVE)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1fhmqNSZG9h7Tv4pFzqysuuBcIY4Sw-ri?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
                >
                  <span>PORTFÓLIO AUDIOVISUAL (DRIVE)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* ABA 03: SOBRE (Trajetória, UniFBV, Fundação Wolf Agency e Dev vs MKT)   */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'sobre' && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                Biografia & Filosofia
              </span>
              <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                Sobre Fábio Rodrigues
              </h2>
            </div>

            {/* Perfil Header Card */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3.5">
              <div className="flex items-center space-x-3.5">
                <div className="relative shrink-0">
                  <img
                    src="/profile.jpg"
                    alt="Fábio Rodrigues"
                    className="w-16 h-16 rounded-2xl object-cover border border-black/10 dark:border-white/20 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#34c759] border-2 border-white dark:border-[#1c1c1e] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    Fábio Rodrigues
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Creative Technologist & Full Stack Developer
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#ff3b30]" /> Recife — PE, Brasil (Remoto Global)
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
                Bacharel em Design pela <strong>Faculdade Boa Viagem (UniFBV)</strong> com foco estrito em Ergonomia Cognitiva, UX/UI e Semiótica. Fundador da <strong>Wolf Agency</strong>, unindo engenharia de software distribuído e tração comercial de alto crescimento.
              </p>
            </div>

            {/* SEPARAÇÃO: DEV VS MKT (Requisito Explícito) */}
            <div className="grid grid-cols-1 gap-3">
              {/* Vertente Dev */}
              <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-blue-500/30 dark:border-blue-500/20 shadow-sm rounded-[24px] p-4 space-y-2">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <Code2 className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Vertente 01 • Engenharia & Software (Dev)
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Microsserviços robustos em <strong>Java 21</strong> e <strong>Spring Boot 3</strong> com conformidade estrita com a <strong>LGPD</strong>, frontend reativo com <strong>React 19</strong>, <strong>Angular</strong>, <strong>Next.js</strong> e <strong>TypeScript</strong>, além de agentes autônomos com <strong>Google Antigravity</strong> e Voice AI em tempo real.
                </p>
              </div>

              {/* Vertente MKT & Audiovisual */}
              <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-pink-500/30 dark:border-pink-500/20 shadow-sm rounded-[24px] p-4 space-y-2">
                <div className="flex items-center space-x-2 text-pink-600 dark:text-pink-400">
                  <TrendingUp className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Vertente 02 • Marketing & Audiovisual (MKT)
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Gestão avançada de tráfego pago (Meta Ads & Google Ads) com <strong>ROAS &gt; 185%</strong>, captação <strong>4K ProRes (60fps)</strong>, edição ágil no <strong>Final Cut Pro</strong> e <strong>DaVinci Resolve</strong>, sound design no <strong>Logic Pro</strong> e direção de marca de alta conversão.
                </p>
              </div>
            </div>

            {/* Linha do Tempo Profissional */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-4">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-zinc-500" />
                Trajetória Profissional
              </h3>

              <div className="space-y-3.5 border-l-2 border-zinc-200 dark:border-white/10 pl-3.5 ml-1">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                    2026 — ATUAL
                  </span>
                  <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                    Infinit Tecnologia • Comunicação Visual & Criação Multimídia
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                    FuturePrint 2026 SP (Expo Center Norte). Demonstrações de maquinário industrial, captação 4K 60fps e +120 leads B2B.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    JAN/2025 — JUN/2025
                  </span>
                  <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                    Wolf Agency • Sócio-Proprietário & Diretor de Mídia
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Fundação da agência, gestão de tráfego de escala com ROAS &gt; 185%, elaboração de contratos comerciais e produção audiovisual.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">
                    JUL/2025 — DEZ/2025
                  </span>
                  <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                    Unigames • Consultor de Conteúdo & Customer Seller
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                    CRM, CX (Customer Experience) e vendas diretas com alta retenção em canais digitais.
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-pink-600 dark:text-pink-400">
                    FORMAÇÃO SUPERIOR
                  </span>
                  <h4 className="text-xs font-bold text-zinc-950 dark:text-white">
                    Faculdade Boa Viagem (UniFBV) • Bacharelado em Design
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Ergonomia Cognitiva, UX/UI, Semiótica e Design Systems no padrão Apple Human Interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* ABA 04: HABILIDADES (Stack Dev com Angular/Antigravity, Audiovisual)    */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'habilidades' && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">
                Matriz de Competências
              </span>
              <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                Habilidades Técnicas
              </h2>
            </div>

            {/* Bloco 1: Stack Dev & Engenharia */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Code2 className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  1. Stack Dev & Engenharia de Software
                </h3>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Arquitetura de sistemas distribuídos, microsserviços, inteligência artificial e interfaces reativas.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Angular',
                  'Google Antigravity',
                  'Java 21 LTS',
                  'Spring Boot 3',
                  'React 19',
                  'TypeScript',
                  'Node.js',
                  'Next.js',
                  'Voice AI (Vapi / ElevenLabs)',
                  'PostgreSQL',
                  'Docker & CI/CD',
                  'Conformidade LGPD',
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bloco 2: Audiovisual & Filmmaker */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3">
              <div className="flex items-center space-x-2 text-pink-600 dark:text-pink-400">
                <Video className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  2. Audiovisual & Filmmaker
                </h3>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Captação cinematográfica 4K, edição same-day, roteirização com alta retenção e pós-produção de áudio.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Final Cut Pro',
                  'DaVinci Resolve',
                  'Logic Pro (Masterização)',
                  'Captação 4K ProRes (60fps)',
                  'CapCut Pro',
                  'Roteirização para Redes',
                  'Food Appeal Gastronômico',
                  'Iluminação Cênica',
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bloco 3: Marketing & Performance */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  3. Marketing & Performance (Growth)
                </h3>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Gestão estratégica de tráfego pago, redução sistemática de CPA e posicionamento de marca.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Meta Ads & Google Ads',
                  'Escala de ROAS (> 185%)',
                  'Direção de Arte & Branding (UniFBV)',
                  'Inteligência de Dados & CAPI',
                  'CRM & Vendas Consultivas',
                  'Gestão Wolf Agency',
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bloco 4: Hardware & Produção Industrial */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3">
              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                <Wrench className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  4. Hardware & Produção Industrial
                </h3>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Operação técnica de maquinário industrial, equipamentos de estúdio e setups de gravação.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Prensas Térmicas Industriais',
                  'Impressoras Sublimáticas (Infinit)',
                  'Câmeras 4K & Rigs de Transmissão',
                  'Hardware de Áudio & Microfones',
                  'Montagem de Estúdios',
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* ABA 05: CONTATO (Formulário Funcional & 4 Canais Oficiais)              */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'contato' && (
          <div className="space-y-4 pt-2 animate-in fade-in duration-200">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                Comunicação Direta
              </span>
              <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                Iniciar Conversa
              </h2>
            </div>

            {/* Os 4 Canais Oficiais */}
            <div className="space-y-2.5">
              {/* Canal 1: WhatsApp */}
              <a
                href="https://wa.me/5581989920040"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 rounded-2xl p-3.5 flex items-center justify-between shadow-sm active:scale-98 transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm shrink-0">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-950 dark:text-white">
                      WhatsApp Comercial
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      +55 81 98992-0040
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl text-[10px] font-bold bg-[#25D366] text-white shadow-sm flex items-center gap-1">
                  <span>Conversar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              {/* Canal 2: LinkedIn */}
              <a
                href="https://www.linkedin.com/in/fabiorodrigues-dev/"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 rounded-2xl p-3.5 flex items-center justify-between shadow-sm active:scale-98 transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-sm shrink-0">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8v-8.37M7.86 6.81a1.63 1.63 0 0 0-1.63 1.63 1.63 1.63 0 0 0 1.63 1.63 1.63 1.63 0 0 0 1.63-1.63 1.63 1.63 0 0 0-1.63-1.63z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-950 dark:text-white">
                      LinkedIn
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      /in/fabiorodrigues-dev
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl text-[10px] font-bold bg-[#0A66C2] text-white shadow-sm flex items-center gap-1">
                  <span>Conectar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              {/* Canal 3: GitHub */}
              <a
                href="https://github.com/fabiorodrigues-tech-dev"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 rounded-2xl p-3.5 flex items-center justify-between shadow-sm active:scale-98 transition-transform"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#24292e] text-white flex items-center justify-center shadow-sm shrink-0">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-950 dark:text-white">
                      GitHub
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      @fabiorodrigues-tech-dev
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl text-[10px] font-bold bg-black/10 dark:bg-white/15 text-zinc-900 dark:text-white border border-black/10 dark:border-white/10 flex items-center gap-1">
                  <span>Explorar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              {/* Canal 4: E-mail Direto */}
              <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EA4335] text-white flex items-center justify-center shadow-sm shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-950 dark:text-white">
                      E-mail Direto
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      fabioandre777@gmail.com
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl text-[10px] font-bold bg-black/10 dark:bg-white/15 text-zinc-900 dark:text-white border border-black/10 dark:border-white/10 flex items-center gap-1 cursor-pointer active:scale-95 transition-transform"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-500">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Formulário de Mensagem */}
            <div className="backdrop-blur-2xl bg-white/80 dark:bg-[#1c1c1e]/85 border border-white/50 dark:border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)] rounded-[28px] p-5 space-y-3">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                Envie uma Mensagem Direta
              </h3>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#34c759] text-white flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                    Mensagem Enviada!
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Obrigado pelo contato. Retornarei em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      className="w-full bg-white dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu.email@empresa.com"
                      className="w-full bg-white dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Mensagem *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Descreva seu projeto ou oportunidade..."
                      className="w-full bg-white dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#007aff] hover:bg-[#0071eb] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ENVIAR MENSAGEM</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. DOCK INFERIOR DO IPHONE (5 ITENS EM LIQUID GLASS - REQUISITO 5)        */}
      {/* Sem traço de Home Indicator. Oculta se Modo Foco estiver ativo.           */}
      {/* ========================================================================= */}
      <nav
        className={`fixed bottom-4 left-4 right-4 max-w-sm mx-auto z-40 backdrop-blur-2xl bg-white/85 dark:bg-[#161822]/85 border border-white/60 dark:border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.22)] rounded-full px-2 py-2 flex items-center justify-around select-none transition-all duration-300 ${
          isFocusMode ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
        aria-label="Navegação móvel"
      >
        <button
          type="button"
          onClick={() => handleTabSelect('inicio')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'inicio'
              ? 'bg-black/10 dark:bg-white/15 text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9.5px] mt-0.5">Início</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSelect('projetos')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'projetos'
              ? 'bg-black/10 dark:bg-white/15 text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span className="text-[9.5px] mt-0.5">Projetos</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSelect('sobre')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'sobre'
              ? 'bg-black/10 dark:bg-white/15 text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[9.5px] mt-0.5">Sobre</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSelect('habilidades')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'habilidades'
              ? 'bg-black/10 dark:bg-white/15 text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[9.5px] mt-0.5">Habilidades</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSelect('contato')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl active:scale-95 transition-all cursor-pointer ${
            activeTab === 'contato'
              ? 'bg-black/10 dark:bg-white/15 text-blue-600 dark:text-blue-400 font-bold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <Send className="w-4 h-4" />
          <span className="text-[9.5px] mt-0.5">Contato</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* 5. CENTRAL DE CONTROLE ESTILO iOS (REQUISITO 2)                           */}
      {/* Backdrop-blur-3xl bg-black/60 com grid superior, sliders verticais,      */}
      {/* alternador de tema e cores de acento.                                     */}
      {/* ========================================================================= */}
      {isControlCenterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-3xl p-5 pt-12 pb-12 text-white overflow-y-auto flex flex-col justify-start space-y-4 animate-in fade-in duration-200">
          {/* Top Header com Botão Fechar 'X' */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <AppleControlCenterIcon className="w-4 h-4 text-white/80" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">
                Central de Controle iOS
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                triggerHaptic()
                setIsControlCenterOpen(false)
              }}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
              title="Fechar Central de Controle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Grid Superior: Bloco de Status & Widget de Música Compacto */}
          <div className="grid grid-cols-2 gap-3">
            {/* Bloco de Status: Fábio Rodrigues + Alternador Modo Foco */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/15 rounded-[26px] p-4 flex flex-col justify-between h-36">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Status
                </span>
                <h3 className="text-xs font-bold text-white mt-0.5 truncate">
                  Fábio Rodrigues
                </h3>
                <span className="text-[10px] text-zinc-400 block truncate">
                  Recife, PE
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onToggleFocusMode()
                }}
                className={`py-2 px-2.5 rounded-xl text-[10px] font-bold flex items-center justify-between transition-all cursor-pointer active:scale-95 ${
                  isFocusMode
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Moon className="w-3 h-3" />
                  <span>Modo Foco</span>
                </span>
                <span className="text-[9px] opacity-75">
                  {isFocusMode ? 'Ativo' : 'Dock'}
                </span>
              </button>
            </div>

            {/* Widget de Música Compacto: Lofi Chillout */}
            <div
              onClick={() => {
                triggerHaptic()
                setIsExpandedPlayerOpen(true)
              }}
              className="backdrop-blur-2xl bg-white/10 border border-white/15 rounded-[26px] p-4 flex flex-col justify-between h-36 cursor-pointer group active:scale-98 transition-all relative overflow-hidden"
            >
              <div className="flex items-start space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] font-bold text-white block truncate">
                    Lofi Chillout
                  </span>
                  <span className="text-[9.5px] text-zinc-400 block truncate">
                    Fábio Rodrigues Playlist
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerHaptic()
                    onTogglePlayMusic()
                  }}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm"
                  title={isPlayingMusic ? 'Pausar' : 'Tocar'}
                >
                  {isPlayingMusic ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerHaptic()
                    onSkipTrack()
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                  title="Próxima Faixa"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>

                <span className="text-[9px] font-mono text-zinc-400">
                  Expandir ↗
                </span>
              </div>
            </div>
          </div>

          {/* Sliders Verticais estilo iOS: Brilho & Volume */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Slider de Brilho Vertical */}
            <div
              onPointerDown={(e) => {
                isDraggingBrightnessRef.current = true
                handleBrightnessPointer(e)
              }}
              onPointerMove={(e) => {
                if (isDraggingBrightnessRef.current || e.buttons === 1) {
                  handleBrightnessPointer(e)
                }
              }}
              onPointerUp={() => {
                isDraggingBrightnessRef.current = false
              }}
              className="relative h-40 rounded-[28px] bg-black/40 border border-white/15 overflow-hidden select-none touch-none cursor-pointer group"
              title="Brilho da Tela (Arraste verticalmente)"
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-white pointer-events-none transition-all duration-75"
                style={{ height: `${brightness}%` }}
              />
              <div className="relative z-10 w-full h-full flex flex-col justify-between items-center p-3.5 pointer-events-none">
                <span className="text-[11px] font-mono font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {brightness}%
                </span>
                <Sun className={`w-5 h-5 transition-colors ${brightness > 25 ? 'text-zinc-950' : 'text-white'}`} />
              </div>
            </div>

            {/* Slider de Volume Vertical */}
            <div
              onPointerDown={(e) => {
                isDraggingVolumeRef.current = true
                handleVolumePointer(e)
              }}
              onPointerMove={(e) => {
                if (isDraggingVolumeRef.current || e.buttons === 1) {
                  handleVolumePointer(e)
                }
              }}
              onPointerUp={() => {
                isDraggingVolumeRef.current = false
              }}
              className="relative h-40 rounded-[28px] bg-black/40 border border-white/15 overflow-hidden select-none touch-none cursor-pointer group"
              title="Volume do Som (Arraste verticalmente)"
            >
              <div
                className="absolute bottom-0 left-0 right-0 bg-white pointer-events-none transition-all duration-75"
                style={{ height: `${soundVolume}%` }}
              />
              <div className="relative z-10 w-full h-full flex flex-col justify-between items-center p-3.5 pointer-events-none">
                <span className="text-[11px] font-mono font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {soundVolume}%
                </span>
                {soundVolume === 0 ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className={`w-5 h-5 transition-colors ${soundVolume > 25 ? 'text-zinc-950' : 'text-white'}`} />
                )}
              </div>
            </div>
          </div>

          {/* Alternador de Aparência (Modo Claro / Modo Escuro) */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic()
              onToggleTheme()
            }}
            className="w-full py-3.5 px-4 rounded-[22px] bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-between active:scale-98 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                {isDark ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  Aparência
                </span>
                <span className="text-[10px] text-zinc-400 block">
                  {isDark ? 'Modo Escuro Ativado' : 'Modo Claro Ativado'}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/15 text-white">
              Alternar
            </span>
          </button>

          {/* Seletor de Cores de Acento */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/15 rounded-[24px] p-3.5 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
              Cor de Acento do Sistema
            </span>
            <div className="flex items-center justify-around pt-1">
              {PRIMARY_ACCENT_KEYS.map((key) => {
                const def = ACCENT_COLORS[key]
                const isSelected = accentColor === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      triggerHaptic()
                      onChangeAccent(key)
                    }}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                      isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: isDark ? def.dark : def.light }}
                    title={def.name}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PLAYER DE MÚSICA EXPANDIDO ESTILO iOS (REQUISITO 3)                    */}
      {/* Inspirado no print image_7: Card arredondado em Liquid Glass              */}
      {/* ========================================================================= */}
      {isExpandedPlayerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-3xl p-5 flex flex-col justify-center items-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full max-w-sm rounded-[36px] bg-white/10 dark:bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/20 p-6 shadow-2xl space-y-5 text-white relative">
            {/* Header com Grabber & Fechar */}
            <div className="flex items-center justify-between pb-1">
              <div className="w-6" />
              <div className="w-10 h-1 rounded-full bg-white/30" />
              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  setIsExpandedPlayerOpen(false)
                }}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all"
                title="Minimizar Player"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Capa Artística em Alta Resolução */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700 p-6 flex flex-col items-center justify-center shadow-xl border border-white/15">
              <div className={`w-28 h-28 rounded-full border-4 border-white/20 flex items-center justify-center bg-black/40 shadow-inner ${isPlayingMusic ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="mt-4 text-[11px] font-mono font-bold tracking-widest text-white/80 uppercase">
                Fábio Rodrigues Studio
              </span>
            </div>

            {/* Título da Faixa */}
            <div className="text-center">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Lofi Chillout
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Fábio Rodrigues Playlist • YouTube 2OVsnsqBpp8
              </p>
            </div>

            {/* Barra de Scrubber */}
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: isPlayingMusic ? '45%' : '20%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>01:24</span>
                <span>-02:21</span>
              </div>
            </div>

            {/* Controles de Reprodução */}
            <div className="flex items-center justify-around py-1">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onSkipTrack()
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
                title="Faixa Anterior"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onTogglePlayMusic()
                }}
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
                title={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
              >
                {isPlayingMusic ? (
                  <Pause className="w-7 h-7 fill-black" />
                ) : (
                  <Play className="w-7 h-7 fill-black ml-1" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onSkipTrack()
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
                title="Próxima Faixa"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Controle de Volume Horizontal */}
            <div className="flex items-center space-x-3 pt-2">
              <VolumeX className="w-4 h-4 text-zinc-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={soundVolume}
                onChange={(e) => onChangeVolume(Number(e.target.value))}
                className="w-full accent-white cursor-pointer h-1.5 bg-white/20 rounded-full"
              />
              <Volume2 className="w-4 h-4 text-zinc-400" />
            </div>

            {/* Rota de Áudio AirPlay */}
            <div className="text-center pt-1">
              <span className="text-[10px] font-mono text-zinc-400">
                AirPlay // Alto-falante do iPhone
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IOSMobileExperience
