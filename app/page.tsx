"use client"

import { useEffect, useState, useCallback, useRef } from "react"

// Sound effects with Web Audio API
function useGameAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)
  
  const getContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
      if (AudioCtx) audioContextRef.current = new AudioCtx()
    }
    return audioContextRef.current
  }, [])

  const playTone = useCallback((freq: number, duration: number, type: OscillatorType = "square", volume = 0.08) => {
    const ctx = getContext()
    if (!ctx) return
    if (ctx.state === "suspended") ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  }, [getContext])

  const hover = useCallback(() => playTone(440, 0.05, "sine", 0.04), [playTone])
  const select = useCallback(() => {
    playTone(523, 0.08)
    setTimeout(() => playTone(659, 0.08), 60)
    setTimeout(() => playTone(784, 0.12), 120)
  }, [playTone])
  const complete = useCallback(() => {
    playTone(523, 0.1)
    setTimeout(() => playTone(659, 0.1), 100)
    setTimeout(() => playTone(784, 0.1), 200)
    setTimeout(() => playTone(1047, 0.2), 300)
  }, [playTone])
  const error = useCallback(() => {
    playTone(200, 0.15, "sawtooth", 0.06)
    setTimeout(() => playTone(150, 0.2, "sawtooth", 0.06), 100)
  }, [playTone])
  const xpGain = useCallback(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => playTone(600 + i * 100, 0.08, "sine", 0.05), i * 40)
    }
  }, [playTone])
  const levelUp = useCallback(() => {
    const notes = [523, 659, 784, 1047, 784, 1047, 1318]
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.15, "square", 0.07), i * 80))
  }, [playTone])
  const streakFlame = useCallback(() => {
    playTone(880, 0.1, "sine", 0.05)
    setTimeout(() => playTone(1100, 0.15, "sine", 0.06), 80)
  }, [playTone])

  return { hover, select, complete, error, xpGain, levelUp, streakFlame, playTone }
}

// ElevenLabs TTS
function useVoice() {
  const speak = useCallback(async (text: string) => {
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.play()
        audio.onended = () => URL.revokeObjectURL(url)
      } else {
        // Fallback to browser TTS
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel()
          const u = new SpeechSynthesisUtterance(text)
          u.rate = 1.05
          u.pitch = 1.1
          window.speechSynthesis.speak(u)
        }
      }
    } catch {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
        const u = new SpeechSynthesisUtterance(text)
        u.rate = 1.05
        window.speechSynthesis.speak(u)
      }
    }
  }, [])
  return { speak }
}

