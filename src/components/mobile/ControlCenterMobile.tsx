import React, { useState, useEffect, useRef } from 'react'
import {
  Sun,
  Moon,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Eye,
  MapPin,
  X,
  Music,
  Radio,
  Sparkles,
  ArrowUpRight,
  FolderOpen,
} from 'lucide-react'
import { AppleControlCenterIcon } from '../icons/ControlCenterIcon'
import { GithubIcon, LinkedinIcon, WhatsAppIcon, InstagramIcon } from '../icons/SocialIcons'
import type { ThemeMode, AccentColor } from '../../types'
import { playHapticClick } from '../../lib/soundEffects'

interface ControlCenterMobileProps {
  isOpen: boolean
  onClose: () => void
  theme: ThemeMode
  onToggleTheme: () => void
  accentColor: AccentColor
  onChangeAccent: (color: AccentColor) => void
  isFocusMode: boolean
  onToggleFocusMode: () => void
  isSoundEffectsEnabled?: boolean
  onToggleSoundEffects?: () => void
  isPlayingMusic: boolean
  onTogglePlayMusic: () => void
  soundVolume: number
  onChangeVolume: (vol: number) => void
  onSkipTrack: () => void
  onOpenExpandedPlayer: () => void
}

type ActiveTab = 'main' | 'media' | 'connections'

const LIQUID_GLASS_STYLE: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(32px) saturate(200%)',
  WebkitBackdropFilter: 'blur(32px) saturate(200%)',
  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 12px 30px rgba(0, 0, 0, 0.35)',
}

