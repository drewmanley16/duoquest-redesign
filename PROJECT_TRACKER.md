# Project Tracker: Notion Redesign

## Current Concept

We are redesigning Notion's website as **Notion Atlas**, a living paper operating system.

The product stays recognizably Notion:
- Notes and documents
- Team wiki
- Projects and roadmaps
- Databases and structured views
- Collaboration
- AI-assisted summaries and writing

The visual style is intentionally different:
- Tactile paper operating system
- Editorial field-desk layout
- High-contrast ink, warm paper, red annotation, and blue progress accents
- Workspace preview as the first screen
- Sharp borders, grid paper, stacked cards, and notebook/table motifs
- Voice guide built into the product story

## Current Demo

Run locally:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

Verified on May 6, 2026:
- Next dev server starts
- Home page returns `200 OK`
- Browser console has no errors
- `npm run build` passes

## Completed

- Replaced the earlier Duolingo direction with a Notion redesign.
- Replaced the overdone monastic/manuscript version with a cleaner Notion Atlas direction.
- Built a new first viewport around an actual workspace preview, not a decorative hero.
- Added sticky Notion Atlas header.
- Added responsive hero copy and CTA buttons.
- Added interactive workspace preview cards:
  - Docs
  - Projects
  - Wiki
- Added product explanation section with a notebook/table preview.
- Added feature grid for Notion-like jobs:
  - Write
  - Organize
  - Collaborate
  - Ask AI
- Added ElevenLabs-style voice guide area with:
  - Voice mute toggle
  - Site overview narration
  - Workspace summary narration
  - AI guide narration
  - Ambient mode selector
  - Editor, Archivist, and Operator voice modes
- Added ElevenLabs `/api/narrate` route using default voice ID `ewrYJABAiNSuVLoXECzw`.
- Added browser speech synthesis fallback for demo narration when `ELEVENLABS_API_KEY` is not configured.
- Added Briefing Mode as the core memorable interaction:
  - Background shifts into active state.
  - Workspace shadow turns blue.
  - Progress bar fills.
  - Voice waveform animates.
  - Key cards glow/outline.
  - Live transcript appears.
  - AI summary types in.
- Added stronger first-frame visual details:
  - Dramatic label: "Notion, if it was a living desk".
  - Bigger workspace mockup.
  - Launch Room dashboard chips.
  - Folded map/page corners.
  - Red editorial annotation marks.
  - Blue database grid/progress accents.
  - Sticky-note callout.
  - Page tabs protruding from the workspace.
  - Animated collaborator cursor and presence badges.
- Removed unused old component files from the previous version.
- Added `.gitignore` for generated files.
- Updated package name to `notion-atlas-redesign`.

## Key Files

- `app/page.tsx` — current one-page Notion Atlas experience and voice interactions.
- `app/api/narrate/route.ts` — ElevenLabs Text-to-Speech proxy route.
- `app/globals.css` — full visual system and responsive styling.
- `app/layout.tsx` — metadata and root layout.
- `next.config.js` — Next config with local output tracing root.
- `.gitignore` — excludes generated build/dependency files.

## Interactive Demo Moments

Use these in the video/demo:

1. First frame: show the headline and workspace preview.
2. Click **Play Voice Brief** to trigger Briefing Mode.
3. Show the waveform, blue active workspace, transcript, progress bar, and generated AI summary.
4. Click the Docs / Projects / Wiki cards inside the workspace preview.
5. Scroll to the workspace section and click **Read workspace note aloud**.
6. Scroll to the ElevenLabs section.
7. Switch voice modes: Editor, Archivist, Operator.
8. Click **Start Briefing Mode**, **Summarize workspace**, and **Explain AI guide**.
9. Toggle ambient modes: off, library, rain, focus.

## Needs Cleanup

- Rewrite README for the Notion Atlas submission.
- Add `ELEVENLABS_API_KEY` to local/Vercel environment.
- Decide whether the repo should keep `pnpm-lock.yaml` or switch fully to npm.
- Commit the redesign cleanup.
- Deploy to Vercel.
- Record demo video around the first viewport and voice guide.

## Suggested Next Steps

1. Add `ELEVENLABS_API_KEY` locally and in Vercel.
2. Rewrite README and submission copy for Notion Atlas.
3. Commit and push this cleaner redesign.
4. Deploy to Vercel.
5. Record the submission video.
