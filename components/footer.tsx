"use client"

import Link from "next/link"

export function Footer() {
  const footerLinks = {
    product: [
      { label: "The Scriptorium", href: "#" },
      { label: "Sacred Arts", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Changelog", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  }

  return (
    <footer className="bg-parchment-dark border-t border-ink-light/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
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
              <span className="font-serif text-xl tracking-wide text-ink">
                Codex
              </span>
            </Link>
            <p className="font-sans text-sm text-ink-light leading-relaxed mb-6 max-w-xs">
              The sanctuary for your thoughts. Preserve, organize, and share your knowledge like the illuminated manuscripts of old.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-ink-light hover:text-burgundy transition-colors" aria-label="Twitter">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-ink-light hover:text-burgundy transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>
              <a href="#" className="text-ink-light hover:text-burgundy transition-colors" aria-label="YouTube">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-serif text-sm text-ink mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-sm text-ink-light hover:text-burgundy transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-serif text-sm text-ink mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-sm text-ink-light hover:text-burgundy transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-sm text-ink mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-sm text-ink-light hover:text-burgundy transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-serif text-sm text-ink mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-sans text-sm text-ink-light hover:text-burgundy transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ink-light/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-ink-light">
            MMXXVI Codex. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-sans text-xs text-ink-light/60">
              Crafted with reverence for the written word
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
