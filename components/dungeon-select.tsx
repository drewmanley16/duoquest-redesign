"use client"

interface DungeonSelectProps {
  speak: (text: string) => void
  beep: (freq?: number, type?: OscillatorType) => void
}

const dungeons = [
  {
    id: "languages",
    icon: "🌍",
    title: "LANGUAGE REALMS",
    desc: "40+ worlds including Spanish, Japanese, Korean, French, German, and more",
    meta: ["500M+ players", "5 min runs"],
    color: "lime",
    speak: "Language Realms. 40 plus worlds to explore. Spanish, Japanese, French, Korean, and more. 500 million players and counting."
  },
  {
    id: "math",
    icon: "🧮",
    title: "MATH CATACOMBS",
    desc: "Multiplication pits, fraction mazes, geometry puzzles",
    meta: ["Brain training", "Quick solve"],
    color: "hot-pink",
    speak: "Math Catacombs. Multiplication pits. Fraction mazes. Geometry puzzles. Train your brain in 5 minute sessions."
  },
  {
    id: "music",
    icon: "🎵",
    title: "MUSIC TOWER",
    desc: "Read notes, match rhythms, play melodies by ear",
    meta: ["No instrument", "Rhythm gates"],
    color: "gold",
    speak: "Music Tower. Learn to read notes. Match rhythms. Play melodies by ear. No instrument required."
  },
  {
    id: "chess",
    icon: "♟️",
    title: "CHESS FORTRESS",
    desc: "Master openings, earn tactics badges, puzzle battles",
    meta: ["500+ puzzles", "Match scenarios"],
    color: "electric-blue",
    speak: "Chess Fortress. Master openings. Earn tactics badges. Over 500 puzzle battles await."
  },
]

export function DungeonSelect({ speak, beep }: DungeonSelectProps) {
  const handleHover = () => beep(330, "sine")

  return (
    <section 
      className="py-20 lg:py-28 px-4 lg:px-16"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(88, 204, 2, 0.06) 0%, transparent 50%),
          linear-gradient(180deg, #08080c 0%, #0d0d14 100%)
        `
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-gold text-xl">◆</span>
          <h2 className="text-3xl lg:text-5xl font-black text-paper text-center tracking-wider">
            SELECT YOUR DUNGEON
          </h2>
          <span className="text-gold text-xl">◆</span>
        </div>
        <p className="text-center text-paper/60 text-base lg:text-lg mb-12 max-w-xl mx-auto">
          Every Duolingo course becomes a playable world. Choose your adventure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dungeons.map((d) => (
            <button
              key={d.id}
              onClick={() => speak(d.speak)}
              onMouseEnter={handleHover}
              className="dungeon-card group text-left"
              style={{
                background: "linear-gradient(145deg, #1a1a2e 0%, #12121f 100%)",
              }}
            >
              {/* Glow overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                style={{
                  background: d.color === "lime" 
                    ? "radial-gradient(ellipse at 50% 0%, rgba(88, 204, 2, 0.2) 0%, transparent 70%)"
                    : d.color === "hot-pink"
                    ? "radial-gradient(ellipse at 50% 0%, rgba(255, 45, 106, 0.2) 0%, transparent 70%)"
                    : d.color === "gold"
                    ? "radial-gradient(ellipse at 50% 0%, rgba(255, 200, 0, 0.2) 0%, transparent 70%)"
                    : "radial-gradient(ellipse at 50% 0%, rgba(28, 176, 246, 0.2) 0%, transparent 70%)"
                }}
              />
              
              {/* Icon */}
              <div 
                className="relative w-16 h-16 grid place-items-center text-4xl border-4 border-ink rounded-xl mb-5 transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: d.color === "lime" ? "var(--lime)" 
                    : d.color === "hot-pink" ? "var(--hot-pink)" 
                    : d.color === "gold" ? "var(--gold)" 
                    : "var(--electric-blue)",
                  boxShadow: "0 5px 0 var(--ink)"
                }}
              >
                {d.icon}
              </div>
              
              {/* Content */}
              <h3 
                className="relative text-lg font-black text-paper mb-2 tracking-wider transition-colors duration-200"
                style={{ 
                  color: d.color === "lime" ? "var(--lime)" 
                    : d.color === "hot-pink" ? "var(--hot-pink)" 
                    : d.color === "gold" ? "var(--gold)" 
                    : "var(--electric-blue)"
                }}
              >
                {d.title}
              </h3>
              <p className="relative text-sm text-paper/70 leading-relaxed mb-5">{d.desc}</p>
              
              {/* Meta tags */}
              <div className="relative flex flex-wrap gap-2">
                {d.meta.map((m) => (
                  <span 
                    key={m}
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      color: d.color === "lime" ? "var(--lime)" 
                        : d.color === "hot-pink" ? "var(--hot-pink)" 
                        : d.color === "gold" ? "var(--gold)" 
                        : "var(--electric-blue)",
                      background: d.color === "lime" ? "rgba(88, 204, 2, 0.15)" 
                        : d.color === "hot-pink" ? "rgba(255, 45, 106, 0.15)" 
                        : d.color === "gold" ? "rgba(255, 200, 0, 0.15)" 
                        : "rgba(28, 176, 246, 0.15)"
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Play indicator */}
              <div className="absolute top-5 right-5 w-8 h-8 grid place-items-center rounded-full bg-ink/50 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-110">
                <span className="text-paper text-sm">▶</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
