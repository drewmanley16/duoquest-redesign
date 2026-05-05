const dungeons = [
  {
    id: "languages",
    icon: "言",
    title: "LANGUAGE REALMS",
    desc: "40+ worlds including Spanish, Japanese, Korean, French, German, and more",
    meta: ["★ 500M+ players", "⏱ 5 min runs"],
    color: "lime"
  },
  {
    id: "math",
    icon: "π",
    title: "MATH CATACOMBS",
    desc: "Multiplication pits, fraction mazes, geometry puzzles",
    meta: ["★ Brain training", "⏱ Quick solve"],
    color: "hot-pink"
  },
  {
    id: "music",
    icon: "♫",
    title: "MUSIC TOWER",
    desc: "Read notes, match rhythms, play melodies by ear",
    meta: ["★ No instrument", "⏱ Rhythm gates"],
    color: "gold"
  },
  {
    id: "chess",
    icon: "♞",
    title: "CHESS FORTRESS",
    desc: "Master openings, earn tactics badges, puzzle battles",
    meta: ["★ 500+ puzzles", "⏱ Match scenarios"],
    color: "electric-blue"
  },
]

export function DungeonSelect() {
  return (
    <section 
      className="py-16 lg:py-24 px-4 lg:px-16"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(88, 204, 2, 0.08) 0%, transparent 50%), linear-gradient(180deg, #0a0a12 0%, #0f0f1a 100%)"
      }}
    >
      <h2 className="flex items-center justify-center gap-4 text-2xl lg:text-4xl font-black text-paper text-center mb-2 tracking-wider">
        <span className="text-gold text-lg lg:text-2xl">◆</span>
        SELECT YOUR DUNGEON
        <span className="text-gold text-lg lg:text-2xl">◆</span>
      </h2>
      <p className="text-center text-paper/70 text-base mb-10">Every Duolingo course becomes a playable world</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
        {dungeons.map((d) => (
          <article
            key={d.id}
            className="relative p-6 overflow-hidden rounded-xl border-4 border-ink transition-all duration-200 hover:-translate-y-1.5"
            style={{
              background: "linear-gradient(145deg, #1a1a2e 0%, #12121f 100%)",
              boxShadow: "0 8px 0 var(--ink), 0 12px 30px rgba(0, 0, 0, 0.5)"
            }}
          >
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: d.color === "lime" 
                  ? "radial-gradient(ellipse at 50% 0%, rgba(88, 204, 2, 0.15) 0%, transparent 60%)"
                  : d.color === "hot-pink"
                  ? "radial-gradient(ellipse at 50% 0%, rgba(255, 45, 106, 0.15) 0%, transparent 60%)"
                  : d.color === "gold"
                  ? "radial-gradient(ellipse at 50% 0%, rgba(255, 200, 0, 0.15) 0%, transparent 60%)"
                  : "radial-gradient(ellipse at 50% 0%, rgba(28, 176, 246, 0.15) 0%, transparent 60%)"
              }}
            />
            <div 
              className="w-14 h-14 grid place-items-center text-3xl font-black border-[3px] border-ink rounded-xl mb-4"
              style={{
                background: d.color === "lime" ? "var(--lime)" 
                  : d.color === "hot-pink" ? "var(--hot-pink)" 
                  : d.color === "gold" ? "var(--gold)" 
                  : "var(--electric-blue)",
                color: d.color === "lime" || d.color === "gold" ? "var(--ink)" : "white",
                boxShadow: "0 4px 0 var(--ink)"
              }}
            >
              {d.icon}
            </div>
            <h3 className="text-lg font-black text-paper mb-2 tracking-wider">{d.title}</h3>
            <p className="text-sm text-paper/75 leading-relaxed mb-4">{d.desc}</p>
            <div className="flex flex-wrap gap-2">
              {d.meta.map((m) => (
                <span 
                  key={m}
                  className="text-[0.7rem] font-bold px-2 py-1 rounded"
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
          </article>
        ))}
      </div>
    </section>
  )
}
