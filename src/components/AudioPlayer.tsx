import React, { useEffect, useRef } from 'react'

interface AudioPlayerProps {
  isPlaying: boolean
  volume: number // 0 to 100
  isMuted: boolean
  skipTrigger: number
  prevTrigger?: number
  onStateChange?: (isPlaying: boolean) => void
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  volume,
  isMuted,
  skipTrigger,
  prevTrigger = 0,
  onStateChange,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<any>(null)
  const isApiLoadedRef = useRef<boolean>(false)

  const isPlayingRef = useRef(isPlaying)
  const volumeRef = useRef(volume)
  const isMutedRef = useRef(isMuted)
  const onStateChangeRef = useRef(onStateChange)

  useEffect(() => {
    isPlayingRef.current = isPlaying
    volumeRef.current = volume
    isMutedRef.current = isMuted
    onStateChangeRef.current = onStateChange
  }, [isPlaying, volume, isMuted, onStateChange])

  // Load YouTube Iframe API once
  useEffect(() => {
    if (typeof window === 'undefined') return

    // If script is already inserted
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script')
      tag.id = 'youtube-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player('youtube-audio-iframe', {
          events: {
            onReady: (event: any) => {
              isApiLoadedRef.current = true
              event.target.setVolume(isMutedRef.current ? 0 : volumeRef.current)
              if (isPlayingRef.current) {
                event.target.playVideo()
              }
            },
            onStateChange: (event: any) => {
              // YT.PlayerState.PLAYING is 1, PAUSED is 2
              if (event.data === 1 && onStateChangeRef.current) {
                onStateChangeRef.current(true)
              } else if (event.data === 2 && onStateChangeRef.current) {
                onStateChangeRef.current(false)
              }
            },
          },
        })
      }
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback()
        initPlayer()
      }
    }
  }, [])

  // Handle Play/Pause
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        if (isPlaying) {
          playerRef.current.playVideo()
        } else {
          playerRef.current.pauseVideo()
        }
      } catch {
        // Fallback via postMessage
      }
    } else if (iframeRef.current?.contentWindow) {
      const func = isPlaying ? 'playVideo' : 'pauseVideo'
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: '' }),
        '*'
      )
    }
  }, [isPlaying])

  // Handle Volume & Mute
  useEffect(() => {
    const effectiveVolume = isMuted ? 0 : volume
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      try {
        playerRef.current.setVolume(effectiveVolume)
        if (isMuted) {
          playerRef.current.mute()
        } else {
          playerRef.current.unMute()
        }
      } catch {
        // Fallback via postMessage
      }
    } else if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'setVolume', args: [effectiveVolume] }),
        '*'
      )
      if (isMuted) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'mute', args: '' }),
          '*'
        )
      } else {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'unMute', args: '' }),
          '*'
        )
      }
    }
  }, [volume, isMuted])

  // Handle Skip / Next track
  useEffect(() => {
    if (skipTrigger === 0) return
    if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
      try {
        const currentTime = playerRef.current.getCurrentTime() || 0
        playerRef.current.seekTo(currentTime + 45, true)
      } catch {
        // Fallback
      }
    } else if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [60, true] }),
        '*'
      )
    }
  }, [skipTrigger])

  // Handle Prev / Rewind track
  useEffect(() => {
    if (prevTrigger === 0) return
    if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
      try {
        const currentTime = playerRef.current.getCurrentTime() || 0
        playerRef.current.seekTo(Math.max(0, currentTime - 30), true)
      } catch {
        // Fallback
      }
    } else if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }),
        '*'
      )
    }
  }, [prevTrigger])

  return (
    <div className="fixed -bottom-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1]">
      <iframe
        id="youtube-audio-iframe"
        ref={iframeRef}
        title="macOS Ambient Music - MIDNIGHT // CHILL PHONK"
        src="https://www.youtube-nocookie.com/embed/NJf4A2gjZok?enablejsapi=1&version=3&loop=1&playlist=NJf4A2gjZok&controls=0&playsinline=1&modestbranding=1"
        width="200"
        height="200"
        allow="autoplay; encrypted-media"
      />
    </div>
  )
}

export { CircularVisualizer } from './audio/CircularVisualizer'
