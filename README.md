# DuoQuest

Duolingo reimagined as a retro arcade RPG language quest for the ElevenHacks "Redesign the Web" challenge.

This repo currently contains a local concept prototype. The intended next step is to use **v0** to generate the full production version, then bring the generated code back into this workspace for polish, ElevenLabs wiring, deployment, and submission packaging.

## What To Do In v0

1. Go to `https://v0.dev`.
2. Create a new project or chat.
3. Use Duolingo as the source website:
   - `https://www.duolingo.com/`
   - If cloning has issues, use `https://www.duolingo.com/nojs/splash` as the simpler content reference.
4. Paste the **Main v0 Prompt** below.
5. Let v0 generate the first version.
6. Use the follow-up prompts in this README to improve it.
7. Export or "Add to Codebase" and bring the generated project back here.

## Main v0 Prompt

```text
You are redesigning Duolingo's public website for the ElevenHacks "Redesign the Web" challenge.

Goal:
Clone the core content and product story of Duolingo, but completely reinvent the visual style. The final result should feel like Duolingo has been transformed into a retro arcade RPG called "DuoQuest."

Important constraint:
Keep the product/content recognizable as Duolingo:
- Free learning forever
- 40+ language courses
- Bite-sized lessons
- Game-like progression
- XP, levels, streaks, rewards
- Personalized learning
- Immediate feedback
- Speaking, reading, listening, and writing practice
- Math, Music, and Chess courses
- Learn anywhere on mobile
- Fun, effective, accessible education

But do NOT make it look like the current Duolingo site.

Visual direction:
Create a bold retro arcade RPG / neubrutalist interface.

Style keywords:
- Arcade cabinet
- Pixel RPG quest map
- Chunky game UI
- Thick black borders
- High-contrast colors
- Bright lime, yellow, hot pink, cyan, royal blue, cream, and black
- XP/streak HUD
- Quest nodes
- Boss lesson
- Course worlds
- Character voice guide
- Playful but polished
- Viral demo energy

Avoid:
- Generic SaaS landing page
- Minimal white Duolingo clone
- Soft pastel-only design
- Overly corporate cards
- Purple/blue gradient startup aesthetic
- Decorative blobs/orbs
- Marketing page that only describes features

Build the actual redesigned experience as the first screen, not a normal landing-page hero.

Required first viewport:
- A sticky top navigation with "DuoQuest" branding
- A huge headline: "Learn a language for free. Forever. Now enter the quest."
- Supporting copy about bite-sized lessons becoming battles, streaks becoming power-ups, and correct answers moving you toward real conversation
- Primary CTA: "Start Quest"
- Secondary CTA: "Hear Voice Tour"
- A large arcade-cabinet or game-screen visual on the right or center
- The game screen should include:
  - XP/streak/level HUD
  - Quest-map nodes such as "Hola", "Boss", "Story", "Radio"
  - A playful owl-inspired mascot or abstract green guide character
  - Visible interaction states

Required page sections:
1. Hero / playable quest hub
2. Course worlds
   - Languages
   - Math
   - Music
   - Chess
3. How learning works
   - Bite-sized lessons
   - Instant feedback
   - Personalized practice
   - Rewards and streaks
4. ElevenLabs voice layer
   - Character voice options: Coach, Bard, Rival
   - Explain through UI, not long marketing copy
   - Buttons/cards that appear clickable
   - Demo text for narrated lesson feedback
5. Proof / stats
   - 500M+ downloads
   - 40+ languages
   - Hundreds of millions of learners
   - Fast daily lessons
6. Final CTA
   - "Begin your first quest"

ElevenLabs integration requirement:
Include frontend code that supports voice narration.

Implement this as:
- A reusable speak(text, voiceStyle) function
- Buttons with narration scripts
- Browser speechSynthesis fallback so the prototype works without API keys
- A clear place to swap in an ElevenLabs API route later
- Voice styles:
  - Coach: energetic and direct
  - Bard: whimsical storyteller
  - Rival: competitive arcade opponent

If using Next.js, include an example API route:
- POST /api/narrate
- Accepts { text, voiceStyle }
- Calls ElevenLabs Text-to-Speech when ELEVENLABS_API_KEY is present
- Falls back gracefully or returns a clean error when not configured

Technical requirements:
- Use React and Tailwind CSS
- Use responsive design
- Make it look excellent on desktop and mobile
- Use semantic HTML where practical
- Keep components clean and understandable
- Do not require paid assets
- Use CSS/HTML/Tailwind for the arcade visuals if needed
- Use lucide-react icons where useful, but do not rely on icons as the main visual concept
- Include hover, active, and selected states
- Ensure text does not overflow buttons or cards
- Keep card border radius at 8px or less unless making circular game nodes

Content tone:
Short, punchy, game-like.
Examples:
- "Pick your world."
- "Clear a five-minute lesson."
- "Win XP for correct answers."
- "Unlock stories, radio, and boss lessons."
- "Your guide speaks when the quest changes."

Output:
Build the full page/app. Make it feel finished enough for a hackathon demo video.
```

