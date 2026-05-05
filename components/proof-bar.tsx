const stats = [
  { value: "500M+", label: "downloads" },
  { value: "40+", label: "language courses" },
  { value: "34 hrs", label: "= 1 semester" },
  { value: "FREE", label: "forever" },
]

export function ProofBar() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8 lg:py-16 px-4 lg:px-16 bg-hud-bg border-t-4 border-[#2a3a4a]">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center p-4">
          <strong 
            className="block text-3xl lg:text-5xl font-black text-lime leading-none"
            style={{ textShadow: "0 0 20px rgba(88, 204, 2, 0.3)" }}
          >
            {stat.value}
          </strong>
          <span className="block mt-2 text-sm font-bold text-paper/70 uppercase tracking-widest">
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  )
}
