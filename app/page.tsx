"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type AmbientMode = "off" | "library" | "rain" | "focus"
type VoiceMode = "editor" | "archivist" | "operator"
type AtlasView = "brief" | "database" | "graph" | "automations" | "integrations" | "voice"
type LaunchPhase = "Draft" | "Review" | "Launch"

const tourLines = {
  overview:
    "Briefing mode active. Notion Atlas turns docs, projects, wiki pages, and AI into a living paper desk. The real Notion product spans docs, wikis, projects, databases, charts, automations, forms, integrations, AI search, meeting notes, and thousands of templates.",
  workspace:
    "The canvas keeps Notion recognizable: documents, tables, project boards, and wiki pages all live together, but the interface feels like a field desk for serious ideas.",
  ai:
    "The voice layer summarizes your workspace, reads page briefs aloud, and helps you move through dense knowledge without staring at every block. In production this can narrate project status, database changes, AI summaries, and meeting notes.",
  data:
    "Reality layer. Notion officially highlights more than fifty content types in docs, configurable project databases with timelines and charts, AI meeting notes and enterprise search, and integrations with tools like Figma, Slack, GitHub, Jira, and Amplitude.",
}

const voiceModes: Array<{ id: VoiceMode; label: string; note: string }> = [
  { id: "editor", label: "Editor", note: "crisp page critique" },
  { id: "archivist", label: "Archivist", note: "calm memory keeper" },
  { id: "operator", label: "Operator", note: "fast launch control" },
]

const workspaceCards = [
  {
    label: "Docs",
    title: "Launch Notes",
    meta: "Edited 4 min ago",
    body: "A focused writing surface for plans, specs, meeting notes, and long-form thinking.",
  },
  {
    label: "Projects",
    title: "Roadmap Board",
    meta: "12 active tasks",
    body: "Tasks, owners, statuses, and timelines arranged like a command table.",
  },
  {
    label: "Wiki",
    title: "Team Memory",
    meta: "238 pages",
    body: "A searchable source of truth where decisions, context, and references stay connected.",
  },
]

const features = [
  ["Docs", "50+ content types: code snippets, toggles, embeds, tables of contents, charts, and more."],
  ["Projects", "Databases, timelines, progress bars, dependencies, tasks, subtasks, automations, and forms."],
  ["AI", "Meeting notes, enterprise search, AI autofill, research, model picker, translation, and doc drafting."],
  ["Connections", "Figma, GitHub, Slack, Jira, Amplitude, and more keep project context in the workspace."],
]

const aiSummary =
  "AI summary generated: Notion Atlas keeps real product facts visible: docs, wikis, projects, charts, forms, automations, integrations, AI search, meeting notes, and templates."

const waveformBars = [32, 62, 46, 82, 38, 70, 54, 92, 44, 68, 36, 76, 52, 88, 42, 64]

const proofStats = [
  { value: "50+", label: "doc content types", source: "Notion Docs" },
  { value: "6.6k+", label: "top docs templates", source: "Marketplace" },
  { value: "4k+", label: "roadmap & calendar templates", source: "Marketplace" },
  { value: "100-1000+", label: "team-size trust band", source: "Projects page" },
]

const realityRows = [
  {
    label: "Docs",
    evidence: "Code snippets, toggles, embeds, table of contents, charts, and 50+ more content types.",
    atlas: "Voice can read complex docs as short executive briefs.",
  },
  {
    label: "Projects",
    evidence: "Databases, timelines, charts, priority labels, status tags, automations, filters, forms, and permissions.",
    atlas: "Briefing Mode turns project data into a launch-room readout.",
  },
  {
    label: "AI",
    evidence: "AI meeting notes, enterprise search, connected app answers, research mode, database autofill, and model picker.",
    atlas: "The workspace can narrate summaries instead of making users hunt through pages.",
  },
  {
    label: "Connections",
    evidence: "Figma, Slack, GitHub, Jira, and Amplitude are official Notion connection examples.",
    atlas: "External signals become source cards inside the paper OS.",
  },
]

