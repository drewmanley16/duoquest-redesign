const toast = document.querySelector("#toast")
const soundToggle = document.querySelector("#soundToggle")
let soundEnabled = true

const showToast = (message) => {
  toast.textContent = message
  toast.classList.add("show")
  window.clearTimeout(showToast.timeout)
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600)
}

const beep = () => {
  if (!soundEnabled) return
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return
  const ctx = new AudioContext()
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = "square"
  oscillator.frequency.setValueAtTime(520, ctx.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12)
  gain.gain.setValueAtTime(0.04, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
  oscillator.connect(gain).connect(ctx.destination)
  oscillator.start()
  oscillator.stop(ctx.currentTime + 0.13)
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
  beep()
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
  utterance.pitch = 1.18
  window.speechSynthesis.speak(utterance)
}

document.querySelectorAll("[data-speak]").forEach((button) => {
  button.addEventListener("click", () => speak(button.dataset.speak))
})

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled
  if (!soundEnabled && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
  }
  soundToggle.setAttribute("aria-pressed", String(soundEnabled))
  showToast(soundEnabled ? "Interface audio on" : "Interface audio off")
})

showToast("Prototype ready: click quest nodes or voice guides.")
