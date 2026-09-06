import React, { useState, useEffect, useRef } from 'react'
import {
  Sun,
  Moon,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  MapPin,
  Music,
  Radio,
  Sparkles,
  ArrowUpRight,
  FolderOpen,
  Wifi,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon, InstagramIcon } from '../icons/SocialIcons'
import { CircularVisualizer } from '../audio/CircularVisualizer'
import type { ThemeMode, AccentColor } from '../../types'
import { playHapticClick } from '../../lib/soundEffects'

// Ícone Oficial de Bloqueio de Rotação do iOS (Cadeado central com seta circular no sentido horário — Conforme print de referência)
const RotationLockIcon: React.FC<{ className?: string; isLocked?: boolean }> = ({
  className = 'w-6 h-6',
  isLocked = false,
}) => {
  const c = isLocked ? '#ff3b30' : 'currentColor'
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: c }}>
      {/* Seta circular no sentido horário */}
      <path
        d="M 13.8 19.8 A 8.2 8.2 0 1 1 20.2 11.8"
        stroke={c}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <polygon points="17.2,11.2 20.2,14.8 23,11.2" fill={c} />
      {/* Cadeado centralizado */}
      <rect x="9" y="11.5" width="6" height="5.2" rx="1.2" fill={c} />
      <path
        d="M 10.2 11.5 V 9.6 A 1.8 1.8 0 0 1 13.8 9.6 V 11.5"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Ícone Oficial de Espelhamento de Tela (AirPlay Screen Mirroring — Conforme print de referência)
const ScreenMirroringIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Tela traseira translúcida */}
    <path
      d="M 6.5 14 H 5.5 A 2 2 0 0 1 3.5 12 V 6 A 2 2 0 0 1 5.5 4 H 14.5 A 2 2 0 0 1 16.5 6 V 8"
      strokeOpacity="0.55"
    />
    {/* Tela dianteira destacada */}
    <rect x="8" y="8" width="12.5" height="10" rx="2.4" />
  </svg>
)

// Ícones Oficiais de Reprodução de Mídia do iOS (Conforme print de referência Apple)
const AppleBackwardIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11 5.5L3.5 12L11 18.5V5.5Z" />
    <path d="M20.5 5.5L13 12L20.5 18.5V5.5Z" />
  </svg>
)

const AppleForwardIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3.5 5.5L11 12L3.5 18.5V5.5Z" />
    <path d="M13 5.5L20.5 12L13 18.5V5.5Z" />
  </svg>
)

const ApplePlayIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 5L19.5 12L7 19V5Z" />
  </svg>
)

const ApplePauseIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="5.5" y="4.5" width="4.2" height="15" rx="1.5" />
    <rect x="14.3" y="4.5" width="4.2" height="15" rx="1.5" />
  </svg>
)

interface ControlCenterMobileProps {
  isOpen: boolean
  onClose: () => void
  theme: ThemeMode
  onToggleTheme: () => void
  accentColor?: AccentColor
  onChangeAccent?: (color: AccentColor) => void
  isFocusMode: boolean
  onToggleFocusMode: () => void
  isSoundEffectsEnabled?: boolean
  onToggleSoundEffects?: () => void
  isPlayingMusic: boolean
  onTogglePlayMusic: () => void
  soundVolume: number
  onChangeVolume: (vol: number) => void
  onSkipTrack: () => void
  onPrevTrack?: () => void
  onNextTrack?: () => void
}

type ActiveTab = 'main' | 'media' | 'connections'

