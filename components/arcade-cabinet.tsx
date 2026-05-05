"use client"

import { useEffect, useState } from "react"

interface ArcadeCabinetProps {
  speak: (text: string) => void
  beep: (freq?: number, type?: OscillatorType) => void
  soundEnabled: boolean
  toggleSound: () => void
  isVoiceLoading?: boolean
}

export function ArcadeCabinet({ speak, beep, soundEnabled, toggleSound, isVoiceLoading }: ArcadeCabinetProps) {
  const [xpFill, setXpFill] = useState(0)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setXpFill(68), 500)
    const introTimer = setTimeout(() => setShowIntro(false), 3000)
    return () => {
      clearTimeout(timer)
      clearTimeout(introTimer)
    }
  }, [])

  const handleHover = () => beep(330, "sine")

  const handleNodeClick = (node: typeof questNodes[0]) => {
    if (node.state === "locked") {
      beep(180, "sawtooth")
      return
    }
    setActiveNode(node.id)
    speak(node.speak)
  }

  const questNodes = [
    { 
      id: "basics", 
      label: "BASICS", 
      x: 15, 
      y: 78, 
      state: "completed", 
      stars: 3,
      speak: "Spanish basics cleared. Perfect combo! 50 bonus XP awarded. You unlocked food vocabulary."
    },
    { 
      id: "food", 
      label: "FOOD", 
      x: 32, 
      y: 58, 
      state: "completed", 
      stars: 2,
      speak: "Food vocabulary mastered. You can now order tapas like a local. Restaurant dialogue unlocked."
    },
    { 
      id: "boss", 
      label: "BOSS",
      subtitle: "TRAIN STATION",
      x: 50, 
      y: 38, 
      state: "active",
      speak: "BOSS BATTLE: Navigate the Madrid train station. Translate a full conversation. 3 lives. No hints. Are you ready?"
    },
    { 
      id: "story", 
      label: "STORY", 
      x: 68, 
      y: 22, 
      state: "locked",
      speak: "Story portal locked. Defeat the train station boss to continue your journey."
    },
    { 
      id: "radio", 
      label: "RADIO", 
      x: 85, 
      y: 10, 
      state: "locked",
      special: true,
      speak: "DuoRadio. Unlock by completing 3 listening challenges. Real Spanish podcasts await."
    },
  ]

  const guides = [
    { id: "coach", name: "DRILL SERGEANT", desc: "Zero mercy mode", icon: "⚔️", color: "lime", speak: "Drill Sergeant activated. Fast drills. No breaks. Maximum XP per minute. Let's go, recruit!" },
    { id: "bard", name: "STORYTELLER", desc: "Learn through lore", icon: "📖", color: "gold", speak: "Storyteller mode engaged. Every lesson becomes an adventure. Vocabulary through narrative." },
    { id: "rival", name: "RIVAL", desc: "Beat my score", icon: "⚡", color: "hot-pink", speak: "Oh, you think you're fast? I've got a 47-day streak. Try to beat my high score. I dare you." },
  ]

  const scores = [
    { rank: 1, name: "MARIA_ESP", xp: "12,450", streak: 142, crown: true },
    { rank: 2, name: "TAKESHI_JP", xp: "11,820", streak: 98 },
    { rank: 3, name: "YOU", xp: "8,420", streak: 18, isPlayer: true },
    { rank: 4, name: "HANS_DE", xp: "7,650", streak: 45 },
    { rank: 5, name: "PIERRE_FR", xp: "6,200", streak: 23 },
  ]

  return (
    <section className="relative grid grid-cols-1 xl:grid-cols-[280px_1fr_280px] gap-6 xl:gap-10 min-h-screen p-4 lg:p-6 xl:p-8 items-center">
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-lime/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Left Panel - Guide Select */}
      <aside className="hidden xl:flex flex-col gap-5 self-stretch justify-center z-10">
        <div className="arcade-panel p-5">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-gold text-sm">▸</span>
            <h2 className="text-xs font-black text-gold tracking-[0.2em]">VOICE GUIDE</h2>
            {isVoiceLoading && <span className="ml-auto w-2 h-2 bg-lime rounded-full animate-pulse" />}
          </div>
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => speak(guide.speak)}
              onMouseEnter={handleHover}
              className="guide-card group"
            >
              <span 
                className="guide-icon"
                style={{ 
                  background: guide.color === "lime" ? "var(--lime)" : guide.color === "gold" ? "var(--gold)" : "var(--hot-pink)",
                  color: guide.color === "gold" ? "var(--ink)" : "white"
                }}
              >
                {guide.icon}
              </span>
              <div className="flex-1 text-left">
                <span className="block text-sm font-black text-paper group-hover:text-lime transition-colors">{guide.name}</span>
                <span className="block text-[0.65rem] font-bold text-paper/50">{guide.desc}</span>
              </div>
              <span className="text-paper/30 group-hover:text-lime transition-colors">▶</span>
            </button>
          ))}
        </div>

        {/* Daily Challenge */}
        <div className="arcade-panel p-5 border-gold/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <span className="text-xs font-black text-gold tracking-widest">DAILY QUEST</span>
          </div>
          <p className="text-sm font-bold text-paper mb-3">Complete 3 lessons without losing a heart</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 bg-ink rounded-full overflow-hidden border border-[#2a3a4a]">
              <div className="h-full w-2/3 bg-gradient-to-r from-gold to-gold-glow rounded-full" />
            </div>
            <span className="text-xs font-black text-gold">2/3</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-paper/60">
            <span>Reward:</span>
            <span className="text-lime">+150 XP</span>
            <span className="text-gold">+ 💎 2 Gems</span>
          </div>
        </div>
      </aside>

      {/* Main Cabinet */}
      <div className="relative z-10">
        {/* Cabinet Glow */}
        <div className="absolute -inset-4 bg-gradient-to-b from-cabinet-red/20 via-transparent to-cabinet-red/10 rounded-3xl blur-xl pointer-events-none" />
        
        <div className="cabinet">
          {/* Marquee Header */}
          <div className="marquee">
            <div className="marquee-sweep" />
            <div className="marquee-content">
              <span className="duo-icon">🦉</span>
              <h1 className="marquee-title">DUOQUEST</h1>
              <span className="duo-icon">🦉</span>
            </div>
            <p className="marquee-subtitle">
              {showIntro ? "INSERT BRAIN TO CONTINUE" : "READY PLAYER ONE"}
            </p>
          </div>

          {/* Screen Bezel */}
          <div className="screen-bezel">
            {/* Game Screen */}
            <div className="game-screen">
              {/* HUD Bar */}
              <div className="hud-bar">
                {/* Player Badge */}
                <div className="player-badge">
                  <div className="avatar">
                    <div className="avatar-face">
                      <span className="eye left" />
                      <span className="eye right" />
                      <span className="beak" />
                    </div>
                  </div>
                  <div className="player-info">
                    <span className="player-name">ROOKIE_001</span>
                    <span className="player-level">LVL 07 EXPLORER</span>
                  </div>
                </div>

                {/* Streak Fire */}
                <div className="streak-display">
                  <div className="flame-container">
                    <div className="flame main" />
                    <div className="flame left" />
                    <div className="flame right" />
                    <div className="ember e1" />
                    <div className="ember e2" />
                    <div className="ember e3" />
                  </div>
                  <div className="streak-info">
                    <span className="streak-count">18</span>
                    <span className="streak-label">DAY STREAK</span>
                  </div>
                </div>

                {/* XP Bar */}
                <div className="xp-display">
                  <div className="xp-bar">
                    <div className="xp-fill" style={{ width: `${xpFill}%` }} />
                    <span className="xp-text">420 / 620 XP</span>
                  </div>
                  <span className="xp-hint">⚡ 200 XP TO LEVEL UP</span>
                </div>
              </div>

              {/* Quest World */}
              <div className="quest-world">
                {/* Animated Grid Lines */}
                <svg className="grid-lines" viewBox="0 0 400 300">
                  <defs>
                    <linearGradient id="pathGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--lime)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--lime-glow)" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="pathGold" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--gold-glow)" stopOpacity="1" />
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
                    d="M 60 250 Q 100 210 130 185" 
                    fill="none" 
                    stroke="url(#pathGreen)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="15 10"
                    filter="url(#glow)"
                  />
                  <path 
                    d="M 130 185 Q 160 155 200 130" 
                    fill="none" 
                    stroke="url(#pathGreen)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="15 10"
                    filter="url(#glow)"
                  />
                  
                  {/* Active path - animated */}
                  <path 
                    d="M 200 130 Q 240 95 275 70" 
                    fill="none" 
                    stroke="url(#pathGold)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="15 10"
                    className="path-active"
                    filter="url(#glow)"
                  />
                  
                  {/* Locked paths */}
                  <path 
                    d="M 275 70 Q 310 45 340 30" 
                    fill="none" 
                    stroke="#3a4a5a" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray="15 10"
                    opacity="0.4"
                  />
                </svg>

                {/* Quest Nodes */}
                {questNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => node.state !== "locked" && handleHover()}
                    className={`quest-node ${node.state} ${activeNode === node.id ? "selected" : ""}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    disabled={node.state === "locked"}
                  >
                    {node.state === "active" && <span className="pulse-ring" />}
                    {node.state === "active" && <span className="pulse-ring delay" />}
                    
                    <span className="node-inner">
                      {node.state === "completed" && <span className="check">✓</span>}
                      {node.state === "active" && <span className="boss-skull">💀</span>}
                      {node.state === "locked" && !node.special && <span className="lock">🔒</span>}
                      {node.special && <span className="special">📻</span>}
                    </span>
                    
                    <span className="node-label">{node.label}</span>
                    {node.stars && (
                      <span className="node-stars">
                        {"★".repeat(node.stars)}{"☆".repeat(3 - node.stars)}
                      </span>
                    )}
                    {node.subtitle && <span className="node-subtitle">{node.subtitle}</span>}
                  </button>
                ))}

                {/* Duo Character */}
                <div className="duo-sprite">
                  <div className="duo-body">
                    <div className="duo-face">
                      <span className="duo-eye left"><span className="pupil" /></span>
                      <span className="duo-eye right"><span className="pupil" /></span>
                      <span className="duo-beak" />
                    </div>
                    <div className="duo-wing left" />
                    <div className="duo-wing right" />
                  </div>
                  <div className="duo-shadow" />
                  <div className="speech-indicator">?</div>
                </div>

                {/* Ground Decoration */}
                <div className="ground-glow" />
              </div>

              {/* Action Bar */}
              <div className="action-bar">
                <span className="action-arrow">▸</span>
                <span className="action-text">SELECT QUEST NODE TO BEGIN BATTLE</span>
                <span className="action-cursor">_</span>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="control-panel">
            {/* Joystick */}
            <div className="joystick-container">
              <div className="joystick-base">
                <div className="joystick-stick" />
              </div>
              <span className="joystick-label">MOVE</span>
            </div>

            {/* Main Buttons */}
            <div className="main-buttons">
              <button
                onClick={() => speak("Welcome to DuoQuest! Your 5-minute language adventure begins now. Select your first quest node to start earning XP.")}
                onMouseEnter={handleHover}
                className="arcade-btn primary"
              >
                <span className="btn-face">START QUEST</span>
                <span className="btn-shadow" />
              </button>
              <button
                onClick={() => speak("Opening course selection. Over 40 languages available. From Spanish to Klingon. Choose your dungeon wisely.")}
                onMouseEnter={handleHover}
                className="arcade-btn secondary"
              >
                <span className="btn-face">ALL COURSES</span>
                <span className="btn-shadow" />
              </button>
            </div>

            {/* A/B Buttons */}
            <div className="ab-buttons">
              <button
                onClick={() => speak("Confirmed!")}
                onMouseEnter={handleHover}
                className="round-btn a"
                aria-label="A button - Confirm"
              >
                A
              </button>
              <button
                onClick={() => speak("Going back.")}
                onMouseEnter={handleHover}
                className="round-btn b"
                aria-label="B button - Back"
              >
                B
              </button>
            </div>
          </div>

          {/* Coin Slot */}
          <div className="coin-slot">
            <span className="free-play">FREE PLAY</span>
            <div className="slot" />
            <span className="credit">CREDIT: ∞</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Leaderboard */}
      <aside className="hidden xl:flex flex-col gap-5 self-stretch justify-center z-10">
        <div className="arcade-panel p-5">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-gold text-sm">▸</span>
            <h2 className="text-xs font-black text-gold tracking-[0.2em]">WEEKLY RANKINGS</h2>
          </div>
          <div className="space-y-2">
            {scores.map((s, i) => (
              <div 
                key={s.rank} 
                className={`leaderboard-row ${s.isPlayer ? "player" : ""}`}
              >
                <span className={`rank ${i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : ""}`}>
                  {i === 0 ? "👑" : s.rank}
                </span>
                <span className="name">{s.name}</span>
                <div className="stats">
                  <span className="xp">{s.xp}</span>
                  <span className="streak">🔥{s.streak}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => speak("Opening full leaderboard. See how you rank against millions of language learners worldwide.")}
            onMouseEnter={handleHover}
            className="view-all"
          >
            VIEW ALL RANKINGS →
          </button>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          onMouseEnter={handleHover}
          className="sound-toggle"
          aria-pressed={soundEnabled}
          aria-label="Toggle sound"
        >
          <span className="sound-icon">{soundEnabled ? "🔊" : "🔇"}</span>
          <span className="sound-text">{soundEnabled ? "AUDIO ON" : "AUDIO OFF"}</span>
        </button>

        {/* Power Badge */}
        <div className="arcade-panel p-5 text-center">
          <div className="text-3xl mb-2">🦉</div>
          <p className="text-xs font-black text-paper/70 tracking-widest mb-1">POWERED BY</p>
          <p className="text-sm font-black text-lime">DUOLINGO</p>
          <p className="text-[0.65rem] font-bold text-paper/40 mt-2">The world&apos;s #1 way to learn a language</p>
        </div>
      </aside>
    </section>
  )
}
