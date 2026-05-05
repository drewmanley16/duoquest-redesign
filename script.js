const toast = document.querySelector("#toast")
const soundToggle = document.querySelector("#soundToggle")
const soundLabel = soundToggle?.querySelector(".sound-label")
let soundEnabled = true

const showToast = (message) => {
  toast.textContent = message
  toast.classList.add("show")
  window.clearTimeout(showToast.timeout)
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600)
}

const beep = (freq = 520, type = "square") => {
  if (!soundEnabled) return
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return
  const ctx = new AudioContext()
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.1)
  gain.gain.setValueAtTime(0.06, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
  oscillator.connect(gain).connect(ctx.destination)
  oscillator.start()
  oscillator.stop(ctx.currentTime + 0.12)
}

const confirmBeep = () => {
  beep(660, "square")
  setTimeout(() => beep(880, "square"), 80)
}

const speakWithElevenLabs = async (text) => {
  const response = await fetch("/api/narrate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text }),
  })
  if (!response.ok) throw new Error("Narration unavailable")
  const blob = await response.blob()
  const audio = new Audio(URL.createObjectURL(blob))
  await audio.play()
}

const speak = async (text) => {
  confirmBeep()
  showToast(text)
  if (!soundEnabled) return
  try {
    await speakWithElevenLabs(text)
    return
  } catch {
    // Local fallback keeps the prototype usable without an API key.
  }
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1.02
  utterance.pitch = 1.1
  window.speechSynthesis.speak(utterance)
}

// All clickable elements with data-speak
document.querySelectorAll("[data-speak]").forEach((button) => {
  button.addEventListener("click", () => speak(button.dataset.speak))
})

// Sound toggle
soundToggle?.addEventListener("click", () => {
  soundEnabled = !soundEnabled
  if (!soundEnabled && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
  }
  soundToggle.setAttribute("aria-pressed", String(soundEnabled))
  if (soundLabel) {
    soundLabel.textContent = soundEnabled ? "SFX ON" : "SFX OFF"
  }
  showToast(soundEnabled ? "Interface audio enabled" : "Interface audio disabled")
  if (soundEnabled) beep(440)
})

// Add hover sounds to arcade buttons
document.querySelectorAll(".arcade-btn, .guide-btn, .node:not(.locked)").forEach((btn) => {
  btn.addEventListener("mouseenter", () => beep(330, "sine"))
})

// Animate XP bar on load
const xpBar = document.querySelector(".xp-bar-fill")
if (xpBar) {
  xpBar.style.setProperty("--fill", "0%")
  setTimeout(() => {
    xpBar.style.setProperty("--fill", "68%")
  }, 500)
}

// Initial toast
setTimeout(() => {
  showToast("READY PLAYER ONE — Select a quest node")
}, 800)
