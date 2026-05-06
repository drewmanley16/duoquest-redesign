"use client"

import { useEffect, useState } from "react"

interface HeroProps {
  onReadAloud?: (text: string) => void
}

export function Hero({ onReadAloud }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const heroText = "Inscribe your thoughts in the eternal archive. A sanctuary where your notes, documents, and wisdom are preserved like illuminated manuscripts of ages past."

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden parchment-texture">
      {/* Decorative Border Frame */}
      <div className="absolute inset-8 border border-accent/20 pointer-events-none" />
      <div className="absolute inset-12 border border-accent/10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Decorative Top Element */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="manuscript-divider max-w-xs mx-auto">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        </div>

        {/* Main Heading */}
        <h1 
          className={`font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight tracking-tight mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="block">Where Knowledge</span>
          <span className="block mt-2">
            Finds <span className="gold-leaf">Sanctuary</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {heroText}
        </p>

        {/* Read Aloud Button */}
        <button
          onClick={() => onReadAloud?.(heroText)}
          className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 mb-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
          Read this passage aloud
        </button>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <a 
            href="#" 
            className="group relative px-8 py-4 bg-foreground text-background font-sans text-base hover:bg-primary transition-colors"
          >
            <span className="relative z-10">Begin Your Chronicle</span>
            <span className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-100 transition-opacity -m-1" />
          </a>
          <a 
            href="#product" 
            className="group flex items-center gap-2 px-8 py-4 text-foreground font-sans text-base hover:text-primary transition-colors"
          >
            <span>Explore the Scriptorium</span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Trust Indicators */}
        <div 
          className={`mt-16 pt-8 border-t border-muted-foreground/20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-sm text-muted-foreground/60 mb-6 font-sans tracking-wide uppercase">
            Trusted by scholars across the realm
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
            {['Oxford', 'Cambridge', 'Harvard', 'Yale', 'Stanford'].map((name) => (
              <span key={name} className="font-serif text-lg text-muted-foreground">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  )
}
