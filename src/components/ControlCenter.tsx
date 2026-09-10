import React, { useState, useEffect } from 'react'
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Sparkles,
  Play,
  Pause,
  SkipForward,
  Music,
  Layers,
} from 'lucide-react'
import type { AccentColor, ThemeMode, GlassStyle } from '../types'
import { playHapticClick } from '../lib/soundEffects'

interface ControlCenterProps {
  isOpen: boolean
  onClose: () => void
  theme: ThemeMode
  onToggleTheme: () => void
  accentColor?: AccentColor
  onChangeAccent?: (color: AccentColor) => void
  isFocusMode: boolean
  onToggleFocusMode: () => void
  glassStyle?: GlassStyle
  onToggleGlassStyle?: () => void
  isSoundEffectsEnabled?: boolean
  onToggleSoundEffects?: () => void
  isPlayingMusic: boolean
  onTogglePlayMusic: () => void
  soundVolume: number
  onChangeVolume: (vol: number) => void
  isSoundMuted: boolean
  onToggleMute: () => void
  onSkipTrack: () => void
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  isFocusMode,
  onToggleFocusMode,
  glassStyle = 'translucent',
  onToggleGlassStyle,
  isSoundEffectsEnabled = true,
  onToggleSoundEffects,
  isPlayingMusic,
  onTogglePlayMusic,
  soundVolume,
  onChangeVolume,
  isSoundMuted,
  onToggleMute,
  onSkipTrack,
}) => {
  // Screen Brightness state (60% to 100%) applied directly to <html> filter
  const [brightness, setBrightness] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_brightness')
      return saved ? Math.max(60, Math.min(100, Number(saved))) : 100
    }
    return 100
  })

  // Apply brightness filter to <html> tag
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness}%)`
    localStorage.setItem('macos_brightness', String(brightness))
  }, [brightness])

  if (!isOpen) return null

  const isDark = theme === 'dark'

  return (
    <>
      {/* Desktop: no dark backdrop — native macOS behaviour */}
      {/* Mobile only: dismissible scrim */}
      <div
        className="fixed inset-0 z-[39] md:hidden"
        onClick={onClose}
      />

      {/* Control Center Panel — macOS Native 5-Row Structure */}
      <div
        className={`fixed top-9 right-3 w-[330px] p-3 rounded-[22px] apple-liquid-glass control-center-panel ${
          isDark
            ? glassStyle === 'tinted'
              ? 'bg-[#0c0d14]/92 text-white'
              : 'bg-[#0c0d14]/75 text-white'
            : glassStyle === 'tinted'
            ? 'bg-white/95 text-zinc-950'
            : 'bg-[#f6f8fc]/90 text-zinc-950'
        } shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-150 border border-black/10 dark:border-white/15 select-none
        max-md:top-auto max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full max-md:rounded-t-[28px] max-md:rounded-b-none max-md:border-t max-md:border-x-0 max-md:border-b-0 max-md:px-4 max-md:pt-3 max-md:pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] max-md:max-h-[85dvh] max-md:overflow-y-auto max-md:slide-in-from-bottom max-md:z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Grabber Handle */}
        <div className="w-10 h-1 rounded-full bg-black/20 dark:bg-white/25 mx-auto mb-3 max-md:block hidden" />

        {/* ── LINHA 1 (Topo): Grid 2 Colunas (Conexões + Mídia) ──────────── */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Esquerda: Bloco com pílulas arredondadas de Conexões */}
          <div className="cc-tile bg-white/70 dark:bg-white/[0.05] rounded-[18px] p-2 flex flex-col justify-between gap-1 border border-black/6 dark:border-white/5">
            {/* Pill 1 — Status Recife */}
            <div className="flex items-center gap-2 px-1.5 py-1 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="overflow-hidden leading-tight">
                <div className="text-[11px] font-bold cc-text-primary text-zinc-900 dark:text-white truncate">Recife, PE</div>
                <div className="text-[9.5px] cc-text-secondary text-zinc-600 dark:text-zinc-400 truncate font-medium">macOS 26 Tahoe</div>
              </div>
            </div>

            {/* Divider */}
            <div className="cc-divider h-px bg-black/8 dark:bg-white/8 mx-1" />

            {/* Pill 2 — Liquid Glass (Translúcido / Tonalizado) */}
            <button
              type="button"
              onClick={() => {
                playHapticClick()
                onToggleGlassStyle?.()
              }}
              className={`flex items-center gap-2 px-1.5 py-1 rounded-xl transition-all cursor-pointer group text-left ${
                glassStyle === 'tinted'
                  ? 'bg-[#007aff]/15 dark:bg-[#0a84ff]/25'
                  : 'hover:bg-black/5 dark:hover:bg-white/8'
              }`}
              title="Alternar estilo óptico: Translúcido vs Tonalizado"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  glassStyle === 'tinted'
                    ? 'bg-[#007aff] text-white shadow-sm'
                    : 'bg-black/8 dark:bg-white/10 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden leading-tight flex-1 min-w-0">
                <div className="text-[11px] font-bold cc-text-primary text-zinc-900 dark:text-white truncate">Liquid Glass</div>
                <div className="text-[9.5px] cc-text-secondary text-zinc-600 dark:text-zinc-400 truncate font-medium">
                  {glassStyle === 'tinted' ? 'Tonalizado' : 'Translúcido'}
                </div>
              </div>
            </button>

            {/* Divider */}
            <div className="cc-divider h-px bg-black/8 dark:bg-white/8 mx-1" />

            {/* Pill 3 — Som do Site (Ativar / Desativar Efeitos Sonoros) */}
            <button
              type="button"
              onClick={() => {
                onToggleSoundEffects?.()
              }}
              className={`flex items-center gap-2 px-1.5 py-1 rounded-xl transition-all cursor-pointer group text-left ${
                isSoundEffectsEnabled
                  ? 'bg-[#34c759]/15 dark:bg-[#30d158]/25'
                  : 'hover:bg-black/5 dark:hover:bg-white/8'
              }`}
              title={isSoundEffectsEnabled ? 'Desativar som do site' : 'Ativar som do site'}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isSoundEffectsEnabled
                    ? 'bg-[#34c759] text-white shadow-sm'
                    : 'bg-black/8 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {isSoundEffectsEnabled ? (
                  <Volume2 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="overflow-hidden leading-tight flex-1 min-w-0">
                <div className="text-[11px] font-bold cc-text-primary text-zinc-900 dark:text-white truncate">Som do Site</div>
                <div className="text-[9.5px] cc-text-secondary text-zinc-600 dark:text-zinc-400 truncate font-medium">
                  {isSoundEffectsEnabled ? 'Ativado' : 'Desativado'}
                </div>
              </div>
            </button>
          </div>

          {/* Direita: Bloco de Mídia com capa, título e controles Play/Pause */}
          <div
            className="cc-media-card rounded-[18px] p-2.5 flex flex-col justify-between gap-2 relative overflow-hidden border border-black/6 dark:border-white/5"
            style={{
              background: isDark
                ? 'linear-gradient(145deg, rgba(88,40,156,0.38) 0%, rgba(20,22,35,0.65) 100%)'
                : 'linear-gradient(145deg, rgba(235, 230, 255, 0.90) 0%, rgba(220, 235, 255, 0.85) 100%)',
            }}
          >
            {/* Album Art & Title */}
            <div className="flex items-start gap-2.5">
              <div
                className={`relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 flex items-center justify-center shrink-0 overflow-hidden border transition-all duration-700 ${
                  isPlayingMusic
                    ? 'shadow-[0_0_18px_rgba(147,51,234,0.5)] border-white/25 scale-[1.04]'
                    : 'shadow-sm border-white/10 scale-100'
                }`}
              >
                <Music className={`w-4 h-4 absolute transition-all duration-500 ${isPlayingMusic ? 'opacity-20 scale-110' : 'opacity-50'} text-white`} />
                <div className="relative z-10 flex items-end gap-0.5 h-4">
                  {[0.6, 1, 0.75, 0.9].map((h, i) => (
                    <span
                      key={i}
                      className={`w-0.5 bg-white rounded-full ${isPlayingMusic ? 'animate-pulse' : ''}`}
                      style={{
                        height: isPlayingMusic ? `${h * 16}px` : '4px',
                        animationDelay: `${i * 0.12}s`,
                        animationDuration: `${0.45 + i * 0.08}s`,
                        transition: 'height 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="overflow-hidden flex-1 min-w-0">
                <div className="text-[11px] font-bold cc-text-primary text-zinc-900 dark:text-white truncate leading-tight">MIDNIGHT</div>
                <div className="text-[9.5px] cc-text-secondary text-zinc-600 dark:text-zinc-400 truncate font-medium">CHILL PHONK</div>
                <div className="text-[9px] cc-text-secondary text-zinc-500 dark:text-zinc-500 truncate">Nemi FM</div>
              </div>
            </div>

            {/* Controles Play/Pause & Pular */}
            <div className="flex items-center justify-between gap-1.5 pt-1">
              <button
                type="button"
                onClick={onTogglePlayMusic}
                className="flex-1 h-7 rounded-full bg-[#007aff] text-white flex items-center justify-center gap-1 text-[10px] font-semibold shadow-sm hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                title={isPlayingMusic ? 'Pausar' : 'Tocar'}
              >
                {isPlayingMusic ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    <span>Tocar</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onSkipTrack}
                className="w-7 h-7 rounded-full bg-black/8 dark:bg-white/12 text-zinc-800 dark:text-zinc-200 flex items-center justify-center hover:bg-black/15 dark:hover:bg-white/20 transition-all cursor-pointer"
                title="Pular faixa"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── LINHA 2: Bloco "Foco" em Cápsula Horizontal Arredondada ───── */}
        <button
          type="button"
          onClick={onToggleFocusMode}
          className={`cc-tile w-full mb-2 bg-white/70 dark:bg-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.08] rounded-[18px] p-2 flex items-center justify-between transition-all cursor-pointer border border-black/6 dark:border-white/5 text-left ${
            isFocusMode ? 'ring-1 ring-[#5856d6]/40 dark:ring-[#5e5ce6]/50' : ''
          }`}
          title="Modo Foco: Oculta o Dock para máxima concentração"
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isFocusMode ? 'bg-[#5856d6] text-white shadow-sm' : 'bg-black/8 dark:bg-white/10 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Moon
                className="w-3.5 h-3.5 rotate-45"
                fill={isFocusMode ? 'white' : 'currentColor'}
                stroke="none"
              />
            </div>
            <div>
              <div className="text-[11.5px] font-bold cc-text-primary text-zinc-900 dark:text-white leading-tight">Foco</div>
              <div className="text-[9.5px] cc-text-secondary text-zinc-600 dark:text-zinc-400 font-medium">
                {isFocusMode ? 'Ativo • Dock Oculto' : 'Desativado'}
              </div>
            </div>
          </div>
          <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
            isFocusMode
              ? 'bg-[#5856d6]/20 text-[#5856d6] dark:text-[#a5b4fc]'
              : 'bg-black/6 dark:bg-white/5 cc-text-secondary text-zinc-700 dark:text-zinc-400 font-semibold'
          }`}>
            {isFocusMode ? 'Ativo' : 'Ativar'}
          </div>
        </button>

        {/* ── LINHA 3: Slider Horizontal de "Tela" (Brilho) ──────────────── */}
        <div className="cc-tile bg-white/70 dark:bg-white/[0.05] rounded-[18px] px-3 py-2 mb-2 border border-black/6 dark:border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold cc-text-primary text-zinc-900 dark:text-zinc-300">Tela</span>
            <span className="text-[9.5px] font-mono cc-text-secondary text-zinc-600 dark:text-zinc-400 font-semibold">{brightness}%</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Sun dim */}
            <Sun className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
            {/* Barra horizontal fina com knob */}
            <div className="relative flex-1 h-5 flex items-center">
              <div className="relative w-full h-1.5 bg-black/10 dark:bg-white/15 rounded-full">
                <div
                  className="absolute left-0 top-0 h-full bg-[#ff9500] rounded-full transition-all"
                  style={{ width: `${Math.round(((brightness - 60) / 40) * 100)}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md pointer-events-none"
                  style={{ left: `calc(7px + ${(Math.round(((brightness - 60) / 40) * 100) / 100)} * (100% - 14px))` }}
                />
              </div>
              <input
                type="range"
                min="60"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title={`Brilho da Tela: ${brightness}%`}
              />
            </div>
            {/* Sun bright */}
            <Sun className="w-4 h-4 text-[#ff9500] shrink-0" />
          </div>
        </div>

        {/* ── LINHA 4: Slider Horizontal de "Som" (Volume) ───────────────── */}
        <div className="cc-tile bg-white/70 dark:bg-white/[0.05] rounded-[18px] px-3 py-2 mb-2 border border-black/6 dark:border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold cc-text-primary text-zinc-900 dark:text-zinc-300">Som</span>
            <span className="text-[9.5px] font-mono cc-text-secondary text-zinc-600 dark:text-zinc-400 font-semibold">{isSoundMuted ? '0%' : `${soundVolume}%`}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Volume/Headphone icon (mute/unmute) */}
            <button
              type="button"
              onClick={onToggleMute}
              className="shrink-0 p-0 bg-transparent cursor-pointer hover:opacity-75 transition-opacity"
              title={isSoundMuted ? 'Desmutar som' : 'Mutar som'}
            >
              {isSoundMuted || soundVolume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-[#ff3b30]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              )}
            </button>
            {/* Barra horizontal fina com knob */}
            <div className="relative flex-1 h-5 flex items-center">
              <div className="relative w-full h-1.5 bg-black/10 dark:bg-white/15 rounded-full">
                <div
                  className="absolute left-0 top-0 h-full bg-[#007aff] rounded-full transition-all"
                  style={{ width: isSoundMuted ? '0%' : `${soundVolume}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md pointer-events-none"
                  style={{ left: `calc(7px + ${((isSoundMuted ? 0 : soundVolume) / 100)} * (100% - 14px))` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soundVolume}
                onChange={(e) => onChangeVolume(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title={`Volume do Som: ${soundVolume}%`}
              />
            </div>
            {/* Sound right icon */}
            <Volume2 className="w-4 h-4 text-[#007aff] shrink-0" />
          </div>
        </div>

        {/* ── LINHA 5 (Base): Botão de Aparência (Modo Dia / Modo Noite) ── */}
        <button
          type="button"
          onClick={() => {
            playHapticClick()
            onToggleTheme()
          }}
          className="cc-tile w-full h-10 px-3 rounded-[18px] bg-white/70 dark:bg-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.08] border border-black/6 dark:border-white/5 flex items-center justify-between transition-all cursor-pointer text-left group"
          title={isDark ? 'Alternar para Modo Dia' : 'Alternar para Modo Noite'}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                isDark ? 'bg-amber-400/20 text-amber-400' : 'bg-[#007aff]/15 text-[#007aff]'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </div>
            <div className="overflow-hidden leading-tight">
              <div className="text-[11px] font-bold cc-text-primary text-zinc-900 dark:text-white truncate">
                {isDark ? 'Modo Dia' : 'Modo Noite'}
              </div>
              <div className="text-[9.5px] cc-text-secondary text-zinc-600 dark:text-zinc-400 truncate font-medium">
                Aparência do Sistema
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/6 dark:bg-white/5 cc-text-secondary text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">
            {isDark ? 'Escuro' : 'Claro'}
          </span>
        </button>
      </div>
    </>
  )
}
