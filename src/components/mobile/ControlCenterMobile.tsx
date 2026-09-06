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

// Especificação técnica Liquid Glass fiel ao iOS: blur(20px) saturate(180%)
const getLiquidGlassStyle = (isDark: boolean): React.CSSProperties => ({
  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.20)',
  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 8px 32px rgba(0, 0, 0, 0.25)',
  transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
})

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

  const liquidGlass = getLiquidGlassStyle(isDark)

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
      className="fixed inset-0 z-50 bg-black/55 dark:bg-black/70 backdrop-blur-3xl px-3 min-[390px]:px-4 pt-8 min-[390px]:pt-10 pb-14 flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in fade-in duration-200"
    >
      {/* 1. Botão de Fechar no Canto Superior Direito com bom respiro */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic()
          onClose()
        }}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 z-30 active:scale-90 transition-all shadow-sm"
        title="Fechar"
        aria-label="Fechar"
      >
        ✕
      </button>

      {/* 2. Barra Lateral Direita Flutuante (TRANCADA / INALTERADA) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-5 py-2 select-none">
        {/* Ícone 1: Controles (✦) */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic()
            setActiveTab('main')
          }}
          className={`p-1.5 transition-all cursor-pointer ${
            activeTab === 'main'
              ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
              : 'text-white/35 hover:text-white/70'
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
            activeTab === 'media'
              ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
              : 'text-white/35 hover:text-white/70'
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
            activeTab === 'connections'
              ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
              : 'text-white/35 hover:text-white/70'
          }`}
          title="Conexões e Links (📡)"
          aria-label="Conexões e Links"
        >
          <Radio className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Grid em Escala Autêntica iOS 26 (~92-94% da largura da tela) */}
      <div
        className={`w-full max-w-[395px] mx-auto flex flex-col ${
          activeTab === 'connections'
            ? 'my-auto justify-center items-center'
            : 'pr-8 min-[400px]:pr-9 gap-3.5 min-[400px]:gap-4'
        }`}
      >
        {/* ========================================================================= */}
        {/* PÁGINA 1: ✦ CONTROLES PRINCIPAIS (TELA PRINCIPAL)                         */}
        {/* ========================================================================= */}
        {activeTab === 'main' && (
          <div className="w-full flex flex-col gap-3.5 min-[400px]:gap-4 mx-auto animate-in fade-in slide-in-from-left-4 duration-300">
            {/* LINHA 1: Cluster de Conectividade (Esquerda) + Card de Mídia (Direita) */}
            <div className="w-full grid grid-cols-2 gap-3.5 min-[400px]:gap-4 h-[162px] min-[400px]:h-[170px] mx-auto">
              {/* Cluster de Conectividade (Bandeja com 4 pastilhas individuais) */}
              <div
                style={liquidGlass}
                className="apple-liquid-glass h-[162px] min-[400px]:h-[170px] rounded-[28px] p-3 grid grid-cols-2 gap-3 place-items-center select-none shadow-xl"
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

              {/* Card de Mídia: Mesma Altura (162-170px), mesmo raio (28px) e padding consistente */}
              <div
                style={liquidGlass}
                onClick={() => {
                  triggerHaptic()
                  setActiveTab('media')
                }}
                className="apple-liquid-glass h-[162px] min-[400px]:h-[170px] rounded-[28px] p-3.5 flex flex-col justify-between text-white cursor-pointer group active:scale-[0.98] transition-all duration-200 select-none shadow-xl"
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
            <div className="w-full grid grid-cols-2 gap-3.5 min-[400px]:gap-4 h-[162px] min-[400px]:h-[170px] mx-auto">
              {/* Lado Esquerdo: 2 Quadrados Superiores + Pílula Horizontal de Foco */}
              <div className="flex flex-col justify-between h-[162px] min-[400px]:h-[170px]">
                {/* 2 Botões Circulares Superiores (Bloqueio de Rotação + Espelhar Tela) */}
                <div className="grid grid-cols-2 gap-3.5 min-[400px]:gap-4 place-items-center h-[74px] min-[400px]:h-[78px]">
                  {/* Botão: Bloqueio de Orientação Oficial (Cadeado com Seta Curva Circular — Destaque quando ativo) */}
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic()
                      setIsOrientationLocked((prev) => !prev)
                    }}
                    style={
                      isOrientationLocked
                        ? { backgroundColor: '#ffffff', color: '#ff3b30' }
                        : liquidGlass
                    }
                    className={`w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200 shadow-md ${
                      isOrientationLocked
                        ? 'bg-white text-[#ff3b30] border border-white/40 shadow-[0_2px_14px_rgba(255,59,48,0.35)]'
                        : 'apple-liquid-glass text-white/85 hover:text-white'
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
                    style={liquidGlass}
                    className="apple-liquid-glass w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full flex items-center justify-center text-white/85 hover:text-white cursor-pointer active:scale-95 transition-all duration-200 shadow-md"
                    title="Espelhar Tela (AirPlay)"
                    aria-label="Espelhar Tela"
                  >
                    <ScreenMirroringIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Botão Foco: Pill Horizontal Oficial (Ícone + Label alinhado à esquerda dos sliders) */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    onToggleFocusMode()
                  }}
                  style={liquidGlass}
                  className={`apple-liquid-glass w-full h-[76px] min-[400px]:h-[80px] rounded-[24px] px-4 flex items-center gap-3.5 cursor-pointer active:scale-[0.98] transition-all duration-200 shadow-md ${
                    isFocusMode
                      ? 'border-indigo-400/40 bg-indigo-500/25'
                      : 'hover:brightness-110'
                  }`}
                  title="Modo Foco: Oculta o Dock e minimiza distrações"
                  aria-label="Modo Foco"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isFocusMode
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    <Moon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-[13.5px] font-bold text-white tracking-wide leading-tight">
                      Foco
                    </span>
                    <span className="text-[11px] text-white/50 leading-tight mt-0.5 font-medium">
                      {isFocusMode ? 'Ativado' : 'Desativado'}
                    </span>
                  </div>
                </button>
              </div>

              {/* Lado Direito: Sliders Verticais Mais Esguios e Arredondados (rounded-full) */}
              <div className="flex items-center justify-center gap-3.5 min-[400px]:gap-4 h-[162px] min-[400px]:h-[170px] w-full mx-auto">
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
                  style={liquidGlass}
                  className="apple-liquid-glass relative w-[50px] min-[400px]:w-[54px] h-[162px] min-[400px]:h-[170px] rounded-full overflow-hidden flex flex-col justify-end select-none shadow-xl cursor-pointer"
                  title="Brilho da Tela"
                >
                  {/* Preenchimento inferior */}
                  <div
                    className="w-full bg-white dark:bg-white/95 transition-all duration-75 rounded-b-full"
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
                  style={liquidGlass}
                  className="apple-liquid-glass relative w-[50px] min-[400px]:w-[54px] h-[162px] min-[400px]:h-[170px] rounded-full overflow-hidden flex flex-col justify-end select-none shadow-xl cursor-pointer"
                  title="Volume do Som"
                >
                  {/* Preenchimento inferior */}
                  <div
                    className="w-full bg-white dark:bg-white/95 transition-all duration-75 rounded-b-full"
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
                style={liquidGlass}
                className="apple-liquid-glass w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all duration-200 shadow-md hover:brightness-110"
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
                style={liquidGlass}
                className="apple-liquid-glass w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all duration-200 shadow-md hover:brightness-110"
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
                style={liquidGlass}
                className="apple-liquid-glass w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all duration-200 shadow-md hover:brightness-110"
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
                style={liquidGlass}
                className="apple-liquid-glass w-[58px] h-[58px] min-[400px]:w-[64px] min-[400px]:h-[64px] rounded-full flex items-center justify-center text-white/90 cursor-pointer active:scale-95 transition-all duration-200 shadow-md hover:brightness-110"
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
          <div className="w-full max-w-[340px] min-[400px]:max-w-[348px] h-[72vh] max-h-[570px] mx-auto translate-x-2 min-[400px]:translate-x-2.5 mt-12 min-[400px]:mt-16 rounded-[38px] bg-white/[0.12] backdrop-blur-3xl border border-white/20 p-6 shadow-2xl flex flex-col justify-between select-none text-white animate-in fade-in zoom-in-95 duration-200">
            {/* 1. Arte de Capa Grande Quadrada com Animação Ativa */}
            <div
              className={`relative w-full aspect-square rounded-[24px] bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 shadow-xl flex items-center justify-center overflow-hidden border transition-all duration-700 mb-3 ${
                isPlayingMusic
                  ? 'scale-[1.02] shadow-[0_0_45px_rgba(147,51,234,0.5)] border-white/30'
                  : 'scale-100 shadow-lg border-white/10'
              }`}
            >
              <Music
                className={`w-16 h-16 text-white/25 absolute transition-all duration-500 ${
                  isPlayingMusic ? 'scale-110 opacity-30' : 'opacity-60'
                }`}
              />

              {/* Barras de Equalizador da Apple no Centro da Capa */}
              <div className="relative z-10 flex items-end gap-1.5 h-10 select-none pointer-events-none">
                <span
                  className={`w-1.5 bg-white rounded-full transition-all duration-300 ${
                    isPlayingMusic ? 'h-8 animate-[pulse_0.6s_ease-in-out_infinite]' : 'h-2'
                  }`}
                />
                <span
                  className={`w-1.5 bg-white rounded-full transition-all duration-300 delay-100 ${
                    isPlayingMusic ? 'h-10 animate-[pulse_0.4s_ease-in-out_infinite]' : 'h-3'
                  }`}
                />
                <span
                  className={`w-1.5 bg-white rounded-full transition-all duration-300 delay-200 ${
                    isPlayingMusic ? 'h-6 animate-[pulse_0.7s_ease-in-out_infinite]' : 'h-2'
                  }`}
                />
                <span
                  className={`w-1.5 bg-white rounded-full transition-all duration-300 delay-150 ${
                    isPlayingMusic ? 'h-9 animate-[pulse_0.5s_ease-in-out_infinite]' : 'h-2.5'
                  }`}
                />
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
              style={liquidGlass}
              className="apple-liquid-glass rounded-[22px] border border-white/15 px-4 py-3.5 min-[390px]:py-4 flex items-center justify-between text-white transition-all active:scale-[0.98] group shadow-lg hover:brightness-110"
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
              style={liquidGlass}
              className="apple-liquid-glass rounded-[22px] border border-white/15 px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
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
              style={liquidGlass}
              className="apple-liquid-glass rounded-[22px] border border-white/15 px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
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
              style={liquidGlass}
              className="apple-liquid-glass rounded-[22px] border border-white/15 px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
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
              style={liquidGlass}
              className="apple-liquid-glass rounded-[22px] border border-white/15 px-4 py-3 min-[390px]:py-3.5 flex items-center justify-between text-white transition-all active:scale-[0.98] group hover:brightness-110"
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
