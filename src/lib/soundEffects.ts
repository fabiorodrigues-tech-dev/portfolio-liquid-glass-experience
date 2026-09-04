// Web Audio API AudioContext singleton
let audioCtx: AudioContext | null = null

/**
 * Dispara um micro-som tátil suave de clique característico do macOS.
 * Sintetizado puramente via Web Audio API com oscilador senoidal e envelope de ganho de 15ms.
 */
export function playHapticClick(): void {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext

    if (!AudioContextClass) return

    if (!audioCtx) {
      audioCtx = new AudioContextClass()
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    const now = audioCtx.currentTime
    const duration = 0.015 // 15ms de duração exata conforme solicitado

    // Frequência rápida com transição sutil (800Hz para 240Hz) criando um 'pop' mecânico refinado
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(240, now + duration)

    // Envelope exponencial de ganho com atenuação suave
    gain.gain.setValueAtTime(0.16, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(now)
    osc.stop(now + duration)
  } catch (err) {
    // Falhas silenciosas em caso de restrição de autoplay ou ambiente sem áudio
    console.debug('SFX tátil Web Audio API indisponível:', err)
  }
}