export const ControlCenterMobile: React.FC<ControlCenterMobileProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  isFocusMode,
  onToggleFocusMode,
  isSoundEffectsEnabled = true,
  onToggleSoundEffects,
  isPlayingMusic,
  onTogglePlayMusic,
  soundVolume,
  onChangeVolume,
  onSkipTrack,
  onPrevTrack,
  onNextTrack,
}) => {
  // Active tab state for iOS pagination ('main' | 'media' | 'connections')
  const [activeTab, setActiveTab] = useState<ActiveTab>('main')

  // Screen Brightness (20% - 100%)
  const [brightness, setBrightness] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_brightness')
      return saved ? Math.max(20, Math.min(100, Number(saved))) : 100
    }
    return 100
  })

  // Orientation lock state
  const [isOrientationLocked, setIsOrientationLocked] = useState(false)

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

  const prevTrack = () => {
    triggerHaptic()
    if (onPrevTrack) {
      onPrevTrack()
    } else {
      onSkipTrack()
    }
  }

  const nextTrack = () => {
    triggerHaptic()
    if (onNextTrack) {
      onNextTrack()
    } else {
      onSkipTrack()
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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-3xl pt-12 px-4 pb-8 flex flex-col justify-start items-center overflow-y-auto select-none overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in fade-in duration-200"
    >
      {/* 1. Botão de Fechar no Canto Superior Direito com bom respiro */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic()
          onClose()
        }}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 z-30 active:scale-90 transition-all shadow-sm cursor-pointer"
        title="Fechar"
        aria-label="Fechar"
      >
        ✕
      </button>

      {/* Container Central da Central de Controle com Trilho Lateral Integrado (mt-2 w-full max-w-[335px]) */}
      <div className="relative w-full max-w-[335px] mx-auto mt-2 flex flex-col gap-3.5 select-none">
        {/* Trilho Lateral de Ícones (✦, 🎵, 📡) Perfeitamente Centralizado na Altura dos Controles */}
        <div className="absolute -right-8 min-[400px]:-right-9 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-5 py-2 select-none">
          {/* Ícone 1: Controles (✦) */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic()
              setActiveTab('main')
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
              activeTab === 'main'
                ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                : 'text-white/40 hover:text-white/70'
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
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
              activeTab === 'media'
                ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                : 'text-white/40 hover:text-white/70'
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
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
              activeTab === 'connections'
                ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                : 'text-white/40 hover:text-white/70'
            }`}
            title="Conexões e Links (📡)"
            aria-label="Conexões e Links"
          >
            <Radio className="w-5 h-5" />
          </button>
        </div>
        {/* ========================================================================= */}
        {/* PÁGINA 1: ✦ CONTROLES PRINCIPAIS (TELA PRINCIPAL)                         */}
        {/* ========================================================================= */}
        {activeTab === 'main' && (
          <div className="w-full flex flex-col gap-3.5 min-[400px]:gap-4 mx-auto animate-in fade-in slide-in-from-left-4 duration-300">
            {/* LINHA 1: Cluster de Conectividade (Esquerda) + Card de Mídia (Direita) */}
            <div className="w-full grid grid-cols-2 gap-3.5 min-[400px]:gap-4 h-[162px] min-[400px]:h-[170px] mx-auto">
              {/* Cluster de Conectividade (Bandeja com 4 pastilhas individuais) */}
              <div
                className="rounded-[36px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all h-[162px] min-[400px]:h-[170px] p-3 grid grid-cols-2 gap-3 place-items-center select-none"
              >
                {/* Pastilha 1 (Recife / Status Online): Fundo próprio e sombra interna */}
                <div
                  className="w-[54px] h-[54px] min-[400px]:w-[58px] min-[400px]:h-[58px] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-95 transition-all duration-200"
                  title="Recife, PE • BR (Status: Online)"
                >
                  <MapPin className="w-6 h-6 text-emerald-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute top-2 right-2 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-2" />
                </div>

                {/* Pastilha 2 (Conexões / Wi-Fi) */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    setActiveTab('connections')
                  }}
                  className="w-[54px] h-[54px] min-[400px]:w-[58px] min-[400px]:h-[58px] rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  title="Conexões e Redes (Wi-Fi 6 • Conectado)"
                  aria-label="Conexões e Redes"
                >
                  <Wifi className="w-6 h-6 text-sky-400" />
                </button>

                {/* Pastilha 3 (Tema Dia/Noite) */}
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="w-[54px] h-[54px] min-[400px]:w-[58px] min-[400px]:h-[58px] rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  title={isDark ? 'Modo Noite (Alternar para Dia)' : 'Modo Dia (Alternar para Noite)'}
                  aria-label={isDark ? 'Modo Noite' : 'Modo Dia'}
                >
                  {isDark ? (
                    <Sun className="w-6 h-6 text-amber-300" />
                  ) : (
                    <Moon className="w-6 h-6 text-amber-300" />
                  )}
                </button>

                {/* Pastilha 4 (Efeitos Sonoros SFX) */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    onToggleSoundEffects?.()
                  }}
                  className={`w-[54px] h-[54px] min-[400px]:w-[58px] min-[400px]:h-[58px] rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                    isSoundEffectsEnabled
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-400/30'
                      : 'bg-white/10 text-white/40 border border-white/10'
                  }`}
                  title={isSoundEffectsEnabled ? 'Efeitos Sonoros Ativos' : 'Efeitos Sonoros Mutados'}
                  aria-label="Efeitos Sonoros"
                >
                  <Sparkles className="w-6 h-6" />
                </button>
              </div>

              {/* Card de Mídia: Mesma Altura (162-170px), mesmo raio (36px) e padding consistente */}
              <div
                onClick={() => {
                  triggerHaptic()
                  setActiveTab('media')
                }}
                className="rounded-[36px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all h-[162px] min-[400px]:h-[170px] p-3.5 flex flex-col justify-between text-white cursor-pointer group active:scale-[0.98] select-none"
                title="Abrir reprodutor de áudio"
              >
                {/* Topo: Capa e Título */}
                <div className="flex items-center space-x-3">
                  <div
                    className={`relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center shrink-0 overflow-hidden border transition-all duration-700 ${
                      isPlayingMusic
                        ? 'scale-[1.05] shadow-[0_0_20px_rgba(147,51,234,0.6)] border-white/40'
                        : 'scale-100 shadow-md border-white/10'
                    }`}
                  >
                    {/* Barras de equalizador compactas dentro da capa */}
                    <div className="flex items-end gap-0.5 h-4 select-none pointer-events-none">
                      <span
                        className={`w-0.5 bg-white rounded-full transition-all duration-300 ${
                          isPlayingMusic ? 'h-3 animate-[pulse_0.6s_ease-in-out_infinite]' : 'h-1'
                        }`}
                      />
                      <span
                        className={`w-0.5 bg-white rounded-full transition-all duration-300 delay-100 ${
                          isPlayingMusic ? 'h-4 animate-[pulse_0.4s_ease-in-out_infinite]' : 'h-1.5'
                        }`}
                      />
                      <span
                        className={`w-0.5 bg-white rounded-full transition-all duration-300 delay-200 ${
                          isPlayingMusic ? 'h-2.5 animate-[pulse_0.7s_ease-in-out_infinite]' : 'h-1'
                        }`}
                      />
                      <span
                        className={`w-0.5 bg-white rounded-full transition-all duration-300 delay-150 ${
                          isPlayingMusic ? 'h-3.5 animate-[pulse_0.5s_ease-in-out_infinite]' : 'h-1.5'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden min-w-0 flex-1">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/60 block truncate">
                      Nemi FM • Atmospheric Nightdrive
                    </span>
                    <h3 className="text-xs min-[400px]:text-sm font-bold text-white truncate mt-0.5">
                      MIDNIGHT // CHILL PHONK
                    </h3>
                  </div>
                </div>

                {/* Equalizador animado minimalista do iOS */}
                <div className="flex items-center justify-center gap-1.5 my-0.5">
                  <span className={`w-1 bg-white/70 rounded-full transition-all ${isPlayingMusic ? 'h-3.5 animate-pulse' : 'h-1.5'}`} />
                  <span className={`w-1 bg-white/90 rounded-full transition-all ${isPlayingMusic ? 'h-6 animate-pulse delay-75' : 'h-2'}`} />
                  <span className={`w-1 bg-white/70 rounded-full transition-all ${isPlayingMusic ? 'h-4.5 animate-pulse delay-150' : 'h-1.5'}`} />
                  <span className={`w-1 bg-white/90 rounded-full transition-all ${isPlayingMusic ? 'h-7 animate-pulse delay-100' : 'h-2.5'}`} />
                  <span className={`w-1 bg-white/70 rounded-full transition-all ${isPlayingMusic ? 'h-3.5 animate-pulse delay-200' : 'h-1.5'}`} />
                </div>

                {/* Controles Oficiais de Reprodução do iOS (Conforme print de referência) */}
                <div className="flex items-center justify-between px-2 pt-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevTrack()
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white active:scale-90 transition-all cursor-pointer"
                    title="Retroceder (Voltar)"
                    aria-label="Voltar"
                  >
                    <AppleBackwardIcon className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      triggerHaptic()
                      onTogglePlayMusic()
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all cursor-pointer"
                    title={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
                    aria-label={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
                  >
                    {isPlayingMusic ? (
                      <ApplePauseIcon className="w-6 h-6" />
                    ) : (
                      <ApplePlayIcon className="w-6 h-6 ml-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextTrack()
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white active:scale-90 transition-all cursor-pointer"
                    title="Avançar (Next)"
                    aria-label="Avançar"
                  >
                    <AppleForwardIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* LINHA 2: Foco & Atalhos (Esquerda) + Sliders Verticais ~2.7:1 (Direita) */}
            <div className="w-full grid grid-cols-2 gap-3.5 min-[400px]:gap-4 h-[160px] mx-auto">
              {/* Lado Esquerdo: 2 Quadrados Superiores + Pílula Horizontal de Foco */}
              <div className="flex flex-col justify-between h-[160px] w-full">
                {/* 2 Botões Circulares Superiores (Bloqueio de Rotação + Espelhar Tela) */}
                <div className="grid grid-cols-2 gap-3.5 place-items-center h-[90px]">
                  {/* Botão: Bloqueio de Orientação Oficial (Cadeado com Seta Curva Circular — Destaque quando ativo) */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic()
                      setIsOrientationLocked((prev) => !prev)
                    }}
                    className={`w-[62px] h-[62px] rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200 ${
                      isOrientationLocked
                        ? 'bg-white text-[#ff3b30] border border-white/40 shadow-[0_2px_14px_rgba(255,59,48,0.35)]'
                        : 'bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-white/85 hover:text-white'
                    }`}
                    title={isOrientationLocked ? 'Bloqueio de Orientação: Ativado' : 'Bloqueio de Orientação: Desativado'}
                    aria-label="Bloqueio de Orientação"
                  >
                    <RotationLockIcon className="w-6 h-6" isLocked={isOrientationLocked} />
                  </button>

                  {/* Botão: AirPlay Oficial (Espelhar Tela — Conforme print de referência) */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic()
                      setActiveTab('media')
                    }}
                    className="w-[62px] h-[62px] rounded-full bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-white/85 hover:text-white cursor-pointer active:scale-95 transition-all duration-200"
                    title="Espelhar Tela (AirPlay)"
                    aria-label="Espelhar Tela"
                  >
                    <ScreenMirroringIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Botão FOCO Oficial do iOS 26 (Cápsula nativa com disco circular para a lua à esquerda + "Foco ⬍") */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    onToggleFocusMode()
                  }}
                  className={`h-[56px] w-full rounded-full border p-1.5 flex items-center justify-start select-none active:scale-[0.98] transition-all cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${
                    isFocusMode 
                      ? 'bg-indigo-600/35 border-indigo-400/50 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]' 
                      : 'bg-white/[0.14] dark:bg-white/[0.09] hover:bg-white/15 backdrop-blur-3xl border border-white/25 dark:border-white/10 text-white/90'
                  }`}
                  title="Modo Foco: Oculta o Dock e minimiza distrações"
                  aria-label="Modo Foco"
                >
                  {/* Disco circular esquerdo que abriga o ícone da Lua preenchida */}
                  <div
                    className={`w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isFocusMode
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'bg-white/15 dark:bg-white/[0.12] text-white shadow-sm'
                    }`}
                  >
                    {/* Ícone da Lua Apple: Sólido preenchido em branco, orientação e formato idênticos ao SF Symbol moon.fill */}
                    <Moon
                      className="w-[22px] h-[22px] rotate-45 shrink-0"
                      fill="white"
                      stroke="none"
                      strokeWidth={0}
                    />
                  </div>

                  {/* Rótulo "Foco" e Seletor Vertical Apple (chevron.up.chevron.down) */}
                  <div className="flex items-center gap-1.5 ml-2.5">
                    <span className="text-[14px] sm:text-[15px] font-semibold tracking-tight text-white">
                      Foco
                    </span>
                    {/* Duplo chevron de seleção do iOS */}
                    <svg
                      viewBox="0 0 10 16"
                      className="w-2.5 h-3.5 text-white/60 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 6L5 2L8 6" />
                      <path d="M2 10L5 14L8 10" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Lado Direito: Sliders Verticais Mais Robustos (w-[76px] h-[160px] rounded-[34px]) */}
              <div className="flex items-center justify-center gap-2.5 min-[400px]:gap-3 h-[160px] w-full mx-auto">
                {/* Slider de Brilho: Ícone Sun fino (strokeWidth=1.5) acompanhando o nível de preenchimento */}
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
                  className="relative w-[76px] h-[160px] rounded-[34px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 overflow-hidden flex flex-col justify-end shadow-xl select-none cursor-pointer"
                  title="Brilho da Tela"
                >
                  {/* Preenchimento inferior */}
                  <div
                    className="w-full bg-white dark:bg-white/95 transition-all duration-75 rounded-b-[34px]"
                    style={{ height: `${brightness}%` }}
                  />
                  {/* Ícone Sun mais fino (strokeWidth=1.5) acompanhando dinamicamente o nível de preenchimento */}
                  <div
                    style={{
                      bottom: `clamp(14px, calc(${brightness}% - 12px), calc(100% - 36px))`,
                    }}
                    className="absolute inset-x-0 flex items-center justify-center pointer-events-none mix-blend-difference text-white transition-all duration-75"
                  >
                    <Sun className="w-5 h-5 stroke-[1.5]" />
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

                {/* Slider de Volume: Ícone Speaker Fill sólido (sem ondas) acompanhando o nível de preenchimento */}
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
                  className="relative w-[76px] h-[160px] rounded-[34px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 overflow-hidden flex flex-col justify-end shadow-xl select-none cursor-pointer"
                  title="Volume do Som"
                >
                  {/* Preenchimento inferior */}
                  <div
                    className="w-full bg-white dark:bg-white/95 transition-all duration-75 rounded-b-[34px]"
                    style={{ height: `${volume}%` }}
                  />
                  {/* Ícone estilo Speaker Fill minimalista (fill="currentColor") acompanhando dinamicamente o nível */}
                  <div
                    style={{
                      bottom: `clamp(14px, calc(${volume}% - 12px), calc(100% - 36px))`,
                    }}
                    className="absolute inset-x-0 flex items-center justify-center pointer-events-none mix-blend-difference text-white transition-all duration-75"
                  >
                    {volume === 0 ? (
                      <VolumeX className="w-5 h-5 stroke-[1.5]" fill="currentColor" />
                    ) : (
                      <Volume className="w-5 h-5 stroke-[1.5]" fill="currentColor" />
                    )}
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

            {/* LINHA 3: Grade Uniforme de Ícones Circulares Abaixo (~60-64px, gap uniforme) */}
            <div className="w-full grid grid-cols-4 gap-3.5 min-[400px]:gap-4 mx-auto place-items-center">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/fabiorodrigues-dev/"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all hover:brightness-110"
                title="LinkedIn Oficial"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-6 h-6 fill-current" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/5581991851507"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all hover:brightness-110"
                title="WhatsApp (+55 (81) 99185-1507)"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6 fill-current" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/fabiorodrigues-tech-dev"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all hover:brightness-110"
                title="GitHub (Octocat)"
                aria-label="GitHub"
              >
                <GithubIcon className="w-6 h-6 fill-current" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/f.a.rodrigues/"
                target="_blank"
                rel="noreferrer"
                onClick={triggerHaptic}
                className="w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all hover:brightness-110"
                title="Instagram (@f.a.rodrigues)"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PÁGINA 2: 🎵 PLAYER DE ÁUDIO EXPANDIDO (MÍDIA - Conforme print 616cff)     */}
        {/* ========================================================================= */}
        {activeTab === 'media' && (
          <div className="w-full max-w-[340px] min-[400px]:max-w-[348px] h-[72vh] max-h-[570px] mx-auto rounded-[38px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 flex flex-col justify-between select-none text-white animate-in fade-in zoom-in-95 duration-200">
            {/* 1. Arte de Capa com Visualizador de Áudio Circular (Tuneform) */}
            <div className="relative w-full aspect-square flex items-center justify-center p-6 my-2">
              {/* 1. O Anel Radial de Barras de Espectro (Fundo) */}
              <CircularVisualizer isPlaying={isPlayingMusic} />

              {/* 2. A Capa Central com Cantos Arredondados */}
              <div
                className={`relative z-10 w-[72%] aspect-square rounded-[22px] bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 shadow-2xl flex items-center justify-center overflow-hidden border border-white/20 transition-transform duration-500 ${
                  isPlayingMusic ? 'scale-105' : 'scale-100'
                }`}
              >
                <Music className="w-12 h-12 text-white/80" />
              </div>
            </div>

            {/* 2. Informações da Faixa */}
            <div className="flex items-center justify-between">
              <div className="truncate pr-2">
                <h3 className="font-bold text-base truncate">MIDNIGHT // CHILL PHONK</h3>
                <p className="text-xs text-white/60 truncate">Nemi FM • Atmospheric Nightdrive</p>
              </div>
              <span className="text-white/40 text-lg cursor-pointer px-1">•••</span>
            </div>

            {/* 3. Scrubber de Tempo */}
            <div className="w-full">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/90 w-1/3 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                <span>1:12</span>
                <span>-2:48</span>
              </div>
            </div>

            {/* 4. Controles Oficiais de Reprodução do iOS (Voltar, Play/Pause Centralizado, Avançar) */}
            <div className="flex items-center justify-center gap-10 my-1">
              <button
                type="button"
                onClick={prevTrack}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white active:scale-90 transition-all cursor-pointer"
                title="Voltar (Previous)"
                aria-label="Voltar"
              >
                <AppleBackwardIcon className="w-7 h-7" />
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onTogglePlayMusic()
                }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all cursor-pointer"
                title={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
                aria-label={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
              >
                {isPlayingMusic ? (
                  <ApplePauseIcon className="w-9 h-9" />
                ) : (
                  <ApplePlayIcon className="w-9 h-9 ml-1" />
                )}
              </button>

              <button
                type="button"
                onClick={nextTrack}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white active:scale-90 transition-all cursor-pointer"
                title="Avançar (Next)"
                aria-label="Avançar"
              >
                <AppleForwardIcon className="w-7 h-7" />
              </button>
            </div>

            {/* 5. Slider de Volume Horizontal */}
            <div className="flex items-center gap-3 px-1">
              <Volume1 className="w-4 h-4 text-white/40" />
              <div className="relative flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white" style={{ width: `${volume}%` }} />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <Volume2 className="w-4 h-4 text-white/40" />
            </div>

            {/* 6. Rótulo AirPlay Estático na Base */}
            <div className="mx-auto mt-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 flex items-center gap-2 text-[11px] font-medium text-white/80 select-none pointer-events-none">
              <Radio className="w-3.5 h-3.5" />
              <span>AirPlay • Alto-falante do iPhone</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PÁGINA 3: 📡 CONEXÕES E LINKS (DRIVE, GITHUB, LINKEDIN, INSTAGRAM, WPP)    */}
        {/* ========================================================================= */}
        {activeTab === 'connections' && (
          <div className="w-[85%] max-w-[340px] flex flex-col gap-3 min-[390px]:gap-3.5 mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Card Destaque: Google Drive (Portfólios e CVs) */}
            <a
              href="https://drive.google.com/drive/folders/1rl-SPjOi4tisk2tACb2RcKKAmo6OmBrw"
              target="_blank"
              rel="noreferrer"
              onClick={triggerHaptic}
              className="rounded-[24px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] px-4 py-3.5 min-[390px]:py-4 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="Acessar Google Drive Oficial com Todos os Portfólios e CVs"
            >
              <div className="flex items-center space-x-3.5 overflow-hidden">
                <div className="w-10 h-10 min-[390px]:w-11 min-[390px]:h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-md shrink-0">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-xs min-[390px]:text-[13px] font-bold text-white truncate">
                      Google Drive Oficial
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400/30 text-amber-200 border border-amber-400/40">
                      CVs
                    </span>
                  </div>
                  <p className="text-[10px] min-[390px]:text-[11px] text-white/70 truncate mt-0.5">
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
              className="rounded-[24px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="Repositórios GitHub"
            >
              <div className="flex items-center space-x-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-white shadow-sm shrink-0">
                  <GithubIcon className="w-5 h-5 fill-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs min-[390px]:text-[13px] font-bold text-white truncate">
                    Perfil GitHub
                  </h4>
                  <p className="text-[10px] min-[390px]:text-[11px] text-white/60 truncate font-mono mt-0.5">
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
              className="rounded-[24px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="LinkedIn Profissional"
            >
              <div className="flex items-center space-x-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white shadow-sm shrink-0">
                  <LinkedinIcon className="w-5 h-5 fill-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs min-[390px]:text-[13px] font-bold text-white truncate">
                    Perfil LinkedIn
                  </h4>
                  <p className="text-[10px] min-[390px]:text-[11px] text-white/60 truncate font-mono mt-0.5">
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
              className="rounded-[24px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="Instagram Oficial"
            >
              <div className="flex items-center space-x-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 flex items-center justify-center text-white shadow-sm shrink-0">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs min-[390px]:text-[13px] font-bold text-white truncate">
                    Instagram
                  </h4>
                  <p className="text-[10px] min-[390px]:text-[11px] text-white/60 truncate font-mono mt-0.5">
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
              className="rounded-[24px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
              title="WhatsApp Comercial"
            >
              <div className="flex items-center space-x-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm shrink-0">
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs min-[390px]:text-[13px] font-bold text-white truncate">
                    WhatsApp Comercial
                  </h4>
                  <p className="text-[10px] min-[390px]:text-[11px] text-white/60 truncate font-mono mt-0.5">
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
