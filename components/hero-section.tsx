"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { translations, type Lang } from "@/lib/translations"
import { FadeInUp, HoverLift } from "@/components/motion"

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
        {/* Status badge — delay 0 */}
        <FadeInUp delay={0} className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-purple/20 bg-neon-purple/5 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
          </span>
          <span className="font-mono text-xs text-neon-green">{t.status[lang]}</span>
        </FadeInUp>

        {/* Title — staggered delays */}
        <FadeInUp delay={0.15}>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-foreground">Finora</span>
            <span className="text-neon-purple">:</span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="inline-block bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent transition-all duration-500"
            >
              {t.titleHighlight[lang]}
            </motion.span>
          </h1>
        </FadeInUp>

        {/* Terminal typing subtitle — delay 0.45 */}
        <FadeInUp delay={0.45}>
          <div className="mx-auto mb-10 max-w-2xl rounded-lg border border-border bg-secondary/50 px-5 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neon-green">{">"}</span>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
                {displayedText}
                <span
                  className={`ml-0.5 inline-block h-4 w-0.5 bg-neon-green align-middle transition-opacity ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* CTA Buttons — delay 0.6 */}
        <FadeInUp delay={0.6}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HoverLift>
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
            </HoverLift>

            <HoverLift>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3 font-medium text-foreground transition-all hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </HoverLift>
          </div>
        </FadeInUp>

        {/* Scroll indicator — delay 0.8 */}
        <FadeInUp delay={0.8}>
          <div className="mt-16 flex animate-float justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.scroll[lang]}</span>
              <div className="h-8 w-px bg-gradient-to-b from-neon-purple/60 to-transparent" />
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
