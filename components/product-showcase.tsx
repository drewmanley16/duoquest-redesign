"use client"

import { useState } from "react"

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "The Scriptorium",
      subtitle: "Your sacred writing space",
      description: "A clean, distraction-free canvas where your thoughts flow like ink upon parchment. Write in peace, format with intention, and let your ideas take form.",
      features: ["Rich text formatting", "Markdown support", "Focus mode", "Custom templates"]
    },
    {
      title: "The Codex",
      subtitle: "Organize your knowledge",
      description: "Structure your wisdom into interconnected volumes. Create databases, link related passages, and build a personal library that grows with your understanding.",
      features: ["Flexible databases", "Linked references", "Custom properties", "Multiple views"]
    },
    {
      title: "The Collaboration",
      subtitle: "Gather your scribes",
      description: "Invite fellow scholars to contribute to your great works. Comment, edit, and build knowledge together in real-time harmony.",
      features: ["Real-time editing", "Comments & mentions", "Permission controls", "Version history"]
    }
  ]

  return (
    <section id="product" className="py-24 md:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="manuscript-divider max-w-xs mx-auto mb-6">
            <span className="font-serif text-sm tracking-widest uppercase text-accent">The Scriptorium</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Your Sacred Writing Chamber
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Every great manuscript begins with a single stroke. Discover the tools that transform thoughts into lasting wisdom.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-sans text-sm transition-all ${
                activeTab === index
                  ? 'bg-foreground text-background'
                  : 'bg-transparent text-muted-foreground hover:text-foreground border border-muted-foreground/30 hover:border-muted-foreground'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="font-sans text-sm text-accent tracking-wide uppercase">
              {tabs[activeTab].subtitle}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-6">
              {tabs[activeTab].title}
            </h3>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
              {tabs[activeTab].description}
            </p>

            {/* Feature List */}
            <ul className="grid grid-cols-2 gap-4">
              {tabs[activeTab].features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 font-sans text-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Preview */}
          <div className="order-1 lg:order-2">
            <div className="scriptorium-card">
              {/* Mock Interface */}
              <div className="border border-muted-foreground/20 bg-background">
                {/* Header Bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-muted-foreground/20">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="font-sans text-xs text-muted-foreground">Untitled Manuscript</span>
                  </div>
                </div>
                
                {/* Sidebar + Content */}
                <div className="flex min-h-[300px]">
                  {/* Sidebar */}
                  <div className="w-48 border-r border-muted-foreground/20 p-3 hidden sm:block">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 px-2 py-1.5 bg-foreground/5 rounded text-sm font-sans text-foreground">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        My Notes
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-sans text-muted-foreground">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        Projects
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-sans text-muted-foreground">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        Calendar
                      </div>
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 p-6">
                    <h4 className="font-serif text-2xl text-foreground mb-4">
                      <span className="illuminated-initial text-3xl">T</span>he Art of Note-Taking
                    </h4>
                    <div className="space-y-3 font-sans text-sm text-muted-foreground leading-relaxed">
                      <p>In the pursuit of knowledge, the written word serves as our most faithful companion...</p>
                      <p className="text-foreground/40">Begin typing to continue your manuscript...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
