"use client"

import { useState, useCallback, useRef } from "react"

interface UseElevenLabsOptions {
  enabled?: boolean
}

export function useElevenLabs(options: UseElevenLabsOptions = {}) {
  const { enabled = true } = options
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    setIsLoading(false)
  }, [])

  const speak = useCallback(async (text: string) => {
    if (!enabled) return

    stop()
    setIsLoading(true)
    setError(null)

    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        // Fallback to browser speech synthesis
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel()
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.rate = 1.0
          utterance.pitch = 1.1
          window.speechSynthesis.speak(utterance)
        }
        setIsLoading(false)
        return
      }

      const arrayBuffer = await response.arrayBuffer()
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" })
      const url = URL.createObjectURL(blob)

      audioRef.current = new Audio(url)
      audioRef.current.play()
      
      audioRef.current.onended = () => {
        URL.revokeObjectURL(url)
        setIsLoading(false)
      }

      audioRef.current.onerror = () => {
        URL.revokeObjectURL(url)
        setIsLoading(false)
        // Fallback to browser speech
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.rate = 1.0
          utterance.pitch = 1.1
          window.speechSynthesis.speak(utterance)
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return
      setError(err instanceof Error ? err.message : "Speech synthesis failed")
      setIsLoading(false)
      // Fallback to browser speech
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1.0
        utterance.pitch = 1.1
        window.speechSynthesis.speak(utterance)
      }
    }
  }, [enabled, stop])

  return { speak, stop, isLoading, error }
}