const integrationSignals = ["Figma", "GitHub", "Slack", "Jira", "Amplitude", "Calendar", "Mail", "Forms"]
const liveSignals = ["GitHub PR merged", "Slack thread linked", "AI summary updated", "3 new meeting notes"]
const agentSuggestions = ["3 docs mention launch risk", "GitHub signal changed project status", "Create a briefing?"]
const launchDate = new Date("2026-05-07T17:00:00-07:00")

const launchChecklist = ["Workspace brief ready", "Custom voice connected", "Reality data loaded", "Launch room synced"]
const activityFeed = [
  { time: "11:02", source: "GitHub", event: "PR merged into main" },
  { time: "11:04", source: "Slack", event: "Launch thread linked" },
  { time: "11:07", source: "AI", event: "Summary regenerated" },
  { time: "11:11", source: "Calendar", event: "Submission window flagged" },
]

const atlasViews: Array<{ id: AtlasView; label: string; title: string; narration: string }> = [
  {
    id: "brief",
    label: "Brief",
    title: "Launch intelligence",
    narration:
      "Brief view condenses the workspace into decisions, risks, owners, active docs, project status, and the next action.",
  },
  {
    id: "database",
    label: "Database",
    title: "Live project database",
    narration:
      "Database view shows how Notion Atlas keeps tasks, status, owners, due dates, priority, and connected docs in one readable ledger.",
  },
  {
    id: "graph",
    label: "Graph",
    title: "Knowledge graph",
    narration:
      "Graph view reveals the hidden links between docs, wiki pages, project plans, meeting notes, AI summaries, and external tools.",
  },
  {
    id: "automations",
    label: "Automations",
    title: "Workflow relay",
    narration:
      "Automation view turns Notion actions into a visible relay: forms create tasks, GitHub updates status, AI drafts summaries, and Slack notifies the team.",
  },
  {
    id: "integrations",
    label: "Integrations",
    title: "Connected signals",
    narration:
      "Integrations view pulls Figma, GitHub, Slack, Jira, Amplitude, Calendar, Mail, and Forms into the same operating desk.",
  },
  {
    id: "voice",
    label: "Voice",
    title: "Narrated workspace",
    narration:
      "Voice view makes the ElevenLabs layer obvious with modes for Editor, Archivist, and Operator, plus live captions and waveforms.",
  },
]

