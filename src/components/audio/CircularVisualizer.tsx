import React, { useEffect, useRef } from 'react'

interface CircularVisualizerProps {
  isPlaying: boolean
  className?: string
  barCount?: number
  shape?: 'squircle' | 'circle'
}

/**
 * Calcula a distância do centro até a borda de um retângulo de cantos arredondados (squircle)
 * para um determinado ângulo theta.
 */
function getSquircleRadius(theta: number, hw: number, hh: number, r: number): number {
  const cos = Math.abs(Math.cos(theta))
  const sin = Math.abs(Math.sin(theta))

  const cornerX = Math.max(0, hw - r)
  const cornerY = Math.max(0, hh - r)

  // Segmento reto horizontal
  if (cos > 0.0001 && (sin / cos) <= (cornerY / hw)) {
    return hw / cos
  }

  // Segmento reto vertical
  if (sin > 0.0001 && (cos / sin) <= (cornerX / hh)) {
    return hh / sin
  }

  // Canto arredondado (interseção do raio com o arco circular)
  const b = cornerX * cos + cornerY * sin
  const c = cornerX * cornerX + cornerY * cornerY - r * r
  const disc = b * b - c

  if (disc >= 0) {
    return b + Math.sqrt(disc)
  }

  return Math.min(hw / Math.max(cos, 0.001), hh / Math.max(sin, 0.001))
}

/**
 * Visualizador de Áudio Circular (Circular Mirrored Bar Spectrum)
 * Inspirado nas visualizações de áudio do Tuneform e Apple Music.
 * Renderiza 60 barras de espectro radiais a 60 FPS com HTML5 Canvas 2D.
 */
export const CircularVisualizer: React.FC<CircularVisualizerProps> = ({
  isPlaying,
  className = 'absolute inset-0 w-full h-full pointer-events-none',
  barCount = 60,
  shape = 'squircle',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isPlayingRef = useRef(isPlaying)
  const animFrameIdRef = useRef<number | null>(null)

  // Alturas atuais de cada barra para interpolação suave (lerp)
  const barHeightsRef = useRef<Float32Array>(new Float32Array(barCount).fill(2))

  // Escala suave do raio interno ao entrar no estado de play
  const currentScaleRef = useRef(isPlaying ? 1.05 : 1.0)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let startTime = performance.now()

    // Resolução Retina / Hi-DPI
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    }

    handleResize()
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas)

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
      const width = rect.width
      const height = rect.height

      if (width <= 0 || height <= 0) {
        animFrameIdRef.current = requestAnimationFrame(render)
        return
      }

      ctx.save()
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      const playing = isPlayingRef.current
      const t = (time - startTime) * 0.0035

      // Animação de escala suave acompanhando o 'scale-105' da capa
      const targetScale = playing ? 1.05 : 1.0
      currentScaleRef.current += (targetScale - currentScaleRef.current) * 0.12
      const activeScale = currentScaleRef.current

      // Dimensões da capa (72% da largura do container)
      const coverWidth = width * 0.72 * activeScale
      const hw = coverWidth / 2
      const hh = coverWidth / 2
      const cornerRadius = 22 * (coverWidth / 220)

      const currentHeights = barHeightsRef.current
      const angleStep = (2 * Math.PI) / barCount
      const barWidth = Math.max(2.2, Math.min(3.6, (width * 0.01)))

      // Brilho holográfico violeta/ciano
      if (playing) {
        ctx.shadowColor = 'rgba(6, 182, 212, 0.45)'
        ctx.shadowBlur = 8
      } else {
        ctx.shadowBlur = 0
      }

      for (let i = 0; i < barCount; i++) {
        const theta = i * angleStep - Math.PI / 2

        // Raio interno rente à borda da capa do álbum
        let baseRadius: number
        if (shape === 'squircle') {
          baseRadius = getSquircleRadius(theta, hw, hh, cornerRadius) + 4
        } else {
          baseRadius = hw + 4
        }

        // Espectro espelhado (Tuneform mirrored bar spectrum)
        let targetHeight = 2

        if (playing) {
          const half = barCount / 2
          const symIndex = i < half ? i / half : (barCount - i) / half

          // Frequências rítmicas inspiradas no estilo Chill Phonk
          const lowFreq = Math.sin(symIndex * Math.PI * 2.2 - t * 4.5) * 0.38
          const midFreq = Math.sin(symIndex * Math.PI * 5.8 + t * 6.2) * 0.32
          const highFreq = Math.cos(symIndex * Math.PI * 11.5 - t * 8.8) * 0.22
          const beat = Math.pow(Math.max(0, Math.sin(t * 6.2)), 4) * 0.5

          const combined = Math.max(0, 0.15 + lowFreq + midFreq + highFreq + beat * (1 - symIndex * 0.4))
          // Altura entre 4px e 24px conforme especificação
          targetHeight = 4 + Math.min(20, combined * 22)
        } else {
          // Em pausa, encolhe suavemente para 2px
          targetHeight = 2
        }

        // Interpolação suave a 60 FPS
        currentHeights[i] += (targetHeight - currentHeights[i]) * 0.2
        const h = currentHeights[i]

        const r1 = baseRadius
        const r2 = baseRadius + h

        const x1 = cx + Math.cos(theta) * r1
        const y1 = cy + Math.sin(theta) * r1
        const x2 = cx + Math.cos(theta) * r2
        const y2 = cy + Math.sin(theta) * r2

        // Gradiente radial da barra: violeta (#a855f7) -> ciano (#06b6d4) -> branco (#ffffff)
        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, '#a855f7')
        grad.addColorStop(0.65, '#06b6d4')
        grad.addColorStop(1, '#ffffff')

        ctx.strokeStyle = grad
        ctx.lineWidth = barWidth
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      ctx.restore()
      animFrameIdRef.current = requestAnimationFrame(render)
    }

    animFrameIdRef.current = requestAnimationFrame(render)

    return () => {
      resizeObserver.disconnect()
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [barCount, shape])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  )
}

export default CircularVisualizer
