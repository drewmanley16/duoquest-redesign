"use client"

import { ArcadeCabinet } from "@/components/arcade-cabinet"
import { DungeonSelect } from "@/components/dungeon-select"
import { ProofBar } from "@/components/proof-bar"
import { Toast } from "@/components/toast"
import { useElevenLabs } from "@/lib/use-elevenlabs"
import { useEffect, useState, useCallback } from "react"

export default function Home() {
  const [toastMessage, setToastMessage] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const { speak: elevenLabsSpeak, isLoading: isVoiceLoading } = useElevenLabs({ enabled: soundEnabled })

  const showToast = useCallback((message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 3000)
  }, [])

  const beep = useCallback((freq = 520, type: OscillatorType = "square") => {
    if (!soundEnabled || typeof window === "undefined") return
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = type
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    oscillator.connect(gain).connect(ctx.destination)
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.12)
  }, [soundEnabled])

  const confirmBeep = useCallback(() => {
    beep(660, "square")
    setTimeout(() => beep(880, "square"), 80)
  }, [beep])

  const speak = useCallback((text: string) => {
    confirmBeep()
    showToast(text)
    if (!soundEnabled) return
    elevenLabsSpeak(text)
  }, [confirmBeep, showToast, soundEnabled, elevenLabsSpeak])

  const toggleSound = useCallback(() => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    if (!newState && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    showToast(newState ? "🔊 Audio enabled" : "🔇 Audio disabled")
    if (newState) beep(440)
  }, [soundEnabled, showToast, beep])

  useEffect(() => {
    const timer = setTimeout(() => {
      showToast("🎮 READY PLAYER ONE — Select a quest node to begin")
    }, 1000)
    return () => clearTimeout(timer)
  }, [showToast])

  return (
    <main className="min-h-screen">
      <div className="crt-overlay" />
      <div className="scanline" />
      
      <div 
        className="min-h-screen"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(88, 204, 2, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 15% 80%, rgba(255, 45, 106, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 85% 70%, rgba(28, 176, 246, 0.05) 0%, transparent 40%),
            linear-gradient(180deg, #08080c 0%, #0d0d14 50%, #08080c 100%)
          `
        }}
      >
        <ArcadeCabinet 
          speak={speak} 
          beep={beep}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          isVoiceLoading={isVoiceLoading}
        />
        <DungeonSelect speak={speak} beep={beep} />
        <ProofBar />
      </div>
      
      <Toast message={toastMessage} />
    </main>
  )
}
