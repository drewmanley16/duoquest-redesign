"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface AudioControllerProps {
  onSpeakText: (text: string) => void
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
}

export function AudioController({ onSpeakText, soundEnabled, setSoundEnabled }: AudioControllerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [ambientPlaying, setAmbientPlaying] = useState(false)
  const [ambientVolume, setAmbientVolume] = useState(0.3)
  const [currentAmbience, setCurrentAmbience] = useState<'scriptorium' | 'rain' | 'fire'>('scriptorium')
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const ambiences = {
    scriptorium: { name: "Scriptorium", description: "Quill scratches & quiet contemplation" },
    rain: { name: "Rainy Abbey", description: "Gentle rain on stone walls" },
    fire: { name: "Hearthside", description: "Crackling fire & warmth" }
  }

  const createAmbientNoise = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    
    const ctx = audioContextRef.current
    
    if (noiseNodeRef.current) {
      noiseNodeRef.current.stop()
      noiseNodeRef.current.disconnect()
    }
    
    const bufferSize = ctx.sampleRate * 4
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel)
      for (let i = 0; i < bufferSize; i++) {
        if (currentAmbience === 'scriptorium') {
          data[i] = (Math.random() * 2 - 1) * 0.1
        } else if (currentAmbience === 'rain') {
          data[i] = (Math.random() * 2 - 1) * 0.3 * (0.5 + Math.random() * 0.5)
        } else {
          const crackle = Math.random() > 0.98 ? Math.random() * 0.5 : 0
          data[i] = (Math.random() * 2 - 1) * 0.15 + crackle
        }
      }
    }
    
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = currentAmbience === 'rain' ? 800 : currentAmbience === 'fire' ? 400 : 200
    filter.Q.value = 1
    
    const gain = ctx.createGain()
    gain.gain.value = ambientVolume
    
    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    
    noiseNodeRef.current = source
    gainNodeRef.current = gain
    
    source.start()
  }, [currentAmbience, ambientVolume])

  const toggleAmbient = () => {
    if (ambientPlaying) {
      if (noiseNodeRef.current) {
        noiseNodeRef.current.stop()
        noiseNodeRef.current = null
      }
      setAmbientPlaying(false)
    } else {
      createAmbientNoise()
      setAmbientPlaying(true)
    }
  }

  const changeAmbience = (type: 'scriptorium' | 'rain' | 'fire') => {
    setCurrentAmbience(type)
    if (ambientPlaying) {
      setTimeout(() => {
        if (noiseNodeRef.current) {
          noiseNodeRef.current.stop()
        }
        createAmbientNoise()
      }, 50)
    }
  }

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = ambientVolume
    }
  }, [ambientVolume])

  useEffect(() => {
    return () => {
      if (noiseNodeRef.current) {
        noiseNodeRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-72 bg-background border border-muted-foreground/30 shadow-xl p-4 mb-2 unfurl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-muted-foreground/20">
            <h3 className="font-serif text-sm text-foreground">Sound Chamber</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">Voice Reading</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-10 h-5 rounded-full transition-colors ${soundEnabled ? 'bg-primary' : 'bg-muted-foreground/30'}`}
              >
                <span className={`block w-4 h-4 rounded-full bg-background shadow transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <p className="font-sans text-xs text-muted-foreground/70">
              Enable to hear pages read aloud
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">Ambient Writing Room</span>
              <button
                onClick={toggleAmbient}
                className={`px-3 py-1 text-xs font-sans transition-colors ${
                  ambientPlaying 
                    ? 'bg-primary text-background' 
                    : 'bg-muted-foreground/10 text-foreground hover:bg-muted-foreground/20'
                }`}
              >
                {ambientPlaying ? 'Stop' : 'Play'}
              </button>
            </div>

            <div className="space-y-2 mb-3">
              {(Object.keys(ambiences) as Array<keyof typeof ambiences>).map((key) => (
                <button
                  key={key}
                  onClick={() => changeAmbience(key)}
                  className={`w-full text-left px-3 py-2 transition-colors ${
                    currentAmbience === key 
                      ? 'bg-accent/20 border border-accent/40' 
                      : 'bg-muted-foreground/5 border border-transparent hover:bg-muted-foreground/10'
                  }`}
                >
                  <span className="font-sans text-sm text-foreground block">{ambiences[key].name}</span>
                  <span className="font-sans text-xs text-muted-foreground">{ambiences[key].description}</span>
                </button>
              ))}
            </div>

            {ambientPlaying && (
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ambientVolume}
                  onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-muted-foreground/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-muted-foreground/20">
            <button
              onClick={() => onSpeakText("Welcome to Codex, your sanctuary for written knowledge. Here you will find peace for your thoughts.")}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-foreground text-background font-sans text-xs hover:bg-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
              Test Voice
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isExpanded || ambientPlaying
            ? 'bg-primary text-background candlelight'
            : 'bg-background text-foreground border border-muted-foreground/30 hover:border-muted-foreground'
        }`}
        aria-label="Toggle sound controls"
      >
        {ambientPlaying ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        )}
      </button>
    </div>
  )
}
