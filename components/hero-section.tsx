"use client"

import { useEffect, useState, useRef } from "react"
import { Mail } from "lucide-react"
import { translations, type Lang } from "@/lib/translations"
import { ScrollReveal } from "@/components/scroll-reveal"

interface HeroSectionProps {
  lang: Lang
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = translations.hero
  const targetText = t.subtitle[lang]
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const prevLangRef = useRef(lang)

  // Re-trigger typing animation when language changes
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      setDisplayedText("")
      setCurrentIndex(0)
      prevLangRef.current = lang
    }
  }, [lang])

  useEffect(() => {
    if (currentIndex < targetText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(targetText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 35)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, targetText])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168, 85, 247, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-neon-green/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Status badge */}
        <ScrollReveal animation="fade-down">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-purple/20 bg-neon-purple/5 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
            </span>
            <span className="font-mono text-xs text-neon-green">{t.status[lang]}</span>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal animation="fade-up" delay={200}>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-foreground">Finora</span>
            <span className="text-neon-purple">:</span>
            <br />
            <span className="bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent transition-all duration-500">
              {t.titleHighlight[lang]}
            </span>
          </h1>
        </ScrollReveal>

        {/* Terminal typing subtitle */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mx-auto mb-10 max-w-2xl rounded-lg border border-border bg-secondary/50 px-5 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neon-green">{">"}</span>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
                {displayedText}
                <span
                  className={`ml-0.5 inline-block h-4 w-0.5 bg-neon-green align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"
                    }`}
                />
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal animation="fade-up" delay={600}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-neon-purple px-8 py-3 font-medium text-[#050505] transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              <span className="relative z-10">{t.cta[lang]}</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3 font-medium text-foreground transition-all hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              <Mail className="h-4 w-4 text-neon-purple" />
              {translations.navContact[lang]}
            </a>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <div className="mt-16 flex animate-float justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.scroll[lang]}</span>
            <div className="h-8 w-px bg-gradient-to-b from-neon-purple/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
