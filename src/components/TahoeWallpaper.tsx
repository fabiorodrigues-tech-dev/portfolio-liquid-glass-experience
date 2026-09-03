import React, { useId } from 'react'
import type { ThemeMode } from '../types'

interface TahoeWallpaperProps {
  theme: ThemeMode
}

export const TahoeWallpaper: React.FC<TahoeWallpaperProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  const idPrefix = useId()

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none transition-colors duration-700 -z-10 overflow-hidden"
      style={{
        backgroundColor: isDark ? '#080a10' : '#eef2f8',
      }}
    >
      {/* Ambient gradient lighting layers */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 60% at 75% 20%, rgba(30, 80, 200, 0.45), transparent 70%), radial-gradient(circle 600px at 15% 85%, rgba(90, 30, 180, 0.35), transparent 60%), radial-gradient(circle 500px at 50% 50%, rgba(10, 120, 220, 0.25), transparent 70%)'
            : 'radial-gradient(ellipse 80% 60% at 20% 15%, rgba(255, 215, 150, 0.65), transparent 65%), radial-gradient(circle 700px at 85% 75%, rgba(130, 195, 255, 0.55), transparent 70%), radial-gradient(circle 500px at 50% 30%, rgba(255, 245, 220, 0.7), transparent 60%)',
        }}
      />

      {/* SVG Fluid Ribbons matching macOS Tahoe Official Wallpaper */}
      <svg
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for Tahoe Wave 1 */}
          <linearGradient id={`${idPrefix}-wave1-light`} x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#007aff" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#00b4d8" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#48cae4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#90e0ef" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-wave1-dark`} x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#003566" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#0077b6" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#0096c7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#48cae4" stopOpacity="0.3" />
          </linearGradient>

          {/* Gradients for Tahoe Wave 2 (Specular Silk Ridge) */}
          <linearGradient id={`${idPrefix}-wave2-light`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#0284c7" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#0369a1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-wave2-dark`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#1d4ed8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0.6" />
          </linearGradient>

          {/* Wave 3 - Deep Flow */}
          <linearGradient id={`${idPrefix}-wave3-light`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-wave3-dark`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#1e40af" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
          </linearGradient>

          {/* Golden Warmth for Light Mode / Cosmic Glow for Dark */}
          <linearGradient id={`${idPrefix}-glow-light`} x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-glow-dark`} x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Ambient Top Glow Wave */}
        <path
          d="M0,0 L1200,0 C950,200 650,300 400,320 C180,340 0,200 0,200 Z"
          fill={`url(#${idPrefix}-glow-${isDark ? 'dark' : 'light'})`}
        />

        {/* Wave 3: Background Ribbon Layer */}
        <path
          d="M0,750 C350,550 720,850 1100,680 C1450,520 1700,200 1920,80 L1920,1080 L0,1080 Z"
          fill={`url(#${idPrefix}-wave3-${isDark ? 'dark' : 'light'})`}
          className="transition-all duration-700"
        />

        {/* Wave 1: Main Fluid Silk Wave with Organic Tahoe S-Curve */}
        <path
          d="M0,450 C380,280 750,720 1150,560 C1500,420 1720,140 1920,0 L1920,820 C1600,980 1200,840 850,960 C500,1080 200,950 0,850 Z"
          fill={`url(#${idPrefix}-wave1-${isDark ? 'dark' : 'light'})`}
          className="transition-all duration-700"
        />

        {/* Wave 2: Foreground Liquid Ridge & Specular Highlight */}
        <path
          d="M1920,240 C1650,420 1350,680 980,680 C600,680 320,400 0,420 L0,620 C280,600 550,820 950,820 C1320,820 1620,540 1920,440 Z"
          fill={`url(#${idPrefix}-wave2-${isDark ? 'dark' : 'light'})`}
          className="transition-all duration-700"
        />
      </svg>

      {/* Subtle organic light motes that give liquid refraction depth through backdrop-blur */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-40 mix-blend-screen animate-pulse pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.4), transparent 70%)'
            : 'radial-gradient(circle, rgba(254, 215, 170, 0.6), transparent 70%)',
          top: '15%',
          left: '20%',
          animationDuration: '9s',
        }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-35 mix-blend-screen pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.35), transparent 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.45), transparent 70%)',
          bottom: '15%',
          right: '25%',
        }}
      />
    </div>
  )
}