export const ControlCenterMobile: React.FC<ControlCenterMobileProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  isFocusMode,
  onToggleFocusMode,
  isSoundEffectsEnabled = true,
  isPlayingMusic,
  onTogglePlayMusic,
  soundVolume,
  onChangeVolume,
  onSkipTrack,
  onOpenExpandedPlayer,
}) => {
  // Active tab state for iOS 18 pagination ('main' | 'media' | 'connections')
  const [activeTab, setActiveTab] = useState<ActiveTab>('main')

  // Screen Brightness (20% - 100%)
  const [brightness, setBrightness] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_brightness')
      return saved ? Math.max(20, Math.min(100, Number(saved))) : 100
    }
    return 100
  })

  const volume = soundVolume
  const setVolume = onChangeVolume

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return theme === 'dark'
  })

  // Sync theme changes from props
  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  const triggerHaptic = () => {
    if (isSoundEffectsEnabled) {
      playHapticClick()
    }
  }

  const handleThemeToggle = () => {
    triggerHaptic()
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('macos_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('macos_theme', 'light')
    }
    onToggleTheme()
  }

  const isDraggingBrightnessRef = useRef(false)
  const isDraggingVolumeRef = useRef(false)

  // Sync brightness to HTML root element
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness}%)`
  }, [brightness])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Pointer drag handler for vertical brightness slider
  const handleBrightnessPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const pct = Math.round(100 - (y / rect.height) * 100)
    const clamped = Math.max(20, Math.min(100, pct))
    setBrightness(clamped)
    localStorage.setItem('macos_brightness', String(clamped))
  }

  // Pointer drag handler for vertical volume slider
  const handleVolumePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const pct = Math.round(100 - (y / rect.height) * 100)
    const clamped = Math.max(0, Math.min(100, pct))
    setVolume(clamped)
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          triggerHaptic()
          onClose()
        }
      }}
      className="fixed inset-0 z-50 bg-black/50 dark:bg-black/65 backdrop-blur-3xl p-4 pt-10 flex flex-col justify-start items-center overflow-y-auto select-none animate-in fade-in duration-200"
    >
      {/* 1. Barra Lateral Flutuante na Borda Direita (Conforme print real 0d3966ab) */}
      <div className="fixed right-2.5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-5 py-3 px-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 select-none">
        {/* Ícone 1: Controles (✦) */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic()
            setActiveTab('main')
          }}
          className={`p-1.5 transition-all cursor-pointer ${
            activeTab === 'main' ? 'text-white scale-110' : 'text-white/40 hover:text-white/70'
          }`}
          title="Controles Principais (✦)"
          aria-label="Controles Principais"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Ícone 2: Mídia (🎵) */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic()
            setActiveTab('media')
          }}
          className={`p-1.5 transition-all cursor-pointer ${
            activeTab === 'media' ? 'text-white scale-110' : 'text-white/40 hover:text-white/70'
          }`}
          title="Mídia e Reprodução (🎵)"
          aria-label="Mídia e Reprodução"
        >
          <Music className="w-5 h-5" />
        </button>

        {/* Ícone 3: Conexões (📡) */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic()
            setActiveTab('connections')
          }}
          className={`p-1.5 transition-all cursor-pointer ${
            activeTab === 'connections' ? 'text-white scale-110' : 'text-white/40 hover:text-white/70'
          }`}
          title="Conexões e Links (📡)"
          aria-label="Conexões e Links"
        >
          <Radio className="w-5 h-5" />
        </button>
      </div>

      {/* Container Central dos Controles (largura 340px) */}
      <div className="mt-1 max-w-[340px] w-full flex flex-col gap-3">
        {/* Barra Superior Discreta */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <AppleControlCenterIcon className="w-4 h-4 text-white/90" />
            <span className="text-xs font-semibold tracking-wide text-white/90">
              {activeTab === 'main' && 'Central de Controle'}
              {activeTab === 'media' && 'Mídia e Som'}
              {activeTab === 'connections' && 'Conexões e Links'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              triggerHaptic()
              onClose()
            }}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white cursor-pointer transition-all border border-white/10"
            title="Fechar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PÁGINA 1: ✦ CONTROLES PRINCIPAIS (TELA PRINCIPAL)                         */}
        {/* ========================================================================= */}
        {activeTab === 'main' && (
          <div className="flex flex-col gap-3.5 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Linha 1 (Topo): Dois Quadrados (Status Recife & Música Compacto) */}
            <div className="w-full grid grid-cols-2 gap-3.5 h-[135px]">
              {/* Esquerda: Quadrado de Status Recife */}
              <div
                style={LIQUID_GLASS_STYLE}
                className="h-[135px] rounded-[26px] border border-white/15 p-3.5 flex flex-col justify-between text-white select-none"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center relative">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-1.5 right-1.5 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-white/60 block">
                    Localização Atual
                  </span>
                  <h3 className="text-xs font-bold text-white truncate mt-0.5">
                    Recife, PE • BR
                  </h3>
                </div>
              </div>

              {/* Direita: Quadrado de Música Compacto */}
              <div
                style={LIQUID_GLASS_STYLE}
                onClick={() => {
                  triggerHaptic()
                  setActiveTab('media')
                }}
                className="h-[135px] rounded-[26px] border border-white/15 p-3.5 flex flex-col justify-between text-white cursor-pointer group active:scale-[0.98] transition-all select-none"
                title="Abrir reprodutor de áudio"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md shrink-0">
                    <Music className={`w-4 h-4 text-white ${isPlayingMusic ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="overflow-hidden min-w-0 flex-1">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-white/60 block truncate">
                      Música Ambiente
                    </span>
                    <h3 className="text-xs font-bold text-white truncate mt-0.5">
                      Lofi Chillout
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      triggerHaptic()
                      onSkipTrack()
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/75 hover:text-white active:scale-90 transition-transform cursor-pointer"
                    title="Retroceder"
                  >
                    <SkipBack className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      triggerHaptic()
                      onTogglePlayMusic()
                    }}
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-md"
                    title={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
                  >
                    {isPlayingMusic ? (
                      <Pause className="w-3.5 h-3.5 fill-black" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      triggerHaptic()
                      onSkipTrack()
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/75 hover:text-white active:scale-90 transition-transform cursor-pointer"
                    title="Avançar"
                  >
                    <SkipForward className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            {/* Linha 2 (Corpo): Grade de Ações Rápidas (Esquerda) + Sliders Verticais (Direita) */}
            <div className="w-full grid grid-cols-2 gap-3.5 h-[155px]">
              {/* Lado Esquerdo: Grade de Ações Rápidas (6 botões redondos de 48px) */}
              <div className="grid grid-cols-2 gap-2 place-items-center h-[155px]">
                {/* Botão 1: LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/fabiorodrigues-dev/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  style={LIQUID_GLASS_STYLE}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-sm hover:brightness-110"
                  title="LinkedIn Oficial"
                >
                  <LinkedinIcon className="w-5 h-5 fill-white" />
                </a>

                {/* Botão 2: WhatsApp */}
                <a
                  href="https://wa.me/5581991851507"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  style={LIQUID_GLASS_STYLE}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-sm hover:brightness-110"
                  title="WhatsApp (+55 (81) 99185-1507)"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                </a>

                {/* Botão 3: GitHub */}
                <a
                  href="https://github.com/fabiorodrigues-tech-dev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  style={LIQUID_GLASS_STYLE}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-sm hover:brightness-110"
                  title="GitHub (Octocat)"
                >
                  <GithubIcon className="w-5 h-5 fill-white" />
                </a>

                {/* Botão 4: Instagram */}
                <a
                  href="https://www.instagram.com/f.a.rodrigues/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  style={LIQUID_GLASS_STYLE}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-sm hover:brightness-110"
                  title="Instagram (@f.a.rodrigues)"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>

                {/* Botão 5: Modo Foco */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    onToggleFocusMode()
                  }}
                  style={LIQUID_GLASS_STYLE}
                  className={`w-12 h-12 rounded-full border border-white/15 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm ${
                    isFocusMode
                      ? '!bg-indigo-500/30 text-indigo-300 !border-indigo-400/40 shadow-sm'
                      : 'text-white hover:brightness-110'
                  }`}
                  title="Modo Foco (Ocultar Dock)"
                >
                  <Eye className="w-5 h-5" />
                </button>

                {/* Botão 6: Alternador Tema Dia/Noite */}
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  style={LIQUID_GLASS_STYLE}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-sm hover:brightness-110"
                  title={isDark ? 'Modo Noite' : 'Modo Dia'}
                  aria-label={isDark ? 'Modo Noite' : 'Modo Dia'}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-sky-400" />
                  )}
                </button>
              </div>

              {/* Lado Direito: Os dois sliders verticais em cápsula fina com Liquid Glass Real */}
              <div className="flex items-center justify-center gap-2.5 h-[155px]">
                {/* Slider de Brilho */}
                <div
                  onPointerDownCapture={(e) => {
                    try {
                      e.currentTarget.setPointerCapture(e.pointerId)
                    } catch {}
                    isDraggingBrightnessRef.current = true
                    handleBrightnessPointer(e)
                  }}
                  onPointerMoveCapture={(e) => {
                    if (isDraggingBrightnessRef.current) {
                      handleBrightnessPointer(e)
                    }
                  }}
                  onPointerUpCapture={(e) => {
                    try {
                      e.currentTarget.releasePointerCapture(e.pointerId)
                    } catch {}
                    isDraggingBrightnessRef.current = false
                  }}
                  onPointerCancelCapture={() => {
                    isDraggingBrightnessRef.current = false
                  }}
                  style={LIQUID_GLASS_STYLE}
                  className="relative w-[72px] h-[150px] rounded-[32px] border border-white/15 overflow-hidden flex flex-col justify-end select-none shadow-lg cursor-pointer"
                  title="Brilho da Tela"
                >
                  <div
                    className="w-full bg-white transition-all duration-75 rounded-b-[32px]"
                    style={{ height: `${brightness}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference text-white">
                    <Sun className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={brightness}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      setBrightness(val)
                      localStorage.setItem('macos_brightness', String(val))
                    }}
                    aria-label="Brilho da Tela"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer touch-none"
                  />
                </div>

                {/* Slider de Volume */}
                <div
                  onPointerDownCapture={(e) => {
                    try {
                      e.currentTarget.setPointerCapture(e.pointerId)
                    } catch {}
                    isDraggingVolumeRef.current = true
                    handleVolumePointer(e)
                  }}
                  onPointerMoveCapture={(e) => {
                    if (isDraggingVolumeRef.current) {
                      handleVolumePointer(e)
                    }
                  }}
                  onPointerUpCapture={(e) => {
                    try {
                      e.currentTarget.releasePointerCapture(e.pointerId)
                    } catch {}
                    isDraggingVolumeRef.current = false
                  }}
                  onPointerCancelCapture={() => {
                    isDraggingVolumeRef.current = false
                  }}
                  style={LIQUID_GLASS_STYLE}
                  className="relative w-[72px] h-[150px] rounded-[32px] border border-white/15 overflow-hidden flex flex-col justify-end select-none shadow-lg cursor-pointer"
                  title="Volume do Som"
                >
                  <div
                    className="w-full bg-white transition-all duration-75 rounded-b-[32px]"
                    style={{ height: `${volume}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference text-white">
                    <Volume2 className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    aria-label="Volume do Som"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer touch-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PÁGINA 2: 🎵 PLAYER DE ÁUDIO EXPANDIDO (MÍDIA)                             */}
        {/* ========================================================================= */}
        {activeTab === 'media' && (
          <div
            style={LIQUID_GLASS_STYLE}
            className="rounded-[28px] border border-white/15 p-5 flex flex-col items-center justify-between text-white animate-in fade-in slide-in-from-right-4 duration-300"
          >
            {/* Capa de Álbum em Destaque */}
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center shadow-2xl my-2 relative group">
              <Music className={`w-12 h-12 text-white ${isPlayingMusic ? 'animate-bounce' : ''}`} />
              {isPlayingMusic && (
                <span className="absolute -inset-1 rounded-3xl bg-purple-500/20 blur-sm pointer-events-none animate-pulse" />
              )}
            </div>

            {/* Informações da Faixa */}
            <div className="text-center my-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Lofi Chillout
              </h3>
              <p className="text-xs text-white/70 mt-0.5">
                Fábio Rodrigues • Trilha Sonora Ambiente
              </p>
            </div>

            {/* Controles Principais de Reprodução */}
            <div className="flex items-center justify-center gap-6 my-2">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onSkipTrack()
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
                title="Retroceder Faixa"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onTogglePlayMusic()
                }}
                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-xl"
                title={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
              >
                {isPlayingMusic ? (
                  <Pause className="w-6 h-6 fill-black" />
                ) : (
                  <Play className="w-6 h-6 fill-black ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onSkipTrack()
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
                title="Avançar Faixa"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Slider Horizontal de Volume */}
            <div className="w-full flex items-center gap-3 px-2 mt-2">
              <Volume2 className="w-4 h-4 text-white/60 shrink-0" />
              <div className="relative flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-75"
                  style={{ width: `${volume}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title={`Volume: ${volume}%`}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-white/70 w-8 text-right">
                {volume}%
              </span>
            </div>

            {/* Botão de Expansão Completa */}
            <button
              type="button"
              onClick={() => {
                triggerHaptic()
                onOpenExpandedPlayer()
              }}
              className="mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Abrir Player Completo do iOS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PÁGINA 3: 📡 CONEXÕES E LINKS (DRIVE, GITHUB, LINKEDIN, INSTAGRAM, WPP)    */}
        {/* ========================================================================= */}
        {activeTab === 'connections' && (
          <div className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Card Destaque: Google Drive (Portfólios e CVs) */}
            <a
              href="https://drive.google.com/drive/folders/1rl-SPjOi4tisk2tACb2RcKKAmo6OmBrw"
              target="_blank"
              rel="noreferrer"
              onClick={triggerHaptic}
              style={LIQUID_GLASS_STYLE}
              className="rounded-[22px] border border-white/15 p-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group shadow-lg hover:brightness-110"
              title="Acessar Google Drive Oficial com Todos os Portfólios e CVs"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-md shrink-0">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-xs font-bold text-white truncate">
                      Google Drive Oficial
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400/30 text-amber-200 border border-amber-400/40">
                      CVs
                    </span>
                  </div>
                  <p className="text-[10px] text-white/70 truncate mt-0.5">
                    Todos os Portfólios, Cases e Currículos
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
            </a>

            {/* Card 2: GitHub */}
            <a
              href="https://github.com/fabiorodrigues-tech-dev"
              target="_blank"
              rel="noreferrer"
              onClick={triggerHaptic}
              style={LIQUID_GLASS_STYLE}
              className="rounded-[20px] border border-white/15 p-3 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="Repositórios GitHub"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white shadow-sm shrink-0">
                  <GithubIcon className="w-4.5 h-4.5 fill-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">
                    Perfil GitHub
                  </h4>
                  <p className="text-[10px] text-white/60 truncate font-mono">
                    @fabiorodrigues-tech-dev
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
            </a>

            {/* Card 3: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/fabiorodrigues-dev/"
              target="_blank"
              rel="noreferrer"
              onClick={triggerHaptic}
              style={LIQUID_GLASS_STYLE}
              className="rounded-[20px] border border-white/15 p-3 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="LinkedIn Profissional"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white shadow-sm shrink-0">
                  <LinkedinIcon className="w-4.5 h-4.5 fill-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">
                    Perfil LinkedIn
                  </h4>
                  <p className="text-[10px] text-white/60 truncate font-mono">
                    /in/fabiorodrigues-dev
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
            </a>

            {/* Card 4: Instagram */}
            <a
              href="https://www.instagram.com/f.a.rodrigues/"
              target="_blank"
              rel="noreferrer"
              onClick={triggerHaptic}
              style={LIQUID_GLASS_STYLE}
              className="rounded-[20px] border border-white/15 p-3 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="Instagram Oficial"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 flex items-center justify-center text-white shadow-sm shrink-0">
                  <InstagramIcon className="w-4.5 h-4.5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">
                    Instagram
                  </h4>
                  <p className="text-[10px] text-white/60 truncate font-mono">
                    @f.a.rodrigues
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
            </a>

            {/* Card 5: WhatsApp Comercial */}
            <a
              href="https://wa.me/5581991851507"
              target="_blank"
              rel="noreferrer"
              onClick={triggerHaptic}
              style={LIQUID_GLASS_STYLE}
              className="rounded-[20px] border border-white/15 p-3 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="WhatsApp Comercial"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm shrink-0">
                  <WhatsAppIcon className="w-4.5 h-4.5 fill-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">
                    WhatsApp Comercial
                  </h4>
                  <p className="text-[10px] text-white/60 truncate font-mono">
                    +55 (81) 99185-1507
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors shrink-0 ml-2" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default ControlCenterMobile
