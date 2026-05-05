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

  return { hover, select, complete, error, xpGain, levelUp, streakFlame }
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
  icon: string
}

export default function Home() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [xp, setXp] = useState(420)
  const [streak, setStreak] = useState(18)
  const [level, setLevel] = useState(7)
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
          setLevel(l => l + 1)
          speak(`Level up! You are now level ${level + 1}!`)
          setTimeout(() => setShowLevelUp(false), 3000)
        }, 500)
        return 0
      }
      return next
    })
  }

  const questNodes: QuestNode[] = [
    { id: "basics", label: "Basics", x: 20, y: 80, state: "completed", stars: 3, icon: "👋", completedMessage: "Basics mastered! You have learned greetings and introductions." },
    { id: "phrases", label: "Phrases", x: 35, y: 65, state: "completed", stars: 2, icon: "💬", completedMessage: "Common phrases unlocked! Ready for real conversations." },
    { id: "food", label: "Food", x: 50, y: 50, state: "completed", stars: 3, icon: "🍕", completedMessage: "Food vocabulary complete! Order anything at a restaurant." },
    { id: "travel", label: "Travel", x: 65, y: 38, state: "active", icon: "✈️", bossIntro: "Boss battle: Navigate a busy train station using only Spanish!", isBoss: true },
    { id: "family", label: "Family", x: 80, y: 25, state: "locked", icon: "👨‍👩‍👧" },
  ]

  if (!mounted) return null

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ background: "linear-gradient(180deg, #131f24 0%, #0d1117 50%, #1a2c38 100%)" }}>
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(88, 204, 2, 0.4) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(28, 176, 246, 0.5) 0%, transparent 60%)", filter: "blur(60px)" }} />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(255, 200, 0, 0.4) 0%, transparent 60%)", filter: "blur(50px)" }} />
        
        {/* Floating sparkles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full animate-float-particle"
            style={{
              background: i % 3 === 0 ? "#58cc02" : i % 3 === 1 ? "#ffc800" : "#1cb0f6",
              left: `${5 + (i * 6.5)}%`,
              top: `${15 + (i % 6) * 14}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 4)}s`,
              boxShadow: `0 0 10px ${i % 3 === 0 ? "#58cc02" : i % 3 === 1 ? "#ffc800" : "#1cb0f6"}`
            }}
          />
        ))}
      </div>

      {/* XP Particles */}
      {particles.map(p => (
        <div 
          key={p.id} 
          className="fixed w-4 h-4 rounded-full bg-[#ffc800] animate-xp-fly pointer-events-none z-50"
          style={{ left: p.x, top: p.y, boxShadow: "0 0 15px #ffc800" }}
        />
      ))}

      {/* Level Up Overlay */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="text-center animate-level-up">
            <div className="text-[120px] mb-6 animate-bounce">🎉</div>
            <h2 className="text-6xl font-black text-[#58cc02] mb-4 tracking-tight" style={{ textShadow: "0 0 60px rgba(88, 204, 2, 0.8), 0 4px 0 #2d5a01" }}>LEVEL UP!</h2>
            <p className="text-3xl font-bold text-white">You reached Level {level + 1}</p>
            <div className="mt-8 flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>⭐</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top HUD */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 md:p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Streak */}
          <button 
            onClick={handleStreakTap}
            onMouseEnter={audio.hover}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, rgba(255, 150, 0, 0.25) 0%, rgba(255, 100, 0, 0.15) 100%)", border: "2px solid rgba(255, 150, 0, 0.5)", boxShadow: "0 4px 20px rgba(255, 150, 0, 0.2)" }}
          >
            <div className="relative w-8 h-10">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-9 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-[#ff4500] via-[#ff9600] to-[#ffcc00] animate-flame" style={{ filter: "blur(0.5px)" }} />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-[#ffee00] to-[#ffffff] animate-flame-inner" />
            </div>
            <span className="text-2xl font-black text-[#ff9600]" style={{ textShadow: "0 2px 10px rgba(255, 150, 0, 0.5)" }}>{streak}</span>
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              <span className="text-[#58cc02]" style={{ textShadow: "0 0 20px rgba(88, 204, 2, 0.5)" }}>duo</span>
              <span className="text-white">lingo</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-[#58cc02]/70 uppercase tracking-widest">Level {level}</span>
              <span className="text-[#58cc02]/50">•</span>
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Spanish</span>
            </div>
          </div>

          {/* XP */}
          <button
            onClick={handleXpGain}
            onMouseEnter={audio.hover}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, rgba(88, 204, 2, 0.25) 0%, rgba(60, 150, 0, 0.15) 100%)", border: "2px solid rgba(88, 204, 2, 0.5)", boxShadow: "0 4px 20px rgba(88, 204, 2, 0.2)" }}
          >
            <div className="flex flex-col items-end">
              <span className="text-2xl font-black text-[#58cc02]" style={{ textShadow: "0 2px 10px rgba(88, 204, 2, 0.5)" }}>{xp}</span>
              <span className="text-[10px] font-bold text-[#58cc02]/60 uppercase">/ 620 XP</span>
            </div>
            <div className="w-2 h-8 bg-[#1a2c38] rounded-full overflow-hidden">
              <div className="w-full bg-gradient-to-t from-[#45a302] to-[#58cc02] rounded-full transition-all duration-500" style={{ height: `${(xp / 620) * 100}%` }} />
            </div>
          </button>
        </div>
      </header>

      {/* Main Quest Map */}
      <div className="absolute inset-0 pt-28 pb-32 md:pt-32 md:pb-36">
        {/* Quest Path SVG */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathComplete" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#58cc02" />
              <stop offset="100%" stopColor="#89e219" />
            </linearGradient>
            <linearGradient id="pathActive" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffc800" />
              <stop offset="100%" stopColor="#ff9600" />
            </linearGradient>
            <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Completed paths */}
          <path d="M 20% 80% Q 27% 72% 35% 65%" fill="none" stroke="url(#pathComplete)" strokeWidth="10" strokeLinecap="round" filter="url(#pathGlow)" />
          <path d="M 35% 65% Q 42% 57% 50% 50%" fill="none" stroke="url(#pathComplete)" strokeWidth="10" strokeLinecap="round" filter="url(#pathGlow)" />
          <path d="M 50% 50% Q 57% 44% 65% 38%" fill="none" stroke="url(#pathComplete)" strokeWidth="10" strokeLinecap="round" filter="url(#pathGlow)" />
          
          {/* Active path */}
          <path d="M 65% 38% Q 72% 32% 80% 25%" fill="none" stroke="url(#pathActive)" strokeWidth="10" strokeLinecap="round" strokeDasharray="20 12" className="animate-dash" filter="url(#pathGlow)" />
        </svg>

        {/* Quest Nodes */}
        {questNodes.map((node) => (
          <button
            key={node.id}
            onClick={(e) => handleNodeClick(node, e)}
            onMouseEnter={() => node.state !== "locked" && audio.hover()}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
              node.state === "locked" ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:scale-110 active:scale-95"
            } ${activeNode === node.id ? "scale-110" : ""}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Pulse rings for active */}
            {node.state === "active" && (
              <>
                <span className="absolute inset-[-12px] rounded-full border-4 border-[#ffc800]/50 animate-ping-slow" />
                <span className="absolute inset-[-24px] rounded-full border-2 border-[#ffc800]/25 animate-ping-slower" />
              </>
            )}

            {/* Node circle */}
            <div 
              className={`relative flex items-center justify-center rounded-full transition-all ${
                node.isBoss ? "w-20 h-20 md:w-24 md:h-24" : "w-16 h-16 md:w-20 md:h-20"
              }`}
              style={{
                background: node.state === "completed" 
                  ? "linear-gradient(180deg, #89e219 0%, #58cc02 50%, #45a302 100%)"
                  : node.state === "active"
                  ? "linear-gradient(180deg, #ffee00 0%, #ffc800 50%, #ff9600 100%)"
                  : "linear-gradient(180deg, #4a5568 0%, #2d3748 100%)",
                border: node.state === "completed" 
                  ? "4px solid #2d5a01"
                  : node.state === "active"
                  ? "4px solid #cc7700"
                  : "4px solid #1a202c",
                boxShadow: node.state === "active" 
                  ? "0 0 40px rgba(255, 200, 0, 0.6), 0 8px 0 #8b5500, inset 0 -4px 0 rgba(0,0,0,0.2)" 
                  : node.state === "completed"
                  ? "0 0 25px rgba(88, 204, 2, 0.4), 0 6px 0 #1a3a01, inset 0 -4px 0 rgba(0,0,0,0.2)"
                  : "0 6px 0 #0d1117, inset 0 -4px 0 rgba(0,0,0,0.3)"
              }}
            >
              {/* Icon */}
              <span className={`${node.isBoss ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"} ${node.state === "locked" ? "grayscale" : ""}`}>
                {node.state === "locked" ? "🔒" : node.icon}
              </span>

              {/* Checkmark for completed */}
              {node.state === "completed" && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-[#58cc02] text-sm font-black">✓</span>
                </div>
              )}

              {/* Boss crown */}
              {node.isBoss && node.state === "active" && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl animate-bounce-slow" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>👑</div>
              )}
            </div>

            {/* Stars for completed */}
            {node.stars && node.state === "completed" && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 bg-[#0d1117]/80 px-2 py-0.5 rounded-full">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < node.stars! ? "text-[#ffc800]" : "text-[#3d4f5f]"}`} style={i < node.stars! ? { filter: "drop-shadow(0 0 4px #ffc800)" } : {}}>★</span>
                ))}
              </div>
            )}

            {/* Label */}
            <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm md:text-base font-bold tracking-wide transition-all ${
              node.state === "locked" ? "text-[#5b6b76]" : node.state === "active" ? "text-[#ffc800]" : "text-white"
            } ${activeNode === node.id ? "scale-110" : "group-hover:scale-105"}`}
            style={node.state === "active" ? { textShadow: "0 0 10px rgba(255, 200, 0, 0.5)" } : {}}>
              {node.label}
            </span>
          </button>
        ))}

        {/* Duo Character */}
        <div className="absolute left-[45%] bottom-[18%] animate-duo-float pointer-events-none">
          <div className="relative">
            <div className="w-20 h-24 md:w-24 md:h-28 rounded-[45%] relative" style={{ background: "linear-gradient(180deg, #89e219 0%, #58cc02 50%, #45a302 100%)", border: "4px solid #2d5a01", boxShadow: "0 8px 0 #1a3a01, 0 12px 30px rgba(0,0,0,0.4)" }}>
              {/* Eyes */}
              <div className="absolute top-5 left-3 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border-2 border-[#1a1a2a]">
                <div className="absolute top-1.5 left-2 w-2.5 h-2.5 bg-[#1a1a2a] rounded-full animate-eye-move" />
              </div>
              <div className="absolute top-5 right-3 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border-2 border-[#1a1a2a]">
                <div className="absolute top-1.5 left-2 w-2.5 h-2.5 bg-[#1a1a2a] rounded-full animate-eye-move" />
              </div>
              {/* Beak */}
              <div className="absolute top-12 md:top-14 left-1/2 -translate-x-1/2">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-transparent border-t-[#ffc800]" style={{ filter: "drop-shadow(0 3px 0 #cc9900)" }} />
              </div>
              {/* Wings */}
              <div className="absolute bottom-4 -left-3 w-5 h-8 rounded-[40%] -rotate-12 animate-wing-flap" style={{ background: "linear-gradient(180deg, #58cc02 0%, #45a302 100%)", border: "3px solid #2d5a01" }} />
              <div className="absolute bottom-4 -right-3 w-5 h-8 rounded-[40%] rotate-12 animate-wing-flap" style={{ background: "linear-gradient(180deg, #58cc02 0%, #45a302 100%)", border: "3px solid #2d5a01", animationDelay: "0.1s" }} />
            </div>
            {/* Shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-black/40 rounded-[50%] blur-sm" />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 p-4 md:p-6 flex justify-center">
        <button
          onClick={() => {
            audio.select()
            speak("Starting your Spanish lesson. Get ready!")
          }}
          onMouseEnter={audio.hover}
          className="px-16 py-5 rounded-2xl text-white text-xl md:text-2xl font-black uppercase tracking-wide transition-all hover:scale-105 active:scale-95 active:translate-y-1"
          style={{ 
            background: "linear-gradient(180deg, #89e219 0%, #58cc02 50%, #45a302 100%)", 
            border: "4px solid #2d5a01",
            boxShadow: "0 8px 0 #1a3a01, 0 12px 40px rgba(88, 204, 2, 0.4), inset 0 2px 0 rgba(255,255,255,0.2)",
            textShadow: "0 2px 0 #2d5a01"
          }}
        >
          Start Lesson
        </button>
      </footer>
    </main>
  )
}
