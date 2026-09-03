import React, { useState } from 'react'

interface TrafficLightsProps {
  onClose?: () => void
  onMinimize?: () => void
  onZoom?: () => void
  isMaximized?: boolean
}

export const TrafficLights: React.FC<TrafficLightsProps> = ({
  onClose,
  onMinimize,
  onZoom,
  isMaximized = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex items-center space-x-2 px-1 py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="group"
      aria-label="Controles da janela macOS"
    >
      {/* Vermelho (Fechar) */}
      <button
        type="button"
        onClick={onClose}
        className="w-3 h-3 rounded-full flex items-center justify-center transition-transform active:scale-90 relative cursor-default focus:outline-none"
        style={{
          backgroundColor: '#ff5f57',
          border: '1px solid #e0443e',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        }}
        title="Fechar janela"
        aria-label="Fechar"
      >
        <svg
          viewBox="0 0 6 6"
          className={`w-2 h-2 text-[#4c0002] transition-opacity duration-150 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
          fill="currentColor"
        >
          <path d="M0.8 0.1 L3 2.3 L5.2 0.1 L5.9 0.8 L3.7 3 L5.9 5.2 L5.2 5.9 L3 3.7 L0.8 5.9 L0.1 5.2 L2.3 3 L0.1 0.8 Z" />
        </svg>
      </button>

      {/* Amarelo (Minimizar) */}
      <button
        type="button"
        onClick={onMinimize}
        className="w-3 h-3 rounded-full flex items-center justify-center transition-transform active:scale-90 relative cursor-default focus:outline-none"
        style={{
          backgroundColor: '#febc2e',
          border: '1px solid #d89e24',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        }}
        title="Minimizar janela"
        aria-label="Minimizar"
      >
        <svg
          viewBox="0 0 6 6"
          className={`w-2 h-2 text-[#5c3e00] transition-opacity duration-150 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
          fill="currentColor"
        >
          <rect x="0.5" y="2.5" width="5" height="1" rx="0.5" />
        </svg>
      </button>

      {/* Verde (Expandir/Zoom) */}
      <button
        type="button"
        onClick={onZoom}
        className="w-3 h-3 rounded-full flex items-center justify-center transition-transform active:scale-90 relative cursor-default focus:outline-none"
        style={{
          backgroundColor: '#28c840',
          border: '1px solid #1aab29',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        }}
        title={isMaximized ? 'Restaurar tamanho' : 'Tela cheia'}
        aria-label="Zoom"
      >
        <svg
          viewBox="0 0 6 6"
          className={`w-2 h-2 text-[#0b4e18] transition-opacity duration-150 ${
            isHovered ? 'opacity-80' : 'opacity-0'
          }`}
          fill="currentColor"
        >
          <path d="M0.5 0.5 L2.5 0.5 L0.5 2.5 Z M5.5 5.5 L3.5 5.5 L5.5 3.5 Z" />
        </svg>
      </button>
    </div>
  )
}
