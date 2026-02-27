"use client"

import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { translations, type Lang } from "@/lib/translations"

interface NavbarProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

export function Navbar({ lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = translations.nav

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-purple/10 border border-neon-purple/20">
            <span className="font-mono text-sm font-bold text-neon-purple">F</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">Finora</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#projects" className="text-sm text-muted-foreground transition-colors hover:text-neon-purple">
            {t.projects[lang]}
          </a>
          <a href="#stack" className="text-sm text-muted-foreground transition-colors hover:text-neon-purple">
            {t.stack[lang]}
          </a>
          <a href="#vision" className="text-sm text-muted-foreground transition-colors hover:text-neon-purple">
            {t.vision[lang]}
          </a>
          <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-neon-purple">
            {translations.navContact[lang]}
          </a>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "EN" ? "TR" : "EN")}
            className="group flex items-center gap-1.5 rounded-full border border-border bg-secondary p-1 transition-all hover:border-neon-purple/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            aria-label={`Switch language to ${lang === "EN" ? "Turkish" : "English"}`}
          >
            <Globe className="ml-1.5 h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-neon-purple" />
            <div className="relative flex items-center rounded-full bg-background/50 text-[11px] font-mono font-medium">
              <span
                className={`relative z-10 px-2.5 py-1 rounded-full transition-all duration-300 ${
                  lang === "EN" ? "text-neon-purple" : "text-muted-foreground"
                }`}
              >
                EN
              </span>
              <span
                className={`relative z-10 px-2.5 py-1 rounded-full transition-all duration-300 ${
                  lang === "TR" ? "text-neon-purple" : "text-muted-foreground"
                }`}
              >
                TR
              </span>
              <span
                className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-neon-purple/10 border border-neon-purple/30 transition-all duration-300 ease-out ${
                  lang === "EN" ? "left-0.5" : "left-[calc(50%+1px)]"
                }`}
              />
            </div>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground transition-all hover:border-neon-purple/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted-foreground md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <a
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-neon-purple"
            >
              {t.projects[lang]}
            </a>
            <a
              href="#stack"
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-neon-purple"
            >
              {t.stack[lang]}
            </a>
            <a
              href="#vision"
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-neon-purple"
            >
              {t.vision[lang]}
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-neon-purple"
            >
              {translations.navContact[lang]}
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-neon-purple"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>

            {/* Mobile Language Toggle */}
            <button
              onClick={() => setLang(lang === "EN" ? "TR" : "EN")}
              className="flex items-center gap-2 rounded-full border border-border bg-secondary p-1 self-start transition-all"
              aria-label={`Switch language to ${lang === "EN" ? "Turkish" : "English"}`}
            >
              <Globe className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
              <div className="relative flex items-center rounded-full bg-background/50 text-[11px] font-mono font-medium">
                <span
                  className={`relative z-10 px-2.5 py-1 rounded-full transition-all duration-300 ${
                    lang === "EN" ? "text-neon-purple" : "text-muted-foreground"
                  }`}
                >
                  EN
                </span>
                <span
                  className={`relative z-10 px-2.5 py-1 rounded-full transition-all duration-300 ${
                    lang === "TR" ? "text-neon-purple" : "text-muted-foreground"
                  }`}
                >
                  TR
                </span>
                <span
                  className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-neon-purple/10 border border-neon-purple/30 transition-all duration-300 ease-out ${
                    lang === "EN" ? "left-0.5" : "left-[calc(50%+1px)]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
