"use client"

import { useEffect, useState } from "react"

interface ArcadeCabinetProps {
  speak: (text: string) => void
  beep: (freq?: number, type?: OscillatorType) => void
  soundEnabled: boolean
  toggleSound: () => void
}

export function ArcadeCabinet({ speak, beep, soundEnabled, toggleSound }: ArcadeCabinetProps) {
  const [xpFill, setXpFill] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setXpFill(68), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleHover = () => beep(330, "sine")

  const questNodes = [
    { 
      id: "basics", 
      label: "BASICS", 
      x: 12, 
      y: 75, 
      state: "completed", 
      stars: "★★★",
      speak: "Spanish basics cleared. Perfect combo awarded 50 bonus XP."
    },
    { 
      id: "food", 
      label: "FOOD", 
      x: 30, 
      y: 55, 
      state: "completed", 
      stars: "★★☆",
      speak: "Food vocabulary mastered. Unlocked restaurant dialogue."
    },
    { 
      id: "boss", 
      label: "BOSS", 
      subtitle: "TRAIN STATION",
      x: 50, 
      y: 40, 
      state: "active",
      speak: "BOSS BATTLE: Translate a full conversation at the train station. 3 lives. No hints."
    },
    { 
      id: "story", 
      label: "STORY", 
      x: 70, 
      y: 25, 
      state: "locked",
      speak: "Story portal locked. Defeat the boss to enter."
    },
    { 
      id: "radio", 
      label: "RADIO", 
      x: 88, 
      y: 12, 
      state: "locked",
      special: true,
      speak: "DuoRadio station. Unlock by completing 3 listening challenges."
    },
  ]

  const guides = [
    { id: "coach", name: "COACH", desc: "Drill Sergeant Mode", icon: "⚔", speak: "Coach voice activated. Fast drills. Zero mercy." },
    { id: "bard", name: "BARD", desc: "Story Teller Mode", icon: "♫", speak: "Bard voice activated. Learn through story and song." },
    { id: "rival", name: "RIVAL", desc: "Competitive Mode", icon: "⚡", speak: "Rival voice activated. Try to beat my high score." },
  ]

  const scores = [
    { rank: 1, name: "MARIA_ESP", score: "2,450 XP" },
    { rank: 2, name: "TAKESHI_JP", score: "2,180 XP" },
    { rank: 3, name: "ROOKIE_001", score: "1,820 XP" },
    { rank: 4, name: "HANS_DE", score: "1,650 XP" },
    { rank: 5, name: "PIERRE_FR", score: "1,420 XP" },
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,900px)_1fr] gap-4 lg:gap-8 min-h-screen p-4 lg:p-8 items-center">
      {/* Left Panel */}
      <aside className="hidden lg:flex flex-col gap-4 self-stretch justify-center">
        <div className="bg-black/40 border-[3px] border-[#2a3a4a] rounded-xl p-5">
          <h2 className="text-xs font-black text-gold tracking-[0.15em] mb-4 text-center">CHOOSE YOUR GUIDE</h2>
          {guides.map((guide, i) => (
            <button
              key={guide.id}
              onClick={() => speak(guide.speak)}
              onMouseEnter={handleHover}
              className="flex items-center gap-3 w-full p-3 mb-3 last:mb-0 bg-[#1a1a2e] border-[3px] border-ink rounded-lg cursor-pointer transition-all duration-150 hover:bg-[#252540] hover:-translate-y-0.5 active:translate-y-0.5"
              style={{ boxShadow: "0 4px 0 var(--ink)" }}
            >
              <span 
                className="w-9 h-9 border-2 border-ink rounded-full grid place-items-center text-lg"
                style={{ background: i === 0 ? "var(--lime)" : i === 1 ? "var(--gold)" : "var(--electric-blue)" }}
              >
                {guide.icon}
              </span>
              <span className="text-sm font-black text-paper">{guide.name}</span>
              <span className="text-[0.65rem] font-bold text-paper/60 ml-auto">{guide.desc}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Cabinet */}
      <div 
        className="relative rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--cabinet-red) 0%, var(--cabinet-dark) 100%)",
          border: "6px solid var(--ink)",
          boxShadow: "0 0 0 3px var(--cabinet-red), 0 0 60px rgba(255, 45, 106, 0.2), 0 30px 60px rgba(0, 0, 0, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Marquee */}
        <div className="relative p-4 lg:p-6 text-center overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)", borderBottom: "4px solid var(--ink)" }}>
          <span className="absolute inset-0 animate-[marquee-sweep_3s_ease-in-out_infinite]" style={{ background: "linear-gradient(90deg, transparent, rgba(88, 204, 2, 0.3), rgba(255, 200, 0, 0.3), rgba(255, 45, 106, 0.3), transparent)" }} />
          <h1 
            className="relative text-4xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase"
            style={{
              background: "linear-gradient(180deg, var(--lime-glow) 0%, var(--lime) 50%, #2d7a00 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(88, 204, 2, 0.5)) drop-shadow(0 4px 0 var(--ink))"
            }}
          >
            DuoQuest
          </h1>
          <p className="relative mt-2 text-sm font-extrabold tracking-[0.2em] text-gold animate-[blink_1s_steps(1)_infinite]">
            INSERT BRAIN TO CONTINUE
          </p>
        </div>

        {/* Screen Bezel */}
        <div 
          className="m-3 lg:m-4 p-2"
          style={{
            background: "linear-gradient(145deg, #2a2a3a 0%, #1a1a2a 100%)",
            border: "4px solid var(--ink)",
            borderRadius: "8px",
            boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.8), 0 0 0 2px #3a3a4a"
          }}
        >
          {/* Screen */}
          <div 
            className="relative overflow-hidden"
            style={{
              background: "var(--screen-bg)",
              border: "3px solid #2a3a4a",
              borderRadius: "4px",
              aspectRatio: "4/3",
              minHeight: "320px",
              boxShadow: "inset 0 0 100px rgba(88, 204, 2, 0.05), inset 0 0 50px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* HUD Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-[auto_1fr_auto] gap-2 lg:gap-4 p-2 lg:p-3 bg-hud-bg border-b-[3px] border-[#2a3a4a]">
              {/* Player Info */}
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-lime border-[3px] border-ink rounded-full grid place-items-center" style={{ boxShadow: "0 3px 0 var(--ink)" }}>
                  <div className="relative w-5 h-5 lg:w-6 lg:h-6">
                    <span className="absolute w-2 h-2 bg-white border-2 border-ink rounded-full top-1 left-0.5" />
                    <span className="absolute w-2 h-2 bg-white border-2 border-ink rounded-full top-1 right-0.5" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent border-t-gold" />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] lg:text-xs font-extrabold text-paper tracking-wider">ROOKIE_001</span>
                  <span className="text-[0.55rem] lg:text-[0.65rem] font-black text-lime tracking-widest">LVL 07</span>
                </div>
              </div>

              {/* Streak */}
              <div className="flex items-center justify-center lg:justify-self-center gap-2">
                <div className="relative w-6 lg:w-8 h-8 lg:h-10">
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 lg:w-5 h-6 lg:h-8 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] animate-[flicker_0.5s_ease-in-out_infinite_alternate]" style={{ background: "linear-gradient(0deg, var(--gold) 0%, var(--red) 100%)" }} />
                  <span className="absolute bottom-0 left-1 w-3 lg:w-3.5 h-4 lg:h-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] animate-[flicker-side_0.5s_ease-in-out_infinite_alternate_0.1s]" style={{ background: "linear-gradient(0deg, var(--gold-glow) 0%, var(--gold) 100%)" }} />
                  <span className="absolute bottom-0 right-1 w-3 lg:w-3.5 h-4 lg:h-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] animate-[flicker-side_0.5s_ease-in-out_infinite_alternate_0.2s]" style={{ background: "linear-gradient(0deg, var(--gold-glow) 0%, var(--gold) 100%)" }} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl lg:text-2xl font-black text-gold leading-none" style={{ textShadow: "0 0 10px rgba(255, 200, 0, 0.5)" }}>18</span>
                  <span className="text-[0.45rem] lg:text-[0.55rem] font-extrabold text-paper/70 tracking-widest">DAY STREAK</span>
                </div>
              </div>

              {/* XP */}
              <div className="flex flex-col items-end gap-1 col-span-2 lg:col-span-1">
                <div className="relative w-full lg:w-36 h-4 lg:h-[18px] bg-[#0d1117] border-2 border-[#3a4a5a] rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${xpFill}%`, 
                      background: "linear-gradient(90deg, var(--lime) 0%, var(--lime-glow) 100%)",
                      boxShadow: "0 0 10px rgba(88, 204, 2, 0.5)"
                    }} 
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[0.55rem] lg:text-[0.65rem] font-black text-white" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}>420 / 620 XP</span>
                </div>
                <span className="text-[0.5rem] lg:text-[0.55rem] font-bold text-lime/80">200 XP TO LEVEL UP</span>
              </div>
            </div>

            {/* Game World */}
            <div 
              className="absolute left-0 right-0 bottom-12 top-16 lg:top-[70px]"
              style={{
                background: "radial-gradient(ellipse at 50% 100%, rgba(88, 204, 2, 0.1) 0%, transparent 50%), linear-gradient(180deg, #0d1117 0%, #131820 100%)"
              }}
            >
              {/* Quest Path SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                <path className="fill-none stroke-lime stroke-[6px] [stroke-linecap:round] [stroke-dasharray:12_8]" style={{ filter: "drop-shadow(0 0 4px rgba(88, 204, 2, 0.6))" }} d="M 50 240 Q 80 200 120 180" />
                <path className="fill-none stroke-lime stroke-[6px] [stroke-linecap:round] [stroke-dasharray:12_8]" style={{ filter: "drop-shadow(0 0 4px rgba(88, 204, 2, 0.6))" }} d="M 120 180 Q 160 160 200 140" />
                <path className="fill-none stroke-gold stroke-[6px] [stroke-linecap:round] [stroke-dasharray:12_8] animate-[dash-move_1s_linear_infinite]" style={{ filter: "drop-shadow(0 0 6px rgba(255, 200, 0, 0.8))" }} d="M 200 140 Q 240 120 280 90" />
                <path className="fill-none stroke-[#3a4a5a] stroke-[6px] [stroke-linecap:round] [stroke-dasharray:12_8] opacity-50" d="M 280 90 Q 320 70 350 50" />
              </svg>

              {/* Quest Nodes */}
              {questNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => node.state !== "locked" && speak(node.speak)}
                  onMouseEnter={() => node.state !== "locked" && handleHover()}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0.5 border-4 border-ink rounded-full cursor-pointer transition-all duration-200 ${
                    node.state === "locked" ? "cursor-not-allowed opacity-60" : "hover:-translate-y-[calc(-50%+4px)]"
                  } ${node.state === "active" ? "animate-[boss-glow_2s_ease-in-out_infinite]" : ""}`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: node.state === "active" ? "70px" : "55px",
                    height: node.state === "active" ? "70px" : "55px",
                    background: node.state === "completed" ? "var(--lime)" : 
                               node.state === "active" ? "linear-gradient(135deg, var(--hot-pink) 0%, var(--cabinet-red) 100%)" : 
                               node.special ? "var(--electric-blue)" : "#3a4a5a",
                    boxShadow: "0 6px 0 var(--ink), 0 8px 20px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  {node.state === "active" && (
                    <span className="absolute -inset-2 border-[3px] border-gold-glow rounded-full opacity-80 animate-[ring-pulse_1.5s_ease-in-out_infinite]" />
                  )}
                  {node.state === "completed" ? (
                    <span className="text-base font-black text-white" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}>✓</span>
                  ) : node.state === "active" ? (
                    <span className="text-2xl" style={{ filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3))" }}>☠</span>
                  ) : (
                    <span className="text-base text-ink font-black">{node.special ? "📻" : "🔒"}</span>
                  )}
                  <span className="text-[0.5rem] font-black text-ink tracking-wider">{node.label}</span>
                  {node.stars && <span className="text-[0.45rem] text-ink/80">{node.stars}</span>}
                  {node.subtitle && <span className="text-[0.4rem] font-extrabold text-white/90">{node.subtitle}</span>}
                </button>
              ))}

              {/* Player Sprite */}
              <div className="absolute left-[42%] bottom-[15%] -translate-x-1/2 animate-[sprite-bob_2s_ease-in-out_infinite]">
                <div className="relative w-12 h-14">
                  <span className="absolute inset-0 bg-lime border-4 border-ink rounded-[45%_45%_42%_42%]" style={{ boxShadow: "0 4px 0 var(--ink)" }} />
                  <span className="absolute w-3.5 h-3.5 bg-white border-[3px] border-ink rounded-full top-3.5 left-1.5">
                    <span className="absolute w-1.5 h-1.5 bg-ink rounded-full top-1 left-1 animate-[eye-look_4s_ease-in-out_infinite]" />
                  </span>
                  <span className="absolute w-3.5 h-3.5 bg-white border-[3px] border-ink rounded-full top-3.5 right-1.5">
                    <span className="absolute w-1.5 h-1.5 bg-ink rounded-full top-1 left-1 animate-[eye-look_4s_ease-in-out_infinite]" />
                  </span>
                  <span className="absolute left-1/2 top-7 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-transparent border-t-gold" style={{ filter: "drop-shadow(0 2px 0 var(--ink))" }} />
                  <span className="absolute bottom-2 -left-0.5 w-2.5 h-4 bg-[#45a302] border-[3px] border-ink rounded-[40%_40%_50%_50%] -rotate-[15deg]" />
                  <span className="absolute bottom-2 -right-0.5 w-2.5 h-4 bg-[#45a302] border-[3px] border-ink rounded-[40%_40%_50%_50%] rotate-[15deg]" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-black/40 rounded-full blur-[4px]" />
              </div>
            </div>

            {/* Action Prompt */}
            <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-3 bg-hud-bg border-t-[3px] border-[#2a3a4a] flex items-center justify-center gap-2">
              <span className="text-lime animate-[arrow-bounce_1s_ease-in-out_infinite]">▶</span>
              <span className="text-[0.65rem] lg:text-xs font-extrabold text-paper tracking-widest">SELECT QUEST NODE TO BEGIN</span>
              <span className="text-lime animate-[blink_0.8s_steps(1)_infinite]">_</span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-3 lg:gap-4 p-3 lg:p-6" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #12121f 100%)", borderTop: "4px solid var(--ink)" }}>
          {/* Joystick */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-ink rounded-full" style={{ background: "linear-gradient(145deg, #2a2a3a 0%, #1a1a2a 100%)", boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.5)" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 border-[3px] border-ink rounded-full" style={{ background: "linear-gradient(145deg, #4a4a5a 0%, #2a2a3a 100%)", boxShadow: "0 4px 0 var(--ink), 0 6px 10px rgba(0, 0, 0, 0.4)" }} />
            </div>
          </div>

          {/* Main Buttons */}
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">
            <button
              onClick={() => speak("Welcome to DuoQuest. Your 5-minute language run begins now.")}
              onMouseEnter={handleHover}
              className="relative min-w-[120px] lg:min-w-[140px] active:translate-y-1"
            >
              <span className="block px-4 lg:px-6 py-2.5 lg:py-3 bg-lime border-4 border-ink rounded-lg text-ink text-sm font-black relative z-10">START QUEST</span>
              <span className="absolute left-0 right-0 -bottom-1 h-2 bg-ink rounded-b-lg transition-all" />
            </button>
            <button
              onClick={() => speak("Opening course selection. Choose your language dungeon.")}
              onMouseEnter={handleHover}
              className="relative min-w-[120px] lg:min-w-[140px] active:translate-y-1"
            >
              <span className="block px-4 lg:px-6 py-2.5 lg:py-3 bg-electric-blue border-4 border-ink rounded-lg text-white text-sm font-black relative z-10">COURSES</span>
              <span className="absolute left-0 right-0 -bottom-1 h-2 bg-ink rounded-b-lg transition-all" />
            </button>
          </div>

          {/* A/B Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => speak("A button: Confirm selection")}
              onMouseEnter={handleHover}
              className="w-11 h-11 lg:w-12 lg:h-12 bg-hot-pink border-4 border-ink rounded-full text-white text-lg font-black active:translate-y-1"
              style={{ boxShadow: "0 6px 0 var(--ink)" }}
              aria-label="A button"
            >
              A
            </button>
            <button
              onClick={() => speak("B button: Go back")}
              onMouseEnter={handleHover}
              className="w-11 h-11 lg:w-12 lg:h-12 bg-gold border-4 border-ink rounded-full text-ink text-lg font-black active:translate-y-1"
              style={{ boxShadow: "0 6px 0 var(--ink)" }}
              aria-label="B button"
            >
              B
            </button>
          </div>
        </div>

        {/* Coin Slot */}
        <div className="flex items-center justify-center gap-4 p-3 lg:p-4 bg-[#0f0f1a] border-t-[3px] border-ink">
          <span className="text-xs font-black text-lime tracking-[0.2em]">FREE PLAY</span>
          <div className="w-14 h-2 bg-[#1a1a2a] border-2 border-ink rounded" style={{ boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.5)" }} />
        </div>
      </div>

      {/* Right Panel */}
      <aside className="hidden lg:flex flex-col gap-4 self-stretch justify-between">
        {/* High Scores */}
        <div className="bg-black/40 border-[3px] border-[#2a3a4a] rounded-xl p-5">
          <h2 className="text-xs font-black text-gold tracking-[0.15em] mb-4 text-center">TODAY&apos;S TOP QUESTERS</h2>
          <ol className="font-mono list-none">
            {scores.map((s, i) => (
              <li key={s.rank} className={`flex gap-2 py-1.5 text-xs font-bold border-b border-white/10 last:border-none ${i === 2 ? "text-lime" : ""}`}>
                <span className={i === 0 ? "text-gold w-6" : i === 1 ? "text-[#c0c0c0] w-6" : i === 2 ? "text-[#cd7f32] w-6" : "text-paper/50 w-6"}>{s.rank}.</span>
                <span className="flex-1 text-paper">{s.name}</span>
                <span className="text-lime">{s.score}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          onMouseEnter={handleHover}
          className="flex items-center justify-center gap-2 p-3 bg-[#1a1a2e] border-[3px] border-ink rounded-lg transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
          style={{ boxShadow: "0 4px 0 var(--ink)" }}
          aria-pressed={soundEnabled}
          aria-label="Toggle sound"
        >
          <span className="text-xl text-gold">♬</span>
          <span className="text-xs font-black text-paper tracking-widest">{soundEnabled ? "SFX ON" : "SFX OFF"}</span>
        </button>
      </aside>
    </section>
  )
}
