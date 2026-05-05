"use client"

import { ArcadeCabinet } from "@/components/arcade-cabinet"
import { DungeonSelect } from "@/components/dungeon-select"
import { ProofBar } from "@/components/proof-bar"
import { Toast } from "@/components/toast"
import { useEffect, useState } from "react"

export default function Home() {
  const [toastMessage, setToastMessage] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 2600)
  }

  const beep = (freq = 520, type: OscillatorType = "square") => {
    if (!soundEnabled || typeof window === "undefined") return
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
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

  const speak = (text: string) => {
    confirmBeep()
    showToast(text)
    if (!soundEnabled) return
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.02
    utterance.pitch = 1.1
    window.speechSynthesis.speak(utterance)
  }

  const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    if (!newState && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    showToast(newState ? "Interface audio enabled" : "Interface audio disabled")
    if (newState) beep(440)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      showToast("READY PLAYER ONE — Select a quest node")
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      <div className="crt-overlay" />
      <div className="scanline" />
      
      <div className="arcade-hall min-h-screen" style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(88, 204, 2, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(255, 45, 106, 0.06) 0%, transparent 40%),
          radial-gradient(ellipse at 80% 70%, rgba(28, 176, 246, 0.06) 0%, transparent 40%),
          linear-gradient(180deg, #0a0a12 0%, #0f0f1a 50%, #0a0a12 100%)
        `
      }}>
        <ArcadeCabinet 
          speak={speak} 
          beep={beep}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />
        <DungeonSelect />
        <ProofBar />
      </div>
      
      <Toast message={toastMessage} />
    </main>
  )
}
