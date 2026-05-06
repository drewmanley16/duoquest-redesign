"use client"

import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-muted-foreground/20">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="wax-seal w-10 h-10 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 text-background"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-serif text-xl tracking-wide text-foreground group-hover:text-primary transition-colors">
              Codex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#product">The Scriptorium</NavLink>
            <NavLink href="#features">Sacred Arts</NavLink>
            <NavLink href="#testimonials">Testimonium</NavLink>
            <NavLink href="#pricing">Tithes</NavLink>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="#" 
              className="font-sans text-sm text-foreground hover:text-primary transition-colors"
            >
              Enter Archive
            </Link>
            <Link 
              href="#" 
              className="font-sans text-sm px-5 py-2.5 bg-foreground text-background hover:bg-primary transition-colors"
            >
              Begin Inscription
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
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
          <div className="md:hidden mt-4 pb-4 border-t border-muted-foreground/20 pt-4">
            <div className="flex flex-col gap-4">
              <MobileNavLink href="#product" onClick={() => setMobileMenuOpen(false)}>The Scriptorium</MobileNavLink>
              <MobileNavLink href="#features" onClick={() => setMobileMenuOpen(false)}>Sacred Arts</MobileNavLink>
              <MobileNavLink href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonium</MobileNavLink>
              <MobileNavLink href="#pricing" onClick={() => setMobileMenuOpen(false)}>Tithes</MobileNavLink>
              
              <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-muted-foreground/20">
                <Link 
                  href="#" 
                  className="font-sans text-sm text-foreground hover:text-primary transition-colors py-2"
                >
                  Enter Archive
                </Link>
                <Link 
                  href="#" 
                  className="font-sans text-sm px-5 py-2.5 bg-foreground text-background hover:bg-primary transition-colors text-center"
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
      className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors py-2"
    >
      {children}
    </Link>
  )
}
