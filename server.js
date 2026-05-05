import { createReadStream, existsSync } from "node:fs"
import { extname, join, normalize } from "node:path"
import { createServer } from "node:http"

const port = Number(process.env.PORT || 5173)
const root = process.cwd()
const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
}

const sendJson = (res, status, data) => {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" })
  res.end(JSON.stringify(data))
}

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk
      if (body.length > 10_000) {
        reject(new Error("Request body too large"))
        req.destroy()
      }
    })
    req.on("end", () => resolve(body))
    req.on("error", reject)
  })

const handleNarrate = async (req, res) => {
  if (!process.env.ELEVENLABS_API_KEY) {
    sendJson(res, 501, { error: "ELEVENLABS_API_KEY is not configured" })
    return
  }

  try {
    const body = JSON.parse(await readBody(req))
    const text = String(body.text || "").slice(0, 600)
    if (!text) {
      sendJson(res, 400, { error: "Missing text" })
      return
    }

    const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.48,
          similarity_boost: 0.74,
          style: 0.32,
          use_speaker_boost: true,
        },
      }),
    })

    if (!elevenLabsResponse.ok) {
      sendJson(res, elevenLabsResponse.status, { error: "ElevenLabs request failed" })
      return
    }

    const audio = Buffer.from(await elevenLabsResponse.arrayBuffer())
    res.writeHead(200, {
      "content-type": "audio/mpeg",
      "cache-control": "no-store",
    })
    res.end(audio)
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Narration failed" })
  }
}

const serveFile = (req, res) => {
  const requestPath = new URL(req.url, `http://localhost:${port}`).pathname
  const safePath = normalize(requestPath === "/" ? "/index.html" : requestPath).replace(/^(\.\.[/\\])+/, "")
  const filePath = join(root, safePath)

  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    sendJson(res, 404, { error: "Not found" })
    return
  }

  res.writeHead(200, { "content-type": mimeTypes[extname(filePath)] || "application/octet-stream" })
  createReadStream(filePath).pipe(res)
}

createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/narrate") {
    handleNarrate(req, res)
    return
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveFile(req, res)
    return
  }

  sendJson(res, 405, { error: "Method not allowed" })
}).listen(port, () => {
  console.log(`DuoQuest running at http://127.0.0.1:${port}`)
})
