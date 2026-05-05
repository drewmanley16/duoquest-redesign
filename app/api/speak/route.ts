import { NextRequest, NextResponse } from "next/server"

const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM" // Rachel - clear female voice
const ELEVENLABS_MODEL = "eleven_turbo_v2_5"

export async function POST(request: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "ElevenLabs API key not configured" },
      { status: 500 }
    )
  }

  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: ELEVENLABS_MODEL,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.2,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] ElevenLabs API error:", errorText)
      return NextResponse.json(
        { error: `ElevenLabs API error: ${response.status}` },
        { status: response.status }
      )
    }

    const audioBuffer = await response.arrayBuffer()

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("[v0] Speech synthesis error:", error)
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    )
  }
}
