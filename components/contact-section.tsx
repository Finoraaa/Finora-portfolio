"use client"

import { useState } from "react"
import { Send, CheckCircle2, Github, Instagram } from "lucide-react"
import { translations, type Lang } from "@/lib/translations"
import { submitContactForm } from "@/app/actions/contact"
import { toast } from "sonner"

export function ContactSection({ lang }: { lang: Lang }) {
  const t = translations.contact
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSending(true)

    const formData = new FormData(e.currentTarget)
    const result = await submitContactForm(formData)

    setIsSending(false)

    if (result.success) {
      setIsSent(true)
      e.currentTarget.reset()
      setTimeout(() => setIsSent(false), 4000)
    } else {
      if (typeof result.error === "string") {
        toast.error(result.error)
      } else {
        toast.error("Lütfen tüm alanları doğru doldurduğunuzdan emin olun.")
      }
    }
  }

  return (
    <section id="contact" className="relative px-6 py-32">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-neon-purple/20 bg-neon-purple/5 px-4 py-1.5 font-mono text-xs text-neon-purple">
            {t.sectionLabel[lang]}
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t.sectionTitle[lang]}
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            {t.sectionDescription[lang]}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="relative rounded-2xl border border-border bg-card p-8">
              {/* Corner glow accents */}
              <div className="pointer-events-none absolute -top-px -left-px h-16 w-16 rounded-tl-2xl border-t border-l border-neon-purple/30" />
              <div className="pointer-events-none absolute -bottom-px -right-px h-16 w-16 rounded-br-2xl border-b border-r border-neon-purple/30" />

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t.nameLabel[lang]}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t.namePlaceholder[lang]}
                    className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t.emailLabel[lang]}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder[lang]}
                    className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                  />
                </div>

                {/* Subject - full width */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="subject" className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t.subjectLabel[lang]}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder={t.subjectPlaceholder[lang]}
                    className="rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                  />
                </div>

                {/* Message - full width */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t.messageLabel[lang]}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t.messagePlaceholder[lang]}
                    className="resize-none rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 transition-all focus:border-neon-purple/50 focus:outline-none focus:ring-1 focus:ring-neon-purple/30 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSending || isSent}
                  className="group relative flex items-center gap-2.5 rounded-lg bg-neon-purple px-6 py-3 font-mono text-sm font-semibold text-background transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.4),0_0_50px_rgba(168,85,247,0.15)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      {t.success[lang]}
                    </>
                  ) : isSending ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                      {t.sending[lang]}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      {t.send[lang]}
                    </>
                  )}
                  {/* Glow layer */}
                  {!isSending && !isSent && (
                    <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 bg-neon-purple/20 blur-md" />
                  )}
                </button>
              </div>

              {/* Success toast */}
              <div
                className={`absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-5 py-2.5 font-mono text-xs text-neon-green transition-all duration-500 ${isSent
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0 pointer-events-none"
                  }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t.successDescription[lang]}
              </div>
            </form>
          </div>

          {/* Social sidebar */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* Terminal-style info card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-neon-green animate-pulse" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {">"} {t.socials[lang]}
                </span>
              </div>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                {t.orReach[lang]}
              </p>
              <a
                href="https://github.com/Finoraaa"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border bg-secondary p-3.5 transition-all hover:border-neon-purple/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neon-purple/10 transition-colors group-hover:bg-neon-purple/20">
                  <Github className="h-4 w-4 text-neon-purple" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">GitHub</span>
                  <p className="font-mono text-[11px] text-muted-foreground">github.com/Finoraaa</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/__finora__/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border bg-secondary p-3.5 transition-all hover:border-neon-purple/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neon-purple/10 transition-colors group-hover:bg-neon-purple/20">
                  <Instagram className="h-4 w-4 text-neon-purple" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Instagram</span>
                  <p className="font-mono text-[11px] text-muted-foreground">@__finora__</p>
                </div>
              </a>
            </div>

            {/* Decorative status block */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="font-mono text-[11px] text-muted-foreground leading-6">
                <span className="text-neon-purple">$</span> ping finora.dev<br />
                <span className="text-neon-green">PONG</span> - 12ms<br />
                <span className="text-neon-purple">$</span> status --inbox<br />
                <span className="text-neon-green">READY</span> - accepting messages<br />
                <span className="text-muted-foreground/50">_</span><span className="animate-blink text-neon-purple">|</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