export default function Home() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [xp, setXp] = useState(420)
  const [streak, setStreak] = useState(18)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [mounted, setMounted] = useState(false)
  const audio = useGameAudio()
  const { speak } = useVoice()

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      audio.streakFlame()
      speak("Welcome back, champion! Your 18 day streak is on fire!")
    }, 800)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNodeClick = (node: QuestNode, e: React.MouseEvent) => {
    if (node.state === "locked") {
      audio.error()
      speak("This quest is locked. Complete earlier quests first.")
      return
    }
    
    audio.select()
    setActiveNode(node.id)
    
    // Spawn XP particles
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id))), 1000)

    if (node.state === "active") {
      speak(node.bossIntro || "Boss battle awaits! Prepare yourself!")
    } else {
      speak(node.completedMessage || "Quest completed! Well done!")
    }
  }

  const handleStreakTap = () => {
    audio.streakFlame()
    setStreak(s => s + 1)
    speak(`${streak + 1} day streak! Incredible dedication!`)
  }

  const handleXpGain = () => {
    audio.xpGain()
    const gain = 50
    setXp(prev => {
      const next = prev + gain
      if (next >= 620) {
        setTimeout(() => {
          audio.levelUp()
          setShowLevelUp(true)
          speak("Level up! You are now level 8!")
          setTimeout(() => setShowLevelUp(false), 3000)
        }, 500)
        return 0
      }
      return next
    })
  }

  const questNodes: QuestNode[] = [
    { id: "basics", label: "Basics", x: 15, y: 78, state: "completed", stars: 3, completedMessage: "Basics mastered! You have learned greetings and introductions." },
    { id: "phrases", label: "Phrases", x: 28, y: 62, state: "completed", stars: 2, completedMessage: "Common phrases unlocked! Ready for real conversations." },
    { id: "food", label: "Food", x: 45, y: 50, state: "completed", stars: 3, completedMessage: "Food vocabulary complete! Order anything at a restaurant." },
    { id: "travel", label: "Travel", x: 55, y: 38, state: "active", bossIntro: "Boss battle: Navigate a busy train station using only Spanish!", isBoss: true },
    { id: "family", label: "Family", x: 70, y: 28, state: "locked" },
    { id: "work", label: "Work", x: 85, y: 15, state: "locked" },
  ]

  if (!mounted) return null

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#0d1117]">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(88, 204, 2, 0.12) 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(255, 200, 0, 0.08) 0%, transparent 40%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(28, 176, 246, 0.06) 0%, transparent 35%)" }} />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#58cc02]/30 animate-float-particle"
            style={{
              left: `${10 + (i * 4.5)}%`,
              top: `${20 + (i % 5) * 15}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* XP Particles */}
      {particles.map(p => (
        <div 
          key={p.id} 
          className="fixed w-3 h-3 rounded-full bg-[#ffc800] animate-xp-fly pointer-events-none z-50"
          style={{ left: p.x, top: p.y }}
        />
      ))}

      {/* Level Up Overlay */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
          <div className="text-center animate-level-up">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-5xl font-black text-[#58cc02] mb-2" style={{ textShadow: "0 0 40px rgba(88, 204, 2, 0.8)" }}>LEVEL UP!</h2>
            <p className="text-2xl font-bold text-white/90">You reached Level 8</p>
          </div>
        </div>
      )}

      {/* Top HUD - Minimal */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between">
        {/* Streak */}
        <button 
          onClick={handleStreakTap}
          onMouseEnter={audio.hover}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#ff9600]/20 border-2 border-[#ff9600]/50 hover:bg-[#ff9600]/30 transition-all hover:scale-105 active:scale-95"
        >
          <div className="relative w-8 h-10">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-8 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-[#ff9600] to-[#ffcc00] animate-flame" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-[#ffee00] to-[#ffffff] animate-flame-inner" />
          </div>
          <span className="text-2xl font-black text-[#ff9600]">{streak}</span>
        </button>

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
          <span className="text-[#58cc02]">duo</span>
          <span className="text-white">lingo</span>
        </h1>

        {/* XP */}
        <button
          onClick={handleXpGain}
          onMouseEnter={audio.hover}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#58cc02]/20 border-2 border-[#58cc02]/50 hover:bg-[#58cc02]/30 transition-all hover:scale-105 active:scale-95"
        >
          <span className="text-2xl font-black text-[#58cc02]">{xp}</span>
          <span className="text-sm font-bold text-[#58cc02]/70">XP</span>
        </button>
      </header>

      {/* Main Quest Map - Full Screen */}
      <div className="absolute inset-0 pt-20 pb-24">
        {/* Quest Path SVG */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pathGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#58cc02" />
              <stop offset="100%" stopColor="#89e219" />
            </linearGradient>
            <linearGradient id="pathGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffc800" />
              <stop offset="100%" stopColor="#ffee00" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Completed paths */}
          <path 
            d="M 15% 78% Q 22% 70% 28% 62%" 
            fill="none" 
            stroke="url(#pathGreen)" 
            strokeWidth="8" 
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <path 
            d="M 28% 62% Q 36% 56% 45% 50%" 
            fill="none" 
            stroke="url(#pathGreen)" 
            strokeWidth="8" 
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <path 
            d="M 45% 50% Q 50% 44% 55% 38%" 
            fill="none" 
            stroke="url(#pathGreen)" 
            strokeWidth="8" 
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Active path - pulsing */}
          <path 
            d="M 55% 38% Q 62% 33% 70% 28%" 
            fill="none" 
            stroke="url(#pathGold)" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray="15 10"
            className="animate-dash"
            filter="url(#glow)"
          />
          
          {/* Locked paths */}
          <path 
            d="M 70% 28% Q 77% 22% 85% 15%" 
            fill="none" 
            stroke="#3d4f5f" 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray="8 8"
            opacity="0.5"
          />
        </svg>

        {/* Quest Nodes */}
        {questNodes.map((node) => (
          <button
            key={node.id}
            onClick={(e) => handleNodeClick(node, e)}
            onMouseEnter={() => node.state !== "locked" && audio.hover()}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              node.state === "locked" ? "cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-95"
            } ${activeNode === node.id ? "scale-110" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div 
              className={`relative flex flex-col items-center justify-center rounded-full border-4 transition-all ${
                node.isBoss ? "w-24 h-24 md:w-28 md:h-28" : "w-16 h-16 md:w-20 md:h-20"
              } ${
                node.state === "completed" ? "bg-[#58cc02] border-[#45a302]" :
                node.state === "active" ? "bg-gradient-to-br from-[#ffc800] to-[#ff9600] border-[#e08600] animate-pulse-glow" :
                "bg-[#37464f] border-[#2b383f]"
              }`}
              style={{
                boxShadow: node.state === "active" 
                  ? "0 0 30px rgba(255, 200, 0, 0.6), 0 8px 0 #1a1a2a" 
                  : node.state === "completed"
                  ? "0 0 20px rgba(88, 204, 2, 0.4), 0 6px 0 #1a1a2a"
                  : "0 6px 0 #1a1a2a"
              }}
            >
              {/* Pulse rings for active */}
              {node.state === "active" && (
                <>
                  <span className="absolute inset-[-8px] rounded-full border-4 border-[#ffc800]/60 animate-ping-slow" />
                  <span className="absolute inset-[-16px] rounded-full border-2 border-[#ffc800]/30 animate-ping-slower" />
                </>
              )}

              {/* Icon */}
              {node.state === "completed" ? (
                <span className="text-2xl md:text-3xl text-white font-black">✓</span>
              ) : node.state === "active" ? (
                <span className="text-3xl md:text-4xl">⚔️</span>
              ) : (
                <span className="text-2xl md:text-3xl opacity-60">🔒</span>
              )}

              {/* Stars for completed */}
              {node.stars && node.state === "completed" && (
                <div className="absolute -bottom-1 flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-xs ${i < node.stars! ? "text-[#ffc800]" : "text-[#3d4f5f]"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {/* Boss crown */}
              {node.isBoss && (
                <span className="absolute -top-3 text-2xl animate-bounce-slow">👑</span>
              )}
            </div>

            {/* Label */}
            <span className={`mt-2 text-xs md:text-sm font-bold tracking-wide ${
              node.state === "locked" ? "text-[#5b6b76]" : "text-white"
            }`}>
              {node.label.toUpperCase()}
            </span>
          </button>
        ))}

        {/* Duo Character - Animated */}
        <div className="absolute left-[50%] bottom-[30%] -translate-x-1/2 animate-duo-float">
          <div className="relative">
            {/* Body */}
            <div className="w-16 h-20 md:w-20 md:h-24 bg-[#58cc02] rounded-[45%] border-4 border-[#45a302] relative" style={{ boxShadow: "0 6px 0 #2d5a01" }}>
              {/* Eyes */}
              <div className="absolute top-5 left-2.5 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full border-2 border-[#1a1a2a]">
                <div className="absolute top-1 left-1.5 w-2 h-2 bg-[#1a1a2a] rounded-full animate-eye-move" />
              </div>
              <div className="absolute top-5 right-2.5 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full border-2 border-[#1a1a2a]">
                <div className="absolute top-1 left-1.5 w-2 h-2 bg-[#1a1a2a] rounded-full animate-eye-move" />
              </div>
              {/* Beak */}
              <div className="absolute top-9 md:top-11 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-transparent border-t-[#ffc800]" style={{ filter: "drop-shadow(0 2px 0 #cc9900)" }} />
              {/* Wings */}
              <div className="absolute bottom-3 -left-2 w-4 h-6 bg-[#45a302] rounded-[40%] border-2 border-[#2d5a01] -rotate-12 animate-wing-flap" />
              <div className="absolute bottom-3 -right-2 w-4 h-6 bg-[#45a302] rounded-[40%] border-2 border-[#2d5a01] rotate-12 animate-wing-flap" />
            </div>
            {/* Shadow */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-black/30 rounded-full blur-sm" />
          </div>
        </div>
      </div>

      {/* Bottom Action Bar - Single Button */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 p-4 flex justify-center">
        <button
          onClick={() => {
            audio.select()
            speak("Starting your Spanish lesson. Get ready!")
          }}
          onMouseEnter={audio.hover}
          className="px-12 py-4 rounded-2xl bg-[#58cc02] text-white text-xl font-black uppercase tracking-wide transition-all hover:bg-[#45a302] hover:scale-105 active:scale-95 active:translate-y-1"
          style={{ boxShadow: "0 8px 0 #2d5a01, 0 12px 30px rgba(88, 204, 2, 0.4)" }}
        >
          Start Lesson
        </button>
      </footer>

      {/* Scanlines for retro feel */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)" }} />
    </main>
  )
}

interface QuestNode {
  id: string
  label: string
  x: number
  y: number
  state: "completed" | "active" | "locked"
  stars?: number
  completedMessage?: string
  bossIntro?: string
  isBoss?: boolean
}
