# Notion Atlas

Notion reimagined as a **living paper operating system** for the ElevenHacks "Redesign the Web" challenge.

The content stays recognizably Notion: docs, projects, wiki pages, databases, collaboration, and AI. The visual style changes completely: tactile paper grid, sharp ink borders, editorial type, red annotations, blue progress, stacked workspace cards, and a voice guide for dense workspaces.

## Real Notion Signals Used

- Docs support 50+ content types such as code snippets, toggles, embeds, tables of contents, and charts.
- Projects include databases, timelines, charts, priority labels, status tags, automations, forms, filters, tasks, subtasks, dependencies, and progress bars.
- Notion AI includes meeting notes, enterprise search, connected app answers, research, translation, database autofill, and model selection.
- Official connection examples include Figma, GitHub, Slack, Jira, and Amplitude.
- Marketplace pages show thousands of templates across docs, project management, and wiki use cases.

## Run

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Build

```bash
npm run build
```

## ElevenLabs Voice

The app includes an ElevenLabs Text-to-Speech proxy route:

```text
POST /api/narrate
```

Default voice ID:

```text
ewrYJABAiNSuVLoXECzw
```

Run locally with ElevenLabs:

```bash
ELEVENLABS_API_KEY=your_key npm run dev
```

Optional voice override:

```bash
ELEVENLABS_VOICE_ID=ewrYJABAiNSuVLoXECzw ELEVENLABS_API_KEY=your_key npm run dev
```

If `ELEVENLABS_API_KEY` is not configured, narration is disabled and the UI asks for the ElevenLabs API key. There is no browser voice fallback, so spoken briefs always use the configured ElevenLabs voice.

## Judge Flow

1. Open the workspace and click **Play Voice Brief**.
2. Briefing Mode activates the waveform, live transcript, progress bar, highlighted workspace cards, and typed AI summary.
3. Switch between Brief, Database, Graph, Automations, Integrations, and Voice tabs to inspect the full Notion Atlas operating surface.
4. Use the command palette with `/brief workspace`, `/show graph`, `/read with editor voice`, and `/summarize launch room`.
5. Switch voice modes: Editor, Archivist, and Operator. Each mode calls the ElevenLabs route with tuned voice settings.

## Submission Angle

Notion pages can become dense fast. Notion Atlas keeps the all-in-one workspace idea, but reframes it as a tactile command desk where important pages can brief you out loud. The ElevenLabs layer makes the redesign more than visual: it turns a workspace into something you can listen to, skim, and understand faster.

## Core Line

```text
What if Notion felt less like software and more like a living field desk for your team’s memory?
```
