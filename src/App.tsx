import { useState, useEffect, useCallback } from 'react'
import type { AccentColor, Project, TabType, ThemeMode, GlassStyle } from './types'
import { TahoeWallpaper } from './components/TahoeWallpaper'
import { MenuBar } from './components/MenuBar'
import { WindowFrame } from './components/WindowFrame'
import { ControlCenter } from './components/ControlCenter'
import { SpotlightModal } from './components/SpotlightModal'
import { ProjectQuickLook } from './components/ProjectQuickLook'
import { Dock } from './components/Dock'
import { AudioPlayer } from './components/AudioPlayer'
import { IntroBootScreen } from './components/IntroBootScreen'
import { IOSMobileExperience } from './components/mobile/IOSMobileExperience'
import { PROJECTS_DATA } from './data/portfolioData'
import { ACCENT_COLORS } from './data/accentColors'
import { playHapticClick } from './lib/soundEffects'

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_theme') as ThemeMode
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  })

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_accent') as AccentColor
      if (saved) return saved
    }
    return 'blue'
  })

  const [glassStyle, setGlassStyle] = useState<GlassStyle>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_glass_style') as GlassStyle
      if (saved) return saved
    }
    return 'translucent'
  })

  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('macos_sfx_enabled')
      if (saved !== null) return saved === 'true'
    }
    return true
  })

  const [activeTab, setActiveTab] = useState<TabType>('projetos')
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isFocusMode, setIsFocusMode] = useState(false)

  // YouTube Ambient Audio State (YouTube ID: 2OVsnsqBpp8)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [soundVolume, setSoundVolume] = useState(70)
  const [isSoundMuted, setIsSoundMuted] = useState(false)
  const [skipTrigger, setSkipTrigger] = useState(0)


  // Synchronize document dark class & local storage
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('macos_theme', theme)
  }, [theme])

  // Synchronize glass mode (translucent vs tinted) to html element & localStorage
  useEffect(() => {
    const root = document.documentElement
    if (glassStyle === 'tinted') {
      root.classList.add('glass-tinted')
    } else {
      root.classList.remove('glass-tinted')
    }
    localStorage.setItem('macos_glass_style', glassStyle)
  }, [glassStyle])

  // Synchronize SFX state to localStorage
  useEffect(() => {
    localStorage.setItem('macos_sfx_enabled', String(isSoundEffectsEnabled))
  }, [isSoundEffectsEnabled])

  // Synchronize accent color to CSS variable --accent-color and local storage
  useEffect(() => {
    const def = ACCENT_COLORS[accentColor]
    if (def) {
      const hex = theme === 'dark' ? def.dark : def.light
      document.documentElement.style.setProperty('--accent-color', hex)
    }
    localStorage.setItem('macos_accent', accentColor)
  }, [accentColor, theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      const isDark = next === 'dark'
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return next
    })
  }

  const toggleGlassStyle = () => {
    setGlassStyle((prev) => (prev === 'translucent' ? 'tinted' : 'translucent'))
  }

  const toggleSoundEffects = () => {
    setIsSoundEffectsEnabled((prev) => {
      const next = !prev
      if (next) {
        playHapticClick()
      }
      return next
    })
  }

  const handleTabChange = useCallback((tab: TabType) => {
    if (isSoundEffectsEnabled) {
      playHapticClick()
    }
    setActiveTab(tab)
  }, [isSoundEffectsEnabled])

  const togglePlayMusic = () => {
    setIsPlayingMusic((prev) => !prev)
  }

  const toggleMute = () => {
    setIsSoundMuted((prev) => !prev)
  }

  const skipTrack = () => {
    setSkipTrigger((prev) => prev + 1)
  }

  // Global keyboard shortcuts (Cmd+K, Tab switching with keys 1-4, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSpotlightOpen((prev) => !prev)
      } else if (e.key === '1') {
        handleTabChange('projetos')
      } else if (e.key === '2') {
        handleTabChange('sobre')
      } else if (e.key === '3') {
        handleTabChange('habilidades')
      } else if (e.key === '4') {
        handleTabChange('contato')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleTabChange])


  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP EXPERIENCE: macOS 26 Tahoe (telas lg / >= 1024px)              */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex relative w-screen h-screen h-[100dvh] overflow-hidden flex-col justify-between text-zinc-900 dark:text-white">
        {/* 1. Official macOS Tahoe Dynamic Silk Wave Wallpaper */}
        <TahoeWallpaper theme={theme} />

        {/* 2. Fixed Continuous Top macOS Menu Bar */}
        <MenuBar
          onOpenSpotlight={() => setIsSpotlightOpen(true)}
          onToggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
          isControlCenterOpen={isControlCenterOpen}
          onSelectTab={handleTabChange}
          theme={theme}
        />

        {/* 3. Main Window Frame (Liquid Glass Large) */}
        <div className="flex-1 flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <WindowFrame
            activeTab={activeTab}
            onTabChange={handleTabChange}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenSpotlight={() => setIsSpotlightOpen(true)}
            onSelectProject={setSelectedProject}
            isFocusMode={isFocusMode}
          />
        </div>

        {/* 4. Official Apple Control Center Flyout */}
        <ControlCenter
          isOpen={isControlCenterOpen}
          onClose={() => setIsControlCenterOpen(false)}
          theme={theme}
          onToggleTheme={toggleTheme}
          accentColor={accentColor}
          onChangeAccent={setAccentColor}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
          glassStyle={glassStyle}
          onToggleGlassStyle={toggleGlassStyle}
          isSoundEffectsEnabled={isSoundEffectsEnabled}
          onToggleSoundEffects={toggleSoundEffects}
          isPlayingMusic={isPlayingMusic}
          onTogglePlayMusic={togglePlayMusic}
          soundVolume={soundVolume}
          onChangeVolume={setSoundVolume}
          isSoundMuted={isSoundMuted}
          onToggleMute={toggleMute}
          onSkipTrack={skipTrack}
        />

        {/* 6. macOS Spotlight Search Dialog (Cmd + K) */}
        <SpotlightModal
          isOpen={isSpotlightOpen}
          onClose={() => setIsSpotlightOpen(false)}
          onSelectTab={handleTabChange}
          onOpenProject={(id) => {
            const found = PROJECTS_DATA.find((p) => p.id === id)
            if (found) setSelectedProject(found)
          }}
          theme={theme}
        />

        {/* 8. macOS Floating Dock at Bottom with Physical Magnification & Focus Mode */}
        <Dock
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          onToggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
          theme={theme}
          isFocusMode={isFocusMode}
        />

        {/* 9. macOS Intro Boot Screen (First Visit) */}
        <IntroBootScreen />
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE EXPERIENCE: iOS 26 (telas < 1024px)                             */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full min-h-screen relative">
        <IOSMobileExperience
          theme={theme}
          onToggleTheme={toggleTheme}
          accentColor={accentColor}
          onChangeAccent={setAccentColor}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
          isPlayingMusic={isPlayingMusic}
          onTogglePlayMusic={togglePlayMusic}
          soundVolume={soundVolume}
          onChangeVolume={setSoundVolume}
          onSkipTrack={skipTrack}
          soundEffectsEnabled={isSoundEffectsEnabled}
          onToggleSoundEffects={toggleSoundEffects}
          onSelectProject={setSelectedProject}
        />
      </div>

      {/* Quick Look Inspector Modal (Shared for Desktop & Mobile) */}
      <ProjectQuickLook
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
      />

      {/* ========================================================================= */}
      {/* 3. PERSISTENT BACKGROUND SERVICES (YouTube Ambient Audio)                 */}
      {/* ========================================================================= */}
      <AudioPlayer
        isPlaying={isPlayingMusic}
        volume={soundVolume}
        isMuted={isSoundMuted}
        skipTrigger={skipTrigger}
        onStateChange={setIsPlayingMusic}
      />
    </>
  )
}

export default App
