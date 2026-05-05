"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductShowcase } from "@/components/product-showcase"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { AudioController } from "@/components/audio-controller"
import { GuidedTour } from "@/components/guided-tour"
import { Toast } from "@/components/toast"

export default function Home() {
  const [toastMessage, setToastMessage] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [tourActive, setTourActive] = useState(false)

  const showToast = useCallback((message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(""), 3500)
  }, [])

  const speakText = useCallback((text: string) => {
    if (!soundEnabled) {
      showToast("Voice reading is disabled")
      return
    }
    
    if (!("speechSynthesis" in window)) {
      showToast("Speech synthesis not supported in this browser")
      return
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 0.8
    
    // Try to use a more natural voice if available
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      voice => voice.lang.startsWith('en') && voice.name.includes('Natural')
    ) || voices.find(
      voice => voice.lang.startsWith('en-GB')
    ) || voices.find(
      voice => voice.lang.startsWith('en')
    )
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
    
    window.speechSynthesis.speak(utterance)
    showToast("Reading passage aloud...")
  }, [soundEnabled, showToast])

  const startTour = useCallback(() => {
    setTourActive(true)
  }, [])

  const closeTour = useCallback(() => {
    setTourActive(false)
    // Cancel any speech when closing tour
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <main className="min-h-screen bg-parchment">
      <Header onStartTour={startTour} />
      
      <Hero onReadAloud={speakText} />
      
      <ProductShowcase onReadAloud={speakText} />
      
      <Features onReadAloud={speakText} />
      
      <Testimonials onReadAloud={speakText} />
      
      <Footer />
      
      {/* Audio Controls */}
      <AudioController 
        onSpeakText={speakText}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
      
      {/* Guided Tour */}
      <GuidedTour 
        isActive={tourActive}
        onClose={closeTour}
        onSpeak={speakText}
      />
      
      {/* Toast Notifications */}
      <Toast message={toastMessage} />
    </main>
  )
}
