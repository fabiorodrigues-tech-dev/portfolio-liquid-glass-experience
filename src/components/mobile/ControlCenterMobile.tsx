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
  Sparkles,
  MapPin,
  X,
} from 'lucide-react'
import { AppleControlCenterIcon } from '../icons/ControlCenterIcon'
import type { ThemeMode, AccentColor } from '../../types'
import { PRIMARY_ACCENT_KEYS, ACCENT_COLORS } from '../../data/accentColors'
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

export const ControlCenterMobile: React.FC<ControlCenterMobileProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  accentColor,
  onChangeAccent,
  isFocusMode,
  onToggleFocusMode,
  isSoundEffectsEnabled = true,
  onToggleSoundEffects,
  isPlayingMusic,
  onTogglePlayMusic,
  soundVolume,
  onChangeVolume,
  onSkipTrack,
  onOpenExpandedPlayer,
}) => {
  // Screen Brightness (30% - 100%)
  const [brightness, setBrightness] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_brightness')
      return saved ? Math.max(30, Math.min(100, Number(saved))) : 100
    }
    return 100
  })

  const volume = soundVolume
  const setVolume = onChangeVolume

  const isDark = theme === 'dark'
  const isDraggingBrightnessRef = useRef(false)
  const isDraggingVolumeRef = useRef(false)

  // Sync brightness to HTML root element
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness}%)`
  }, [brightness])

  if (!isOpen) return null

  const triggerHaptic = () => {
    if (isSoundEffectsEnabled) {
      playHapticClick()
    }
  }

  // Pointer drag handler for vertical brightness slider
  const handleBrightnessPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const pct = Math.round(100 - (y / rect.height) * 100)
    const clamped = Math.max(30, Math.min(100, pct))
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-3xl p-5 pt-12 flex flex-col justify-start select-none text-white animate-in fade-in duration-200">
      {/* 1. Barra de Título */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AppleControlCenterIcon className="w-4 h-4 text-white/90" />
          <span className="text-sm font-semibold tracking-wide text-white/95">
            Central de Controle
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            triggerHaptic()
            onClose()
          }}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Linha 1 — Dois Quadrados Simétricos (Grid 2 colunas, aspect-square, rounded-[26px]) */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Quadrado Esquerdo (Controles Rápidos) */}
        <div className="aspect-square rounded-[26px] bg-white/[0.12] backdrop-blur-2xl p-3 border border-white/10 grid grid-cols-2 gap-2">
          {/* Botão 1: Status Recife (verde esmeralda) */}
          <div
            className="w-full h-full rounded-full bg-emerald-500/20 border border-emerald-500/30 flex flex-col items-center justify-center text-emerald-400 p-1 select-none"
            title="Recife — PE, Brasil (Online)"
          >
            <div className="relative">
              <MapPin className="w-5 h-5 text-[#34c759]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <span className="text-[9px] font-mono font-bold text-white mt-0.5">
              Recife
            </span>
          </div>

          {/* Botão 2: Alternador de Tema Dia/Noite (Sol âmbar / Lua azul) */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic()
              onToggleTheme()
            }}
            className={`w-full h-full rounded-full flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 p-1 ${
              isDark
                ? 'bg-blue-600/30 border border-blue-400/40 text-blue-400'
                : 'bg-amber-500/30 border border-amber-400/40 text-amber-300'
            }`}
            title="Alternar Tema Dia/Noite"
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span className="text-[9px] font-mono font-bold text-white mt-0.5">
              {isDark ? 'Noite' : 'Dia'}
            </span>
          </button>

          {/* Botão 3: Modo Foco (ícone de olho, azul quando ativo) */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic()
              onToggleFocusMode()
            }}
            className={`w-full h-full rounded-full flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 p-1 ${
              isFocusMode
                ? 'bg-[#0a84ff] border border-blue-400 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/15 border border-white/10 text-white/80'
            }`}
            title="Modo Foco (Oculta Dock)"
          >
            <Eye className="w-5 h-5" />
            <span className="text-[9px] font-mono font-bold text-white mt-0.5">
              Foco
            </span>
          </button>

          {/* Botão 4: Feedback Tátil SFX (ícone de centelha) */}
          <button
            type="button"
            onClick={() => {
              if (onToggleSoundEffects) {
                onToggleSoundEffects()
              }
              triggerHaptic()
            }}
            className={`w-full h-full rounded-full flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 p-1 ${
              isSoundEffectsEnabled
                ? 'bg-purple-600/30 border border-purple-400/40 text-purple-300'
                : 'bg-white/10 hover:bg-white/15 border border-white/10 text-white/60'
            }`}
            title="Feedback Tátil SFX"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[9px] font-mono font-bold text-white mt-0.5">
              SFX
            </span>
          </button>
        </div>

        {/* Quadrado Direito (Player de Música do iOS) */}
        <div
          onClick={onOpenExpandedPlayer}
          className="aspect-square rounded-[26px] bg-white/[0.12] backdrop-blur-2xl p-4 border border-white/10 flex flex-col justify-between text-white cursor-pointer group active:scale-[0.98] transition-all"
        >
          {/* Topo */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 block">
              Música Ambiente
            </span>
            <h3 className="text-xs font-bold text-white truncate mt-0.5">
              Lofi Chillout
            </h3>
          </div>

          {/* Centro: Botões de reprodução alinhados */}
          <div className="flex items-center justify-around py-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                triggerHaptic()
                onSkipTrack()
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
              title="Retroceder"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                triggerHaptic()
                onTogglePlayMusic()
              }}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-md"
              title={isPlayingMusic ? 'Pausar' : 'Reproduzir'}
            >
              {isPlayingMusic ? (
                <Pause className="w-4 h-4 fill-black" />
              ) : (
                <Play className="w-4 h-4 fill-black ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                triggerHaptic()
                onSkipTrack()
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform cursor-pointer"
              title="Avançar"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Rodapé: Link Expandir */}
          <div className="flex justify-end">
            <span className="text-[10px] font-semibold text-blue-400 group-hover:underline">
              Expandir ↗
            </span>
          </div>
        </div>
      </div>

      {/* 3. Linha 2 — Sliders Verticais Autênticos da Apple (Grid 2 colunas, h-38 / h-40) */}
      <div className="grid grid-cols-2 gap-3.5 mt-3">
        {/* Slider 1: Brilho */}
        <div
          onPointerDown={(e) => {
            try {
              e.currentTarget.setPointerCapture(e.pointerId)
            } catch {}
            isDraggingBrightnessRef.current = true
            handleBrightnessPointer(e)
          }}
          onPointerMove={(e) => {
            if (isDraggingBrightnessRef.current) {
              handleBrightnessPointer(e)
            }
          }}
          onPointerUp={(e) => {
            try {
              e.currentTarget.releasePointerCapture(e.pointerId)
            } catch {}
            isDraggingBrightnessRef.current = false
          }}
          onPointerCancel={() => {
            isDraggingBrightnessRef.current = false
          }}
          className="h-40 rounded-[28px] bg-white/[0.12] backdrop-blur-2xl relative overflow-hidden flex flex-col justify-end cursor-pointer border border-white/10 touch-none select-none"
          title="Brilho da Tela"
        >
          <div
            className="w-full bg-white transition-all duration-150 rounded-b-[28px]"
            style={{ height: `${brightness}%` }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white">
            <Sun className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">{brightness}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={brightness}
            onChange={(e) => {
              const val = Number(e.target.value)
              setBrightness(val)
              localStorage.setItem('macos_brightness', String(val))
            }}
            aria-label="Brilho da Tela"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
          />
        </div>

        {/* Slider 2: Volume */}
        <div
          onPointerDown={(e) => {
            try {
              e.currentTarget.setPointerCapture(e.pointerId)
            } catch {}
            isDraggingVolumeRef.current = true
            handleVolumePointer(e)
          }}
          onPointerMove={(e) => {
            if (isDraggingVolumeRef.current) {
              handleVolumePointer(e)
            }
          }}
          onPointerUp={(e) => {
            try {
              e.currentTarget.releasePointerCapture(e.pointerId)
            } catch {}
            isDraggingVolumeRef.current = false
          }}
          onPointerCancel={() => {
            isDraggingVolumeRef.current = false
          }}
          className="h-40 rounded-[28px] bg-white/[0.12] backdrop-blur-2xl relative overflow-hidden flex flex-col justify-end cursor-pointer border border-white/10 touch-none select-none"
          title="Volume do Som"
        >
          <div
            className="w-full bg-white transition-all duration-150 rounded-b-[28px]"
            style={{ height: `${volume}%` }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white">
            <Volume2 className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume do Som"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
          />
        </div>
      </div>

      {/* 4. Linha 3 — Seletor de Cores de Acento */}
      <div className="rounded-full bg-white/[0.12] backdrop-blur-2xl p-2.5 flex justify-around mt-3 border border-white/10">
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
                isSelected
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                  : 'opacity-80 hover:opacity-100'
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
  )
}

export default ControlCenterMobile
