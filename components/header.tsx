"use client"

import { useState } from "react"
import Link from "next/link"

interface HeaderProps {
  onStartTour?: () => void
}

export function Header({ onStartTour }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-sm border-b border-ink-light/20">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="wax-seal w-10 h-10 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 text-parchment"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-serif text-xl tracking-wide text-ink group-hover:text-burgundy transition-colors">
              Codex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#product">The Scriptorium</NavLink>
            <NavLink href="#features">Sacred Arts</NavLink>
            <NavLink href="#testimonials">Testimonium</NavLink>
            <NavLink href="#pricing">Tithes</NavLink>
            
            <button 
              onClick={onStartTour}
              className="flex items-center gap-2 text-ink-light hover:text-burgundy transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              <span className="font-sans">Guided Tour</span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="#" 
              className="font-sans text-sm text-ink hover:text-burgundy transition-colors"
            >
              Enter Archive
            </Link>
            <Link 
              href="#" 
              className="font-sans text-sm px-5 py-2.5 bg-ink text-parchment hover:bg-burgundy transition-colors"
            >
              Begin Inscription
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-ink-light/20 pt-4 unfurl">
            <div className="flex flex-col gap-4">
              <MobileNavLink href="#product" onClick={() => setMobileMenuOpen(false)}>The Scriptorium</MobileNavLink>
              <MobileNavLink href="#features" onClick={() => setMobileMenuOpen(false)}>Sacred Arts</MobileNavLink>
              <MobileNavLink href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonium</MobileNavLink>
              <MobileNavLink href="#pricing" onClick={() => setMobileMenuOpen(false)}>Tithes</MobileNavLink>
              
              <button 
                onClick={() => {
                  setMobileMenuOpen(false)
                  onStartTour?.()
                }}
                className="flex items-center gap-2 text-ink-light hover:text-burgundy transition-colors text-sm py-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                <span>Guided Tour</span>
              </button>
              
              <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-ink-light/20">
                <Link 
                  href="#" 
                  className="font-sans text-sm text-ink hover:text-burgundy transition-colors py-2"
                >
                  Enter Archive
                </Link>
                <Link 
                  href="#" 
                  className="font-sans text-sm px-5 py-2.5 bg-ink text-parchment hover:bg-burgundy transition-colors text-center"
                >
                  Begin Inscription
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="font-sans text-sm text-ink-light hover:text-burgundy transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="font-sans text-sm text-ink-light hover:text-burgundy transition-colors py-2"
    >
      {children}
    </Link>
  )
}
