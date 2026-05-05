"use client"

import { useState, useEffect } from "react"

interface GuidedTourProps {
  isActive: boolean
  onClose: () => void
  onSpeak: (text: string) => void
}

const tourSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Codex',
    content: 'Greetings, fellow seeker of knowledge. Allow me to guide you through our sacred scriptorium, where thoughts become eternal manuscripts.',
    position: 'center'
  },
  {
    id: 'hero',
    title: 'The Grand Hall',
    content: 'You stand in the entrance hall, where all great journeys begin. Here, you may choose to begin your chronicle or explore further.',
    position: 'center',
    scrollTo: 0
  },
  {
    id: 'product',
    title: 'The Scriptorium',
    content: 'Behold the scriptorium - your sacred writing chamber. Here, distraction fades and focus flourishes. Write with the same reverence as medieval monks illuminating their manuscripts.',
    position: 'center',
    scrollTo: '#product'
  },
  {
    id: 'features',
    title: 'Sacred Arts',
    content: 'These are the tools of the illuminator. From linked knowledge that weaves your thoughts together, to divine intelligence that assists your writing, each art has been refined for the modern scribe.',
    position: 'center',
    scrollTo: '#features'
  },
  {
    id: 'testimonials',
    title: 'Testimonium',
    content: 'Hear the words of those who came before you. Scholars, authors, and seekers who have found sanctuary in these halls.',
    position: 'center',
    scrollTo: '#testimonials'
  },
  {
    id: 'finale',
    title: 'Your Journey Awaits',
    content: 'The tour concludes, but your journey is only beginning. May your words flow like ink upon parchment, and may your knowledge endure through the ages. Go forth and create your chronicle.',
    position: 'center'
  }
]

export function GuidedTour({ isActive, onClose, onSpeak }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const step = tourSteps[currentStep]

  useEffect(() => {
    if (isActive && step) {
      // Speak the content
      onSpeak(step.content)
      
      // Scroll to section if needed
      if (step.scrollTo !== undefined) {
        if (typeof step.scrollTo === 'string') {
          const element = document.querySelector(step.scrollTo)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        } else {
          window.scrollTo({ top: step.scrollTo, behavior: 'smooth' })
        }
      }
    }
  }, [currentStep, isActive, onSpeak, step])

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsTransitioning(false)
      }, 300)
    } else {
      closeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(prev => prev - 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const closeTour = () => {
    setCurrentStep(0)
    onClose()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isActive) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100]"
        onClick={closeTour}
      />

      {/* Tour Card */}
      <div 
        className={`fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4 transition-all duration-300 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="bg-parchment border-2 border-ink-light/30 shadow-2xl">
          {/* Decorative Header */}
          <div className="bg-ink text-parchment px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div>
                  <span className="font-sans text-xs text-parchment/60 uppercase tracking-wider">
                    Guided Tour
                  </span>
                  <h3 className="font-serif text-lg">{step.title}</h3>
                </div>
              </div>
              <button
                onClick={closeTour}
                className="text-parchment/60 hover:text-parchment transition-colors"
                aria-label="Close tour"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <p className="font-sans text-ink leading-relaxed">
              {step.content}
            </p>

            {/* Listen Again Button */}
            <button
              onClick={() => onSpeak(step.content)}
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink-light hover:text-burgundy transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              Listen again
            </button>
          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-4 bg-parchment-dark/50 border-t border-ink-light/20 flex items-center justify-between">
            {/* Progress */}
            <div className="flex items-center gap-2">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-burgundy' : 'bg-ink-light/30 hover:bg-ink-light/50'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 font-sans text-sm text-ink hover:text-burgundy transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                onClick={nextStep}
                className="px-5 py-2 bg-ink text-parchment font-sans text-sm hover:bg-burgundy transition-colors"
              >
                {currentStep === tourSteps.length - 1 ? 'Complete Tour' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
