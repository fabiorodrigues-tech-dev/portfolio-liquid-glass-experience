import React, { useState, useEffect } from 'react'
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Palette,
  Check,
  Briefcase,
  Eye,
  EyeOff,
  FileDown,
  ArrowUpRight,
  Sparkles,
  Play,
  Pause,
  SkipForward,
  Music,
} from 'lucide-react'
import type { AccentColor, ThemeMode } from '../types'
import { ACCENT_COLORS, PRIMARY_ACCENT_KEYS } from '../data/accentColors'

interface ControlCenterProps {
  isOpen: boolean
  onClose: () => void
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
  isSoundMuted: boolean
  onToggleMute: () => void
  onSkipTrack: () => void
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  isOpen,
  onClose,
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
  isSoundMuted,
  onToggleMute,
  onSkipTrack,
}) => {
  // 1. Screen Brightness state (60% to 100%) applied directly to <html> filter
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

  const handleAccentChange = (colorKey: AccentColor) => {
    onChangeAccent(colorKey)
    const def = ACCENT_COLORS[colorKey]
    if (def) {
      const hex = theme === 'dark' ? def.dark : def.light
      document.documentElement.style.setProperty('--accent-color', hex)
    }
  }

  if (!isOpen) return null

  const isDark = theme === 'dark'
  const activeAccent = ACCENT_COLORS[accentColor] || ACCENT_COLORS.blue
  const accentHex = isDark ? activeAccent.dark : activeAccent.light

  return (
    <>
      {/* Backdrop for dismiss */}
      <div
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Control Center Panel */}
      <div
        className="fixed top-9 right-3 z-50 w-88 p-3 bg-[#f5f6fa]/95 dark:bg-[#0c0d14]/95 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 select-none shadow-2xl border border-black/10 dark:border-white/15 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Action Group: 3 Real Functional Buttons */}
          <div className="bg-black/[0.04] dark:bg-white/[0.04] rounded-2xl p-2.5 flex flex-col justify-between space-y-2 border border-black/10 dark:border-white/10">
            {/* Botão 1: Status Profissional (LinkedIn) */}
            <a
              href="https://www.linkedin.com/in/fabiorodrigues-dev/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
              title="Abrir perfil no LinkedIn"
            >
              <div className="w-7 h-7 rounded-full bg-[#0077b5] text-white flex items-center justify-center shrink-0 shadow-sm relative">
                <Briefcase className="w-3.5 h-3.5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#34c759] border border-white dark:border-[#161822] animate-pulse" />
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[11px] font-bold text-zinc-900 dark:text-white flex items-center gap-1 truncate">
                  <span>Disponível</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[9.5px] text-zinc-600 dark:text-zinc-400 truncate font-medium">
                  Contratação imediata
                </div>
              </div>
            </a>

            {/* Botão 2: Modo Foco (Toggle Ocultar Dock) */}
            <button
              type="button"
              onClick={onToggleFocusMode}
              className={`flex items-center space-x-2 p-1 rounded-xl transition-all text-left ${
                isFocusMode
                  ? 'bg-[#5856d6]/15 dark:bg-[#5e5ce6]/25 border border-[#5856d6]/30'
                  : 'hover:bg-black/5 dark:hover:bg-white/10'
              }`}
              title="Modo Foco: Oculta o Dock e expande a leitura"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isFocusMode
                    ? 'bg-[#5856d6] text-white shadow-sm'
                    : 'bg-black/10 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {isFocusMode ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">
                  Modo Foco
                </div>
                <div className="text-[9.5px] text-zinc-600 dark:text-zinc-400 truncate font-medium">
                  {isFocusMode ? 'Dock Oculto' : 'Dock Visível'}
                </div>
              </div>
            </button>

            {/* Botão 3: Download CV */}
            <a
              href="https://www.linkedin.com/in/fabiorodrigues-dev/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
              title="Baixar Currículo de Fábio Rodrigues"
            >
              <div className="w-7 h-7 rounded-full bg-[#34c759] text-white flex items-center justify-center shrink-0 shadow-sm">
                <FileDown className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight overflow-hidden">
                <div className="text-[11px] font-bold text-zinc-900 dark:text-white flex items-center gap-1 truncate">
                  <span>Download CV</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[9.5px] text-zinc-600 dark:text-zinc-400 truncate font-medium">
                  PDF Profissional
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Theme Switcher & System Specs */}
          <div className="flex flex-col space-y-2">
            {/* Apple Dark Mode Official Toggle Card */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="rounded-2xl p-2.5 flex-1 flex flex-col justify-between text-left transition-all active:scale-[0.98] group border border-black/10 dark:border-white/10"
              style={{
                background: isDark
                  ? 'rgba(10, 132, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.65)',
                borderColor: isDark
                  ? 'rgba(10, 132, 255, 0.35)'
                  : 'rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-[#007aff] text-white shadow-sm'
                      : 'bg-amber-400 text-amber-950 shadow-sm'
                  }`}
                >
                  {isDark ? (
                    <Moon className="w-3.5 h-3.5" />
                  ) : (
                    <Sun className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white">
                  {isDark ? 'Escuro' : 'Claro'}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-[12px] font-bold text-zinc-900 dark:text-white">
                  Aparência
                </div>
                <div className="text-[9.5px] text-zinc-600 dark:text-zinc-400 font-medium">
                  {isDark ? 'Vidro Fumê Profundo' : 'Vidro Perolado Calibrado'}
                </div>
              </div>
            </button>

            {/* Quick Status Pill */}
            <div className="bg-black/[0.04] dark:bg-white/[0.04] rounded-2xl p-2.5 flex items-center space-x-2 border border-black/10 dark:border-white/10">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">
                  macOS 26 Tahoe
                </div>
                <div className="text-[9.5px] text-zinc-600 dark:text-zinc-400 truncate font-medium">
                  Recife, PE • Brasil
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Brightness Slider (Controls HTML tag brightness 60% to 100%) */}
        <div className="bg-black/[0.04] dark:bg-white/[0.04] rounded-2xl p-2.5 mb-2 border border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
              <Sun className="w-3 h-3 text-[#ff9500]" /> Brilho da Tela
            </span>
            <span className="text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-400">
              {brightness}%
            </span>
          </div>
          <div className="relative h-6 bg-black/10 dark:bg-white/10 rounded-xl overflow-hidden flex items-center p-1">
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#007aff]/60 dark:bg-white/30 rounded-xl transition-all"
              style={{ width: `${((brightness - 60) / 40) * 100}%` }}
            />
            <input
              type="range"
              min="60"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              title={`Ajustar brilho: ${brightness}%`}
            />
            <Sun className="relative z-10 w-3.5 h-3.5 ml-2 text-zinc-900 dark:text-white/80 pointer-events-none" />
          </div>
        </div>

        {/* Ambient Music Player (YouTube ID: 2OVsnsqBpp8) */}
        <div className="bg-black/[0.04] dark:bg-white/[0.04] rounded-2xl p-2.5 mb-2 border border-black/10 dark:border-white/10 space-y-2">
          {/* Player Header & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Music className={`w-4 h-4 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
              </div>
              <div className="overflow-hidden">
                <div className="text-[11.5px] font-bold text-zinc-900 dark:text-white truncate">
                  Música Ambiente
                </div>
                <div className="text-[9.5px] text-zinc-600 dark:text-zinc-400 truncate font-medium">
                  YouTube • 2OVsnsqBpp8
                </div>
              </div>
            </div>

            {/* Play/Pause & Skip Buttons */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                type="button"
                onClick={onTogglePlayMusic}
                className="w-7 h-7 rounded-full bg-[#007aff] text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title={isPlayingMusic ? 'Pausar reprodução' : 'Iniciar música ambiente'}
              >
                {isPlayingMusic ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={onSkipTrack}
                className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer"
                title="Pular faixa / Avançar"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sound Volume Slider Connected to Player */}
          <div>
            <div className="flex items-center justify-between mb-1 px-0.5">
              <button
                type="button"
                onClick={onToggleMute}
                className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1 hover:text-[#007aff] transition-colors"
                title={isSoundMuted ? 'Desmutar som' : 'Mutar som'}
              >
                {isSoundMuted || soundVolume === 0 ? (
                  <VolumeX className="w-3 h-3 text-[#ff3b30]" />
                ) : (
                  <Volume2 className="w-3 h-3 text-[#007aff]" />
                )}
                <span>Volume {isSoundMuted ? '(Mudo)' : ''}</span>
              </button>
              <span className="text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-400">
                {isSoundMuted ? '0%' : `${soundVolume}%`}
              </span>
            </div>

            <div className="relative h-5 bg-black/10 dark:bg-white/10 rounded-xl overflow-hidden flex items-center p-1">
              <div
                className="absolute left-0 top-0 bottom-0 bg-[var(--accent-color,#007aff)] rounded-xl transition-all"
                style={{ width: isSoundMuted ? '0%' : `${soundVolume}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={soundVolume}
                onChange={(e) => {
                  onChangeVolume(Number(e.target.value))
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title={`Volume do player: ${soundVolume}%`}
              />
            </div>
          </div>
        </div>

        {/* Apple Tahoe Accent Color Palette Picker (5 Curated Colors) */}
        <div className="bg-black/[0.04] dark:bg-white/[0.04] rounded-2xl p-2.5 border border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between mb-2 px-0.5">
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
              <Palette className="w-3 h-3 text-current" /> Cor de Acento
            </span>
            <span
              className="text-[10px] font-bold capitalize"
              style={{ color: accentHex }}
            >
              {activeAccent.name}
            </span>
          </div>
          <div className="flex items-center justify-between gap-1 pt-0.5 px-1">
            {PRIMARY_ACCENT_KEYS.map((colorKey) => {
              const def = ACCENT_COLORS[colorKey]
              if (!def) return null
              const isSelected = accentColor === colorKey
              const colorHex = isDark ? def.dark : def.light

              return (
                <button
                  key={colorKey}
                  type="button"
                  onClick={() => handleAccentChange(colorKey)}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-115 active:scale-95 relative"
                  style={{
                    backgroundColor: colorHex,
                    boxShadow: isSelected
                      ? `0 0 0 2px ${isDark ? '#12141c' : '#ffffff'}, 0 0 0 4px ${colorHex}`
                      : 'inset 0 1px 1px rgba(255,255,255,0.4)',
                  }}
                  title={def.name}
                >
                  {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
