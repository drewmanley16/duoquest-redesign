import { NextResponse } from "next/server"

const DEFAULT_VOICE_ID = "ewrYJABAiNSuVLoXECzw"
const voiceSettings = {
  editor: { stability: 0.5, similarity_boost: 0.78, style: 0.22, use_speaker_boost: true },
  archivist: { stability: 0.68, similarity_boost: 0.82, style: 0.12, use_speaker_boost: true },
  operator: { stability: 0.42, similarity_boost: 0.75, style: 0.38, use_speaker_boost: true },
}

export async function POST(request: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "ELEVENLABS_API_KEY is not configured" }, { status: 501 })
  }

  try {
    const body = await request.json()
    const text = String(body.text || "").slice(0, 900)
    const voiceId = String(process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID)
    const voiceMode = String(body.voiceMode || "editor") as keyof typeof voiceSettings

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 })
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: voiceSettings[voiceMode] || voiceSettings.editor,
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      const clippedDetails = details.replace(/\s+/g, " ").slice(0, 220)

      return NextResponse.json(
        {
          error: "ElevenLabs narration failed",
          status: response.status,
          details: clippedDetails,
        },
        { status: response.status },
      )
    }

    const audio = await response.arrayBuffer()

    return new Response(audio, {
      headers: {
        "content-type": "audio/mpeg",
        "cache-control": "no-store",
      },
    })
  } catch {
    return NextResponse.json({ error: "Narration request failed" }, { status: 500 })
  }
}
