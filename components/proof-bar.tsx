const stats = [
  { value: "500M+", label: "downloads", icon: "📱" },
  { value: "40+", label: "languages", icon: "🌍" },
  { value: "34 hrs", label: "= 1 semester", icon: "🎓" },
  { value: "FREE", label: "forever", icon: "💚" },
]

export function ProofBar() {
  return (
    <section className="py-12 lg:py-20 px-4 lg:px-16 bg-hud-bg border-t-4 border-[#2a3a4a]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {stats.map((stat, i) => (
          <div 
            key={stat.label} 
            className="text-center p-6 rounded-xl transition-all duration-200 hover:bg-white/5"
          >
            <span className="block text-3xl mb-3">{stat.icon}</span>
            <strong 
              className="block text-4xl lg:text-6xl font-black leading-none"
              style={{ 
                color: i === 0 ? "var(--lime)" : i === 1 ? "var(--electric-blue)" : i === 2 ? "var(--gold)" : "var(--hot-pink)",
                textShadow: `0 0 30px ${i === 0 ? "rgba(88, 204, 2, 0.4)" : i === 1 ? "rgba(28, 176, 246, 0.4)" : i === 2 ? "rgba(255, 200, 0, 0.4)" : "rgba(255, 45, 106, 0.4)"}` 
              }}
            >
              {stat.value}
            </strong>
            <span className="block mt-3 text-sm font-bold text-paper/60 uppercase tracking-widest">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-paper/40 font-bold tracking-wider">
          A <span className="text-lime">v0.dev</span> × <span className="text-electric-blue">ElevenLabs</span> Hackathon Entry
        </p>
        <p className="mt-2 text-xs text-paper/30">
          Concept redesign of Duolingo as an Arcade RPG interface
        </p>
      </div>
    </section>
  )
}
