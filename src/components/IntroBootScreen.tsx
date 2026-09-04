import { useState, useEffect } from 'react'

export function IntroBootScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('portfolio_intro_seen')
    }
    return false
  })

  const [isMounted, setIsMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    // Trigger initial fade-in and scale animation
    const mountTimer = setTimeout(() => {
      setIsMounted(true)
      setProgress(100)
    }, 50)

    // At 1.6s, begin fade-out with blur and store seen flag
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      try {
        sessionStorage.setItem('portfolio_intro_seen', 'true')
      } catch {
        // Safe fallback if storage quota or access is restricted
      }
    }, 1600)

    // At 2.1s, remove component from DOM
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2100)

    return () => {
      clearTimeout(mountTimer)
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <div
      id="intro-boot-screen"
      data-boot-screen
      className={`fixed inset-0 z-50 bg-[#050507] flex flex-col items-center justify-center select-none transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 blur-md pointer-events-none' : 'opacity-100 blur-0'
      }`}
      style={{
        backgroundColor: '#050507',
      }}
    >
      {/* Background Soft Glow */}
      <div className="absolute w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      {/* Central Logo Badge: ⌘ in Liquid Glass with Breathing Scale & Fade */}
      <div
        className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-1000 ease-out relative z-10"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transform: isMounted ? 'scale(1)' : 'scale(0.95)',
          opacity: isMounted ? 1 : 0,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        }}
      >
        <span
          className="font-mono text-3xl sm:text-4xl font-bold select-none text-white"
          style={{ color: '#ffffff' }}
        >
          ⌘
        </span>
      </div>

      {/* Apple Progress Bar: 160px wide, 3px high */}
      <div className="w-40 h-[3px] bg-white/10 rounded-full overflow-hidden mt-8 relative z-10">
        <div
          className="h-full bg-gradient-to-r from-white/75 via-white to-white/90 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress}%`,
            transitionDuration: '1400ms',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
          }}
        />
      </div>

      {/* Technical Subtitle */}
      <p
        className="boot-subtitle font-mono text-[10px] tracking-[0.3em] text-zinc-400 mt-3 select-none uppercase relative z-10 transition-opacity duration-700"
        style={{
          color: '#a1a1aa',
          opacity: isMounted ? 1 : 0,
        }}
      >
        INICIALIZANDO PORTFÓLIO OS // RECIFE, PE
      </p>
    </div>
  )
}
