import React, { useState, useEffect, useRef } from 'react'
import {
  Sun,
  Moon,
  Volume1,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MapPin,
  Music,
  Radio,
  Sparkles,
  ArrowUpRight,
  FolderOpen,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon, InstagramIcon } from '../icons/SocialIcons'
import type { ThemeMode, AccentColor } from '../../types'
import { playHapticClick } from '../../lib/soundEffects'

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
  onToggleSoundEffects,
  isPlayingMusic,
  onTogglePlayMusic,
  soundVolume,
  onChangeVolume,
  onSkipTrack,
  onPrevTrack,
  onNextTrack,
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
      className="fixed inset-0 z-50 bg-black/50 dark:bg-black/65 backdrop-blur-3xl p-4 pt-8 flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in fade-in duration-200"
    >
      {/* 1. Limpeza do Cabeçalho: Botão de Fechar no Canto Superior Direito */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic()
          onClose()
        }}
        className="absolute top-3 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 z-30 active:scale-90 transition-all"
        title="Fechar"
        aria-label="Fechar"
      >
        ✕
      </button>

      {/* 2. Barra Lateral Direita Flutuante 100% Livre e Translúcida (Sem calha nem fundo) */}
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

      {/* 3. Grid em Simetria Perfeita */}
      <div className="w-full max-w-[360px] mx-auto flex flex-col gap-3">
        {/* ========================================================================= */}
        {/* PÁGINA 1: ✦ CONTROLES PRINCIPAIS (TELA PRINCIPAL)                         */}
        {/* ========================================================================= */}
        {activeTab === 'main' && (
          <div className="w-full max-w-[330px] flex flex-col gap-3.5 mx-auto animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Linha 1: Dois Quadrados Simétricos (Grid 2 colunas, h-[145px] gap-3.5 max-w-[330px] mx-auto) */}
            <div className="w-full grid grid-cols-2 gap-3.5 h-[145px] max-w-[330px] mx-auto">
              {/* Bloco Esquerdo (4 Botões em Grid 2x2) */}
              <div
                style={LIQUID_GLASS_STYLE}
                className="h-[145px] rounded-[26px] border border-white/15 p-2.5 grid grid-cols-2 gap-2 place-items-center select-none"
              >
                {/* Botão 1 (Recife): bg-emerald-500/20 text-emerald-400 com ícone de pin */}
                <div
                  className="w-11 h-11 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center relative shadow-sm"
                  title="Recife, PE • BR (Status: Online)"
                >
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1.5 right-1.5 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-1.5 right-1.5" />
                </div>

                {/* Botão 2 (Tema Dia/Noite): bg-amber-500/20 text-amber-300 com ícone de Sol / Lua */}
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="w-11 h-11 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm"
                  title={isDark ? 'Modo Noite (Alternar para Dia)' : 'Modo Dia (Alternar para Noite)'}
                  aria-label={isDark ? 'Modo Noite' : 'Modo Dia'}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-amber-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-amber-300" />
                  )}
                </button>

                {/* Botão 3 (Modo Foco): bg-indigo-500/25 text-indigo-300 com ícone de lua */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    onToggleFocusMode()
                  }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm ${
                    isFocusMode
                      ? 'bg-indigo-500/40 text-indigo-200 border border-indigo-400/40'
                      : 'bg-indigo-500/25 text-indigo-300'
                  }`}
                  title="Modo Foco"
                  aria-label="Modo Foco"
                >
                  <Moon className="w-5 h-5 text-indigo-300" />
                </button>

                {/* Botão 4 (SFX Som): bg-purple-500/20 text-purple-300 com ícone de centelha */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    onToggleSoundEffects?.()
                  }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm ${
                    isSoundEffectsEnabled
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-purple-500/10 text-purple-300/40'
                  }`}
                  title={isSoundEffectsEnabled ? 'Efeitos Sonoros Ativos' : 'Efeitos Sonoros Mutados'}
                  aria-label="Efeitos Sonoros"
                >
                  <Sparkles className="w-5 h-5 text-purple-300" />
                </button>
              </div>

              {/* Bloco Direito (Música Compacto): Mantenha o card quadrado simétrico com arte, título e controles inalterados */}
              <div
                style={LIQUID_GLASS_STYLE}
                onClick={() => {
                  triggerHaptic()
                  setActiveTab('media')
                }}
                className="h-[145px] rounded-[26px] border border-white/15 p-3 flex flex-col justify-between text-white cursor-pointer group active:scale-[0.98] transition-all select-none"
                title="Abrir reprodutor de áudio"
              >
                {/* Topo: Capa e Título */}
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md shrink-0 relative overflow-hidden">
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

                {/* Equalizador animado minimalista do iOS */}
                <div className="flex items-center justify-center gap-1 my-0.5">
                  <span className={`w-1 bg-white/70 rounded-full transition-all ${isPlayingMusic ? 'h-3 animate-pulse' : 'h-1.5'}`} />
                  <span className={`w-1 bg-white/90 rounded-full transition-all ${isPlayingMusic ? 'h-5 animate-pulse delay-75' : 'h-2'}`} />
                  <span className={`w-1 bg-white/70 rounded-full transition-all ${isPlayingMusic ? 'h-4 animate-pulse delay-150' : 'h-1.5'}`} />
                  <span className={`w-1 bg-white/90 rounded-full transition-all ${isPlayingMusic ? 'h-6 animate-pulse delay-100' : 'h-2.5'}`} />
                  <span className={`w-1 bg-white/70 rounded-full transition-all ${isPlayingMusic ? 'h-3 animate-pulse delay-200' : 'h-1.5'}`} />
                </div>

                {/* Controles de Reprodução */}
                <div className="flex items-center justify-between px-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevTrack()
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
                      <Pause className="w-3.5 h-3.5 fill-black text-black" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextTrack()
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/75 hover:text-white active:scale-90 transition-transform cursor-pointer"
                    title="Avançar"
                  >
                    <SkipForward className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            {/* Linha 2: Redes Sociais com Cores Oficiais e Sliders Alinhados (max-w-[330px] mx-auto, h-[145px]) */}
            <div className="w-full grid grid-cols-2 gap-3.5 h-[145px] max-w-[330px] mx-auto">
              {/* Lado Esquerdo: Grid 2x2 dos 4 Botões de Contato */}
              <div className="grid grid-cols-2 gap-2.5 place-items-center h-[145px]">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/fabiorodrigues-dev/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center shadow-md active:scale-95 transition-transform overflow-hidden"
                  title="LinkedIn Oficial"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5581991851507"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-md active:scale-95 transition-transform overflow-hidden"
                  title="WhatsApp (+55 (81) 99185-1507)"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/fabiorodrigues-tech-dev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="w-12 h-12 rounded-full bg-[#24292e] flex items-center justify-center shadow-md active:scale-95 transition-transform overflow-hidden"
                  title="GitHub (Octocat)"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/f.a.rodrigues/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={triggerHaptic}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-md active:scale-95 transition-transform overflow-hidden"
                  title="Instagram (@f.a.rodrigues)"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>

              {/* Lado Direito: Os 2 Sliders Verticais (Brilho e Volume) com largura esguia de 68px e altura de 145px (rounded-[30px]) */}
              <div className="flex items-center justify-center gap-2.5 h-[145px]">
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
                  className="relative w-[68px] h-[145px] rounded-[30px] border border-white/15 overflow-hidden flex flex-col justify-end select-none shadow-lg cursor-pointer"
                  title="Brilho da Tela"
                >
                  <div
                    className="w-full bg-white transition-all duration-75 rounded-b-[30px]"
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
                  className="relative w-[68px] h-[145px] rounded-[30px] border border-white/15 overflow-hidden flex flex-col justify-end select-none shadow-lg cursor-pointer"
                  title="Volume do Som"
                >
                  <div
                    className="w-full bg-white transition-all duration-75 rounded-b-[30px]"
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
        {/* PÁGINA 2: 🎵 PLAYER DE ÁUDIO EXPANDIDO (MÍDIA - Conforme print 616cff)     */}
        {/* ========================================================================= */}
        {activeTab === 'media' && (
          <div className="w-[calc(100%-36px)] max-w-[350px] h-[78vh] max-h-[620px] mx-auto rounded-[38px] bg-white/[0.12] backdrop-blur-3xl border border-white/20 p-6 shadow-2xl flex flex-col justify-between select-none text-white animate-in fade-in zoom-in-95 duration-200">
            {/* 1. Arte de Capa Grande Quadrada */}
            <div className="w-full aspect-square rounded-[26px] bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 shadow-xl flex items-center justify-center overflow-hidden border border-white/10 mb-3">
              <Music className={`w-16 h-16 text-white/80 ${isPlayingMusic ? 'animate-pulse' : ''}`} />
            </div>

            {/* 2. Informações da Faixa */}
            <div className="flex items-center justify-between">
              <div className="truncate pr-2">
                <h3 className="font-bold text-base truncate">Lofi Chillout</h3>
                <p className="text-xs text-white/60 truncate">Fábio Rodrigues • Trilha Sonora</p>
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

            {/* 4. Controles Grandes de Reprodução */}
            <div className="flex items-center justify-center gap-9 my-1">
              <button
                type="button"
                onClick={prevTrack}
                className="text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
                title="Retroceder"
                aria-label="Retroceder"
              >
                <SkipBack className="w-7 h-7 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic()
                  onTogglePlayMusic()
                }}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-lg cursor-pointer"
                title={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
                aria-label={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
              >
                {isPlayingMusic ? (
                  <Pause className="w-6 h-6 fill-current text-black" />
                ) : (
                  <Play className="w-6 h-6 fill-current text-black ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={nextTrack}
                className="text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
                title="Avançar"
                aria-label="Avançar"
              >
                <SkipForward className="w-7 h-7 fill-current" />
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
          <div className="w-full max-w-[340px] pl-2 pr-14 flex flex-col gap-2.5 mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
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
