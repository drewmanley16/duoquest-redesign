# Notion Atlas

Notion reimagined as a **living paper operating system** for the ElevenHacks "Redesign the Web" challenge.

The content stays recognizably Notion: docs, projects, wiki pages, databases, collaboration, and AI. The visual style changes completely: tactile paper grid, sharp ink borders, editorial type, red annotations, blue progress, stacked workspace cards, and a voice guide for dense workspaces.

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

If `ELEVENLABS_API_KEY` is not configured, the UI falls back to browser speech synthesis so the demo still works.

## Demo Beats

1. First frame: Notion Atlas hero and workspace preview.
2. Click **Play Voice Brief**.
3. Click Docs / Projects / Wiki cards in the workspace preview.
4. Scroll to the workspace section and click **Read workspace note aloud**.
5. Scroll to the ElevenLabs section.
6. Click **Read site overview**, **Summarize workspace**, and **Explain AI guide**.
7. Show ambient modes: off, library, rain, focus.

## Submission Angle

Notion pages can become dense fast. Notion Atlas keeps the all-in-one workspace idea, but reframes it as a tactile command desk where important pages can brief you out loud. The ElevenLabs layer makes the redesign more than visual: it turns a workspace into something you can listen to, skim, and understand faster.

## Video Hook

```text
What if Notion felt less like software and more like a living field desk for your team’s memory?
```
