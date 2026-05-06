export function Testimonials() {
  const testimonials = [
    {
      quote: "The Codex has transformed how I preserve my research. It feels less like software and more like a sacred practice of knowledge keeping.",
      author: "Dr. Eleanor Vance",
      title: "Professor of Medieval History",
      institution: "Cambridge University"
    },
    {
      quote: "Finally, a tool that respects the gravity of written thought. My team has never been more aligned in our collaborative writing.",
      author: "Marcus Chen",
      title: "Lead Architect",
      institution: "Meridian Studios"
    },
    {
      quote: "The writing experience is transcendent. I find myself entering deeper states of focus than ever before.",
      author: "Sister Amelia Wright",
      title: "Author & Contemplative",
      institution: "Abbey of St. Clare"
    }
  ]

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="manuscript-divider max-w-xs mx-auto mb-6">
            <span className="font-serif text-sm tracking-widest uppercase text-accent">Testimonium</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-background mb-6">
            Words from Fellow Scribes
          </h2>
          <p className="font-sans text-lg text-background/70 max-w-2xl mx-auto">
            Those who have walked this path before you share their wisdom.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.author}
              className="relative p-8 bg-background/5 border border-background/10 group hover:bg-background/10 transition-colors"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 left-6 text-accent/30 font-serif text-6xl leading-none">
                &ldquo;
              </div>
              
              {/* Content */}
              <div className="relative z-10 pt-8">
                <blockquote className="font-sans text-background/90 leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="border-t border-background/10 pt-4">
                  <div className="font-serif text-background">{testimonial.author}</div>
                  <div className="font-sans text-sm text-background/60">{testimonial.title}</div>
                  <div className="font-sans text-xs text-accent/70 mt-1">{testimonial.institution}</div>
                </div>
              </div>

              {/* Corner Ornament */}
              <div className="absolute bottom-4 right-4 w-8 h-8 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
                  <path d="M100 100 L70 100 L70 95 L95 95 L95 70 L100 70 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-background/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-4xl md:text-5xl text-accent mb-2">4M+</div>
              <div className="font-sans text-sm text-background/60">Scribes Worldwide</div>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-5xl text-accent mb-2">50B+</div>
              <div className="font-sans text-sm text-background/60">Words Preserved</div>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-5xl text-accent mb-2">190+</div>
              <div className="font-sans text-sm text-background/60">Kingdoms Served</div>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-5xl text-accent mb-2">99.9%</div>
              <div className="font-sans text-sm text-background/60">Archive Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