## v0 Follow-Up Prompt: Make It More Viral

Use this after the first generation if the result feels too normal.

```text
Push the design much further. It still feels too much like a standard landing page.

Make the first viewport feel like a playable arcade RPG interface:
- Bigger arcade cabinet/game screen
- More dramatic XP/streak HUD
- More visible quest path
- More tactile buttons
- More contrast
- More game-like microcopy
- More visual difference from Duolingo's current site

Keep it polished and responsive. Do not add explanatory marketing sections above the experience.
```

## v0 Follow-Up Prompt: Improve The ElevenLabs Layer

```text
Improve the ElevenLabs voice feature so it feels central to the redesign.

Add:
- A "Voice Guide" panel with Coach, Bard, and Rival options
- Narration buttons on quest nodes
- A small transcript/status display that shows the current spoken line
- A reusable speak(text, voiceStyle) function
- Browser speechSynthesis fallback
- If this is a Next.js app, add a POST /api/narrate route prepared for ElevenLabs Text-to-Speech with ELEVENLABS_API_KEY

The voice feature should feel like character-driven lesson feedback, not a generic audio player.
```

## v0 Follow-Up Prompt: Mobile Polish

```text
Polish the mobile layout.

Requirements:
- No text overflow
- No overlapping hero elements
- Arcade cabinet remains visible but not cramped
- Quest nodes are tappable
- Voice guide buttons are easy to tap
- Top nav stays compact
- The page should feel intentionally designed on iPhone-sized screens
```

## v0 Follow-Up Prompt: Final Demo Readiness

```text
Make this ready for a 30-second hackathon demo video.

Add or improve:
- Clear before/after story in the visual hierarchy
- Strong first frame
- Clickable moments in the first viewport
- Voice tour interaction
- Course world reveal
- Final CTA
- Subtle animation that helps the video without making the UI chaotic

Keep performance reasonable and avoid external assets that might fail to load.
```

## Bringing v0 Code Back Here

Once v0 gives you code, use one of these routes:

### Option A: Add To Codebase

If v0 shows an "Add to Codebase" command, run it from this folder:

```bash
cd /Users/drewmanley/Documents/projects/v0hack
```

Then paste/run the command v0 gives you.

### Option B: Download / Copy Files

If v0 gives downloadable files, place them in this project folder. After that, I can:

- Install dependencies
- Fix build issues
- Wire the real ElevenLabs API route
- Add environment variable docs
- Deploy to Vercel
- Draft the final submission

## Local Prototype

The current local prototype runs without installing dependencies:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## ElevenLabs Notes

The local prototype includes a simple narration endpoint:

```text
POST /api/narrate
```

Without an API key, the browser falls back to built-in speech synthesis so the demo still works.

To use ElevenLabs Text-to-Speech locally:

```bash
ELEVENLABS_API_KEY=your_key npm run dev
```

Optional:

```bash
ELEVENLABS_VOICE_ID=your_voice_id ELEVENLABS_API_KEY=your_key npm run dev
```

For the final v0/Next.js version, we should use environment variables:

```text
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
```

Do not expose the ElevenLabs API key in client-side code.

## Submission Angle

Duolingo already makes learning feel like a game. DuoQuest pushes that idea to the surface: the marketing site becomes a playable arcade RPG where every course is a world, every lesson is a battle, and ElevenLabs voice narration turns progress into character-driven feedback.

## Video Hook

```text
What if Duolingo's homepage was not a homepage at all, but an arcade cabinet?
```

## 30-Second Video Structure

```text
0-3s:
Show the premise: Duolingo is already game-like, so we turned the whole site into a game.

3-7s:
Reveal DuoQuest hero with arcade cabinet, XP HUD, streak, and quest nodes.

7-14s:
Click quest nodes. Show spoken feedback and transcript/status display.

14-20s:
Show course worlds: Languages, Math, Music, Chess.

20-26s:
Show ElevenLabs voice guides: Coach, Bard, Rival.

26-30s:
End on final CTA: "Begin your first quest."
```