export default function Home() {
  const [activeCard, setActiveCard] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [toast, setToast] = useState("")
  const [ambient, setAmbient] = useState<AmbientMode>("off")
  const [voiceMode, setVoiceMode] = useState<VoiceMode>("editor")
  const [briefingMode, setBriefingMode] = useState(false)
  const [isNarrating, setIsNarrating] = useState(false)
  const [briefProgress, setBriefProgress] = useState(34)
  const [transcript, setTranscript] = useState("Ready for voice brief.")
  const [typedSummary, setTypedSummary] = useState("")
  const [cursorTarget, setCursorTarget] = useState(0)
  const [activeAtlasView, setActiveAtlasView] = useState<AtlasView>("brief")
  const [compareSplit, setCompareSplit] = useState(52)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [agentIndex, setAgentIndex] = useState(0)
  const [signalIndex, setSignalIndex] = useState(0)
  const [now, setNow] = useState(() => new Date())
  const [launchPhase, setLaunchPhase] = useState<LaunchPhase>("Review")
  const [checkedItems, setCheckedItems] = useState<boolean[]>([true, false, false, false])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressTimerRef = useRef<number | null>(null)

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2800)
  }, [])

  useEffect(() => {
    if (!briefingMode) {
      setTypedSummary("")
      return
    }

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedSummary(aiSummary.slice(0, index))
      if (index >= aiSummary.length) {
        window.clearInterval(timer)
      }
    }, 28)

    return () => window.clearInterval(timer)
  }, [briefingMode])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCursorTarget((current) => (current + 1) % 3)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAgentIndex((current) => (current + 1) % agentSuggestions.length)
      setSignalIndex((current) => (current + 1) % liveSignals.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA"

      if (!isTyping && event.key === "/") {
        event.preventDefault()
        setPaletteOpen(true)
      }

      if (event.key === "Escape") {
        setPaletteOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const finishNarration = useCallback(() => {
    setIsNarrating(false)
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }, [])

  const runProgress = useCallback(() => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current)
    }

    setBriefProgress(8)
    progressTimerRef.current = window.setInterval(() => {
      setBriefProgress((current) => {
        if (current >= 100) {
          if (progressTimerRef.current) {
            window.clearInterval(progressTimerRef.current)
            progressTimerRef.current = null
          }
          return 100
        }

        return current + 4
      })
    }, 140)
  }, [])

  const speak = useCallback(
    async (text: string, mode: VoiceMode = voiceMode) => {
      if (!soundEnabled) {
        showToast("Voice guide is muted")
        return
      }

      setIsNarrating(true)
      setTranscript(text)

      try {
        if (audioRef.current) {
          audioRef.current.pause()
          URL.revokeObjectURL(audioRef.current.src)
        }

        showToast(`Generating ${mode} voice brief`)
        const response = await fetch("/api/narrate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text, voiceMode: mode }),
        })

        if (!response.ok) {
          throw new Error("Narration unavailable")
        }

        const blob = await response.blob()
        const audio = new Audio(URL.createObjectURL(blob))
        audioRef.current = audio
        audio.onended = finishNarration
        audio.onerror = finishNarration
        await audio.play()
        showToast("Playing ElevenLabs voice brief")
        return
      } catch {
        showToast("ElevenLabs API key required for custom voice")
        finishNarration()
      }
    },
    [finishNarration, showToast, soundEnabled, voiceMode],
  )

  const startBriefing = useCallback(() => {
    setBriefingMode(true)
    setActiveCard(1)
    runProgress()
    speak(tourLines.overview, voiceMode)
  }, [runProgress, speak, voiceMode])

  const changeAmbient = (mode: AmbientMode) => {
    setAmbient(mode)
    showToast(mode === "off" ? "Ambient layer off" : `${mode[0].toUpperCase()}${mode.slice(1)} ambience selected`)
  }

  const goToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const commandActions = [
    {
      command: "/brief workspace",
      detail: "Trigger Briefing Mode",
      run: () => startBriefing(),
    },
    {
      command: "/show graph",
      detail: "Open the knowledge graph tab",
      run: () => {
        goToSection("#atlas-lab")
        setActiveAtlasView("graph")
      },
    },
    {
      command: "/read with editor voice",
      detail: "Narrate the workspace with Editor mode",
      run: () => {
        setVoiceMode("editor")
        speak(tourLines.workspace, "editor")
      },
    },
    {
      command: "/summarize launch room",
      detail: "Read the real Notion data brief",
      run: () => speak(tourLines.data, "operator"),
    },
  ]

  const remainingMs = Math.max(0, launchDate.getTime() - now.getTime())
  const remainingHours = Math.floor(remainingMs / 3_600_000)
  const remainingMinutes = Math.floor((remainingMs % 3_600_000) / 60_000)
  const remainingSeconds = Math.floor((remainingMs % 60_000) / 1000)
  const completedCount = checkedItems.filter(Boolean).length

  const cyclePhase = () => {
    const phases: LaunchPhase[] = ["Draft", "Review", "Launch"]
    setLaunchPhase((current) => phases[(phases.indexOf(current) + 1) % phases.length])
    setBriefProgress((current) => Math.min(100, current + 7))
  }

  return (
    <main className={`atlas-shell ${briefingMode ? "briefing-mode" : ""}`}>
      <header className="atlas-nav">
        <a className="atlas-brand" href="#top" aria-label="Notion Atlas home">
          <span className="atlas-mark">N</span>
          <span>Notion Atlas</span>
        </a>
        <nav className="atlas-links" aria-label="Primary navigation">
          <a href="#workspace">Workspace</a>
          <a href="#features">Features</a>
          <a href="#voice">Voice</a>
        </nav>
        <div className="nav-actions">
          <button className="nav-cta subtle" type="button" onClick={() => setPaletteOpen(true)}>
            /
          </button>
          <button className="nav-cta" type="button" onClick={startBriefing}>
            Briefing Mode
          </button>
        </div>
      </header>

      <section className="atlas-hero" id="top">
        <div className="hero-copy">
          <p className="kicker hero-label">Notion, if it was a living desk</p>
          <h1>Your team wiki, docs, and projects as a tactile command desk.</h1>
          <p className="hero-lede">
            Same Notion promise: one place for notes, documents, projects, knowledge, and AI. New skin:
            a high-contrast editorial workspace built for scanning, connecting, and narrating what matters.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#workspace">
              Open Workspace
            </a>
            <button className="button ghost briefing-trigger" type="button" onClick={startBriefing}>
              Play Voice Brief
            </button>
          </div>
        </div>

        <div className="workspace-wrap">
          <div className="page-tabs" aria-hidden="true">
            <span>Brief</span>
            <span>Tasks</span>
            <span>AI</span>
          </div>
          <div className="workspace-device" aria-label="Notion Atlas workspace preview">
            <div className="fold fold-left" />
            <div className="fold fold-right" />
            <div className="annotation annotation-top">/ ask AI for the brief</div>
            <div className="sticky-note">Custom ElevenLabs voice powers every spoken brief.</div>
            <div className={`live-cursor target-${cursorTarget}`}>
              <span />
              <strong>{["Maya", "Dev", "AI"][cursorTarget]}</strong>
            </div>
          <div className="device-topbar">
              <span>Atlas / Team Home</span>
              <span className="clock-stamp">
                {now.toLocaleDateString(undefined, { month: "short", day: "numeric" })} ·{" "}
                {now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
              </span>
              <div className="presence" aria-label="Collaborators online">
                <span>M</span>
                <span>D</span>
                <span>AI</span>
              </div>
              <span className="status-pill">Live</span>
            </div>
            <div className="device-grid">
              <aside className="device-sidebar">
                <span className="sidebar-title">Spaces</span>
                <button className="sidebar-item active">Team Wiki</button>
                <button className="sidebar-item">Projects</button>
                <button className="sidebar-item">Docs</button>
                <button className="sidebar-item">Meetings</button>
              </aside>
              <div className="device-main">
                <div className="dashboard-header">
                  <div className="page-header">
                    <p>Today’s Brief</p>
                    <h2>Launch Room</h2>
                  </div>
                  <div className="task-chips" aria-label="Launch room status chips">
                    <span>50+ blocks</span>
                    <span>6.6k templates</span>
                    <button type="button" onClick={cyclePhase}>{launchPhase}</button>
                  </div>
                </div>
                <div className="launch-ribbon">
                  <span>Submission closes May 7, 2026 · 5:00 PM PT</span>
                  <strong>
                    T-{remainingHours}h {remainingMinutes}m {remainingSeconds}s
                  </strong>
                </div>
                <div className="brief-grid">
                  <article>
                    <span>Docs</span>
                    <strong>50+ content types</strong>
                  </article>
                  <article>
                    <span>Projects</span>
                    <strong>Timelines + charts</strong>
                  </article>
                  <article>
                    <span>AI</span>
                    <strong>Search + meeting notes</strong>
                  </article>
                </div>
                <div className="signal-strip" aria-label="Connected workspace signals">
                  {integrationSignals.slice(0, 5).map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
                <div className="voice-layer">
                  <div>
                    <span>Voice Layer</span>
                    <strong>{briefingMode ? "Briefing Mode" : "Standby"}</strong>
                  </div>
                  <div className={`waveform ${isNarrating ? "playing" : ""}`} aria-hidden="true">
                    {waveformBars.map((height, index) => (
                      <i key={index} style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }} />
                    ))}
                  </div>
                </div>
                <div className="timeline" aria-label="Briefing progress">
                  <span style={{ width: `${briefProgress}%` }} />
                </div>
                <div className="operations-row">
                  <div className="checklist-card">
                    <span>Launch checklist</span>
                    {launchChecklist.map((item, index) => (
                      <button
                        key={item}
                        type="button"
                        className={checkedItems[index] ? "checked" : ""}
                        onClick={() => {
                          setCheckedItems((items) => items.map((checked, itemIndex) => itemIndex === index ? !checked : checked))
                          setBriefProgress((current) => Math.min(100, current + 6))
                        }}
                      >
                        {item}
                      </button>
                    ))}
                    <small>{completedCount}/{launchChecklist.length} complete</small>
                  </div>
                  <div className="activity-card">
                    <span>Live activity</span>
                    {activityFeed.map((activity, index) => (
                      <p key={`${activity.time}-${activity.source}`} className={index === signalIndex ? "active" : ""}>
                        <strong>{activity.time}</strong> {activity.source}: {activity.event}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="paper-stack">
                  {workspaceCards.map((card, index) => (
                    <button
                      key={card.title}
                      className={`paper-card card-${index} ${activeCard === index ? "selected" : ""}`}
                      type="button"
                      onClick={() => {
                        setActiveCard(index)
                        setBriefProgress((current) => Math.min(100, current + 12))
                      }}
                    >
                      <span>{card.label}</span>
                      <strong>{card.title}</strong>
                      <small>{card.meta}</small>
                    </button>
                  ))}
                </div>
                <div className={`ai-summary ${briefingMode ? "visible" : ""}`}>
                  <span>AI summary generated</span>
                  <p>{typedSummary || "Waiting for briefing mode..."}</p>
                </div>
                <div className={`caption-panel ${briefingMode ? "visible" : ""}`}>
                  <span>Live transcript</span>
                  <p>{transcript}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-ledger" aria-label="Official Notion product proof points">
        {proofStats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <small>{stat.source}</small>
          </article>
        ))}
      </section>

      <section className="section compare-section" id="compare">
        <div className="section-heading">
          <p className="kicker">Before / after</p>
          <h2>The whole challenge in one draggable frame.</h2>
          <p>Drag the divider to move from a familiar Notion-style workspace into the Notion Atlas redesign.</p>
        </div>
        <div className="compare-frame" style={{ "--split": `${compareSplit}%` } as React.CSSProperties}>
          <div className="compare-side current">
            <span>Current Notion</span>
            <h3>Clean workspace</h3>
            <div className="current-ui">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="compare-side atlas">
            <span>Notion Atlas</span>
            <h3>Living desk</h3>
            <div className="atlas-ui-mini">
              <strong>Voice layer</strong>
              <p>Briefing Mode active</p>
              <em>AI summary generated</em>
            </div>
          </div>
          <input
            aria-label="Compare current Notion and Notion Atlas"
            type="range"
            min="15"
            max="85"
            value={compareSplit}
            onChange={(event) => setCompareSplit(Number(event.target.value))}
          />
          <div className="compare-handle" />
        </div>
      </section>

      <section className="section atlas-lab-section" id="atlas-lab">
        <div className="section-heading">
          <p className="kicker">Multi-view Atlas</p>
          <h2>Six tabs. One workspace. A full operating surface.</h2>
          <p>
            This makes the redesign feel like an actual product shell: switch between a brief, database, knowledge
            graph, automation relay, connected signals, and the ElevenLabs voice layer.
          </p>
        </div>
        <div className="atlas-lab">
          <div className="atlas-tabbar" role="tablist" aria-label="Atlas views">
            {atlasViews.map((view) => (
              <button
                key={view.id}
                type="button"
                className={activeAtlasView === view.id ? "active" : ""}
                onClick={() => {
                  setActiveAtlasView(view.id)
                  setTranscript(view.narration)
                  setBriefProgress((current) => Math.min(100, current + 8))
                }}
              >
                {view.label}
              </button>
            ))}
          </div>
          <div className="atlas-panel">
            <div className="atlas-panel-header">
              <span>{atlasViews.find((view) => view.id === activeAtlasView)?.label}</span>
              <h3>{atlasViews.find((view) => view.id === activeAtlasView)?.title}</h3>
              <button
                className="text-button"
                type="button"
                onClick={() =>
                  speak(atlasViews.find((view) => view.id === activeAtlasView)?.narration || tourLines.overview)
                }
              >
                Narrate this tab
              </button>
            </div>

            {activeAtlasView === "brief" ? (
              <div className="brief-board">
                <article>
                  <span>Decision</span>
                  <strong>Keep real product facts visible</strong>
                </article>
                <article>
                  <span>Risk</span>
                  <strong>Briefing Mode reveals the key risks</strong>
                </article>
                <article>
                  <span>Next</span>
                  <strong>Custom voice brief is ready</strong>
                </article>
                <article>
                  <span>Metric</span>
                  <strong>50+ content types</strong>
                </article>
              </div>
            ) : null}

            {activeAtlasView === "database" ? (
              <div className="database-view">
                {[
                  ["Voice layer", "In review", "Design", "High"],
                  ["Reality layer", "Shipped", "Product", "High"],
                  ["Custom voice", "Ready", "Product", "Critical"],
                  ["ElevenLabs API", "Connected", "Engineering", "High"],
                ].map((row) => (
                  <div className="db-row" key={row.join("-")}>
                    {row.map((cell) => (
                      <span key={cell}>{cell}</span>
                    ))}
                  </div>
                ))}
              </div>
            ) : null}

            {activeAtlasView === "graph" ? (
              <div className="graph-view" aria-label="Knowledge graph visualization">
                {["Docs", "Wiki", "Projects", "AI", "Meeting notes", "GitHub", "Figma"].map((node, index) => (
                  <span key={node} className={`graph-node node-${index}`}>
                    {node}
                  </span>
                ))}
                <i />
                <i />
                <i />
                <i />
              </div>
            ) : null}

            {activeAtlasView === "automations" ? (
              <div className="automation-view">
                {[
                  ["Form submitted", "Create project task"],
                  ["GitHub PR merged", "Update launch status"],
                  ["Meeting ends", "Generate AI summary"],
                  ["Risk marked high", "Send Slack brief"],
                ].map(([from, to]) => (
                  <article key={from}>
                    <span>{from}</span>
                    <strong>{to}</strong>
                  </article>
                ))}
              </div>
            ) : null}

            {activeAtlasView === "integrations" ? (
              <div className="integration-matrix">
                {integrationSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            ) : null}

            {activeAtlasView === "voice" ? (
              <div className="voice-tab-view">
                <div className={`console-waveform ${isNarrating ? "playing" : ""}`} aria-label="Voice waveform">
                  {waveformBars.map((height, index) => (
                    <i key={index} style={{ height: `${height}%`, animationDelay: `${index * 55}ms` }} />
                  ))}
                </div>
                <div className="voice-mode-row">
                  {voiceModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      className={voiceMode === mode.id ? "active" : ""}
                      onClick={() => setVoiceMode(mode.id)}
                    >
                      <strong>{mode.label}</strong>
                      <span>{mode.note}</span>
                    </button>
                  ))}
                </div>
                <div className="mini-caption">
                  <span>Live caption</span>
                  <p>{transcript}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section workspace-section" id="workspace">
        <div className="section-heading">
          <p className="kicker">The product stays Notion</p>
          <h2>Docs, databases, projects, and wiki pages still work as one system.</h2>
        </div>
        <div className="showcase-panel">
          <div className="showcase-copy">
            <span>{workspaceCards[activeCard].label}</span>
            <h3>{workspaceCards[activeCard].title}</h3>
            <p>{workspaceCards[activeCard].body}</p>
            <button className="text-button" type="button" onClick={() => speak(tourLines.workspace)}>
              Read workspace note aloud
            </button>
          </div>
          <div className="notebook-preview">
            <div className="map-pin">linked pages</div>
            <div className="notebook-line strong" />
            <div className="notebook-line" />
            <div className="notebook-line short" />
            <div className="notebook-table">
              <span>Task</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Voice layer</span>
              <span>In review</span>
              <span>Design</span>
              <span>Custom voice</span>
              <span>Ready</span>
              <span>Product</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section feature-section" id="features">
        <div className="section-heading compact">
          <p className="kicker">What it supports</p>
          <h2>Notion’s core jobs, reframed as a desk you can actually read.</h2>
        </div>
        <div className="feature-grid">
          {features.map(([title, body]) => (
            <article className="feature-card" key={title}>
              <span>{title}</span>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reality-section" id="reality">
        <div className="section-heading">
          <p className="kicker">Reality layer</p>
          <h2>Real Notion primitives, redesigned into something judges can remember.</h2>
          <p>
            This is the part that makes the redesign feel grounded: the page does not invent a fake product.
            It remixes the actual Notion ecosystem into a voice-guided operating desk.
          </p>
        </div>
        <div className="reality-grid">
          {realityRows.map((row) => (
            <article className="reality-card" key={row.label}>
              <span>{row.label}</span>
              <p>{row.evidence}</p>
              <strong>{row.atlas}</strong>
            </article>
          ))}
        </div>
        <div className="integration-tape" aria-label="Notion ecosystem signals">
          {integrationSignals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
        <button className="button primary" type="button" onClick={() => speak(tourLines.data, "archivist")}>
          Narrate Reality Layer
        </button>
      </section>

      <section className="voice-section" id="voice">
        <div className="voice-copy">
          <p className="kicker">ElevenLabs layer</p>
          <h2>A voice guide for dense workspaces.</h2>
          <p>
            Notion pages can become overwhelming. The audio layer gives every page a
            narrated brief through the custom ElevenLabs voice so people can understand a workspace faster.
            This build is wired to ElevenLabs voice ID <code>ewrYJABAiNSuVLoXECzw</code>.
          </p>
        </div>
        <div className="voice-console">
          <div className="console-row">
            <span>Voice Guide</span>
            <button type="button" onClick={() => setSoundEnabled(!soundEnabled)}>
              {soundEnabled ? "On" : "Muted"}
            </button>
          </div>
          <div className="voice-mode-row" aria-label="Voice modes">
            {voiceModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={voiceMode === mode.id ? "active" : ""}
                onClick={() => setVoiceMode(mode.id)}
              >
                <strong>{mode.label}</strong>
                <span>{mode.note}</span>
              </button>
            ))}
          </div>
          <div className={`console-waveform ${isNarrating ? "playing" : ""}`} aria-label="Voice waveform">
            {waveformBars.map((height, index) => (
              <i key={index} style={{ height: `${height}%`, animationDelay: `${index * 55}ms` }} />
            ))}
          </div>
          <button type="button" onClick={startBriefing}>
            Start Briefing Mode
          </button>
          <button type="button" onClick={() => speak(tourLines.workspace)}>
            Summarize workspace
          </button>
          <button type="button" onClick={() => speak(tourLines.ai, "operator")}>
            Explain AI guide
          </button>
          <button type="button" onClick={() => speak(tourLines.data, "archivist")}>
            Read real Notion data
          </button>
          <div className="mini-caption">
            <span>Transcript</span>
            <p>{transcript}</p>
          </div>
          <div className="ambient-row" aria-label="Ambient audio modes">
            {(["off", "library", "rain", "focus"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={ambient === mode ? "active" : ""}
                onClick={() => changeAmbient(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </section>

      <aside className="agent-card" aria-label="Atlas Agent suggestions">
        <div>
          <span>Atlas Agent</span>
          <strong>{agentSuggestions[agentIndex]}</strong>
        </div>
        <button type="button" onClick={startBriefing}>Brief it</button>
      </aside>

      <div className="live-feed" aria-live="polite">
        <span>{liveSignals[signalIndex]}</span>
      </div>

      <button className="floating-command" type="button" onClick={() => setPaletteOpen(true)}>
        /
      </button>

      {paletteOpen ? (
        <div className="palette-backdrop" onClick={() => setPaletteOpen(false)}>
          <div className="command-palette" onClick={(event) => event.stopPropagation()}>
            <div className="palette-input">/ command palette</div>
            {commandActions.map((action) => (
              <button
                key={action.command}
                type="button"
                onClick={() => {
                  action.run()
                  setPaletteOpen(false)
                }}
              >
                <strong>{action.command}</strong>
                <span>{action.detail}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {toast ? <div className="atlas-toast">{toast}</div> : null}
    </main>
  )
}
