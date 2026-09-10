import React, { useEffect, useRef, useState, useCallback } from 'react'
import type { NovaState, TabType } from '../types'

// ─── Web Audio: duplo chime harmônico Apple Intelligence ──────────────────────
let _chimeCtx: AudioContext | null = null

function playNovaChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    if (!_chimeCtx) _chimeCtx = new AudioContextClass()
    if (_chimeCtx.state === 'suspended') _chimeCtx.resume()

    const ctx = _chimeCtx
    const freqs = [523.25, 659.25]
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const t = ctx.currentTime + i * 0.08
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.16, t + 0.025)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.5)
    })
  } catch (e) {
    console.debug('NOVA chime AudioContext unavailable:', e)
  }
}

interface NovaAssistantProps {
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
  novaSpeechState: NovaState
  onStateChange: (state: NovaState) => void
  onTogglePlay: () => void
  onSetTheme?: (theme: 'light' | 'dark') => void
  onToggleTheme?: () => void
  onToggleFocus: () => void
  onOpenSpotlight: (term?: string) => void
  onSelectTab?: (tab: TabType) => void
}

interface SpeechRecognitionResultItem {
  transcript: string
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: {
    [index: number]: {
      [index: number]: SpeechRecognitionResultItem
      isFinal?: boolean
      length: number
    }
    length: number
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onstart: (() => void) | null
  onresult: ((e: SpeechRecognitionEvent) => void) | null
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

function getSpeechRecognitionClass(): (new () => SpeechRecognitionInstance) | null {
  const w = window as unknown as Record<string, unknown>
  return (w['SpeechRecognition'] as (new () => SpeechRecognitionInstance)) ||
         (w['webkitSpeechRecognition'] as (new () => SpeechRecognitionInstance)) ||
         null
}

export const NovaAssistant: React.FC<NovaAssistantProps> = ({
  isActive,
  onActivate,
  onDeactivate,
  novaSpeechState: _novaSpeechState,
  onStateChange,
  onTogglePlay,
  onSetTheme,
  onToggleTheme,
  onToggleFocus,
  onOpenSpotlight,
  onSelectTab,
}) => {
  const [listeningText, setListeningText] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const spaceHoldRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const spaceDownRef = useRef(false)
  const isActiveRef = useRef(isActive)
  useEffect(() => {
    isActiveRef.current = isActive
  }, [isActive])

  const isExecutingRef = useRef(false)

  const closeNova = useCallback(() => {
    isExecutingRef.current = false
    onDeactivate()
  }, [onDeactivate])

  const togglePlay = useCallback(() => {
    onTogglePlay()
  }, [onTogglePlay])

  const toggleFocus = useCallback(() => {
    onToggleFocus()
  }, [onToggleFocus])

  const openSpotlightWith = useCallback((term: string) => {
    onOpenSpotlight(term)
  }, [onOpenSpotlight])

  const setTheme = useCallback((mode: 'light' | 'dark') => {
    if (onSetTheme) {
      onSetTheme(mode)
    } else if (onToggleTheme) {
      onToggleTheme()
    }
  }, [onSetTheme, onToggleTheme])

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort()
      } catch {
        /* noop */
      }
      recognitionRef.current = null
    }
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop())
      } catch {
        /* noop */
      }
      mediaStreamRef.current = null
    }
  }, [])

  const startRecognition = useCallback(() => {
    stopRecognition()

    const initRecognition = (SpeechRecognitionClass: new () => SpeechRecognitionInstance) => {
      try {
        const recognition = new SpeechRecognitionClass()
        recognition.lang = 'pt-BR'
        recognition.continuous = true
        recognition.interimResults = true

        recognition.onstart = () => {
          onStateChange('listening')
          setListeningText("Ouvindo... Fale 'tocar música'")
        }

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex !== undefined ? event.resultIndex : 0
          if (!event.results || !event.results[current] || !event.results[current][0]) return
          const raw = event.results[current][0].transcript
          const text = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

          // Exibe o que ouviu em tempo real na tela
          setListeningText(`Ouvi: "${raw}"`)

          if (text.includes('tocar') || text.includes('play') || text.includes('musica') || text.includes('som')) {
            isExecutingRef.current = true
            window.dispatchEvent(new CustomEvent('portfolio-music-play'))
            togglePlay()
            setListeningText('▶ Tocando música...')
            setTimeout(closeNova, 1200)
          } else if (text.includes('pausar') || text.includes('pause') || text.includes('parar')) {
            isExecutingRef.current = true
            window.dispatchEvent(new CustomEvent('portfolio-music-pause'))
            togglePlay()
            setListeningText('❚❚ Música pausada.')
            setTimeout(closeNova, 1200)
          } else if (text.includes('claro') || text.includes('dia')) {
            isExecutingRef.current = true
            document.documentElement.classList.remove('dark')
            setTheme('light')
            setListeningText('☀️ Modo Claro.')
            setTimeout(closeNova, 1200)
          } else if (text.includes('escuro') || text.includes('noite')) {
            isExecutingRef.current = true
            document.documentElement.classList.add('dark')
            setTheme('dark')
            setListeningText('🌙 Modo Escuro.')
            setTimeout(closeNova, 1200)
          } else if (text.includes('projeto')) {
            isExecutingRef.current = true
            window.dispatchEvent(new CustomEvent('portfolio-navigate', { detail: 'projects' }))
            if (onSelectTab) onSelectTab('projetos')
            setListeningText('📁 Abrindo Projetos...')
            setTimeout(closeNova, 800)
          } else if (text.includes('sobre')) {
            isExecutingRef.current = true
            window.dispatchEvent(new CustomEvent('portfolio-navigate', { detail: 'about' }))
            if (onSelectTab) onSelectTab('sobre')
            setListeningText('👤 Abrindo Sobre...')
            setTimeout(closeNova, 800)
          } else if (text.includes('contato')) {
            isExecutingRef.current = true
            window.dispatchEvent(new CustomEvent('portfolio-navigate', { detail: 'contact' }))
            if (onSelectTab) onSelectTab('contato')
            setListeningText('💬 Abrindo Contato...')
            setTimeout(closeNova, 800)
          } else if (text.includes('habilidade') || text.includes('skill')) {
            isExecutingRef.current = true
            window.dispatchEvent(new CustomEvent('portfolio-navigate', { detail: 'skills' }))
            if (onSelectTab) onSelectTab('habilidades')
            setListeningText('⚡ Abrindo Habilidades...')
            setTimeout(closeNova, 800)
          } else if (text.includes('foco') || text.includes('ocultar dock')) {
            isExecutingRef.current = true
            toggleFocus()
            setListeningText('🎯 Modo Foco alternado.')
            setTimeout(closeNova, 1000)
          } else if (text.includes('buscar')) {
            isExecutingRef.current = true
            const query = text.replace('buscar', '').trim()
            openSpotlightWith(query)
            setListeningText(`🔍 Buscando: "${query}"`)
            setTimeout(closeNova, 800)
          }
        }

        recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
          console.debug('NOVA SpeechRecognition error:', e.error)
          setListeningText('Erro: ' + e.error)
        }

        recognitionRef.current = recognition
        recognition.start()
      } catch (err) {
        console.debug('Error starting SpeechRecognition:', err)
        setListeningText('Erro ao iniciar microfone.')
      }
    }

    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream
          const SpeechRecognition = getSpeechRecognitionClass()
          if (!SpeechRecognition) {
            setListeningText('Navegador sem suporte a voz.')
            return
          }
          initRecognition(SpeechRecognition)
        })
        .catch(() => {
          setListeningText('Permissão de microfone negada no Chrome.')
        })
    } else {
      const SpeechRecognition = getSpeechRecognitionClass()
      if (!SpeechRecognition) {
        setListeningText('Navegador sem suporte a voz.')
        return
      }
      initRecognition(SpeechRecognition)
    }
  }, [
    stopRecognition,
    closeNova,
    togglePlay,
    setTheme,
    toggleFocus,
    openSpotlightWith,
    onSelectTab,
    onStateChange,
  ])

  useEffect(() => {
    if (isActive) {
      isExecutingRef.current = false
      playNovaChime()
      setListeningText('')
      startRecognition()
    } else {
      isExecutingRef.current = false
      onStateChange('idle')
      setListeningText('')
      stopRecognition()
    }
    return () => {
      stopRecognition()
    }
  }, [isActive, onStateChange, startRecognition, stopRecognition])

  // Space long-press activation / toggle
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return
      if (document.activeElement?.tagName === 'INPUT') return
      if (document.activeElement?.tagName === 'TEXTAREA') return
      if (spaceDownRef.current) return
      e.preventDefault()
      spaceDownRef.current = true
      spaceHoldRef.current = setTimeout(() => {
        if (isActiveRef.current) {
          onDeactivate()
        } else {
          onActivate()
        }
      }, 700)
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return
      spaceDownRef.current = false
      if (spaceHoldRef.current) {
        clearTimeout(spaceHoldRef.current)
        spaceHoldRef.current = null
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [onActivate, onDeactivate])

  // Escape to dismiss
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActiveRef.current) onDeactivate()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onDeactivate])

  if (!isActive) return null

  return (
    <>
      {/* 1. Borda Apple Intelligence 100% Encostada nos Eixos X e Y (Edge-to-Edge) */}
      <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen pointer-events-none z-50 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="apple-intelligence-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="25%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
            <filter id="edge-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="0"
            fill="none"
            stroke="url(#apple-intelligence-glow)"
            strokeWidth="5"
            filter="url(#edge-glow)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* 2. Cápsula de Transcrição da Voz */}
      <div className="nova-caption-capsule" role="status" aria-live="polite">
        <span className="nova-caption-dot" />
        <span style={{ color: 'rgba(168,85,247,0.95)', marginRight: 2, fontWeight: 700 }}>NOVA</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 4px' }}>//</span>
        <span style={{ color: 'rgba(255,255,255,0.85)' }}>
          {listeningText || "Ouvindo... Fale 'tocar música'"}
        </span>
      </div>
    </>
  )
}
