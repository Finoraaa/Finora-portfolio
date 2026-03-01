import {
  Code2,
  Cpu,
  Layers,
  FileJson,
  Wind,
  Atom,
  Server,
  MessageSquare,
  Binary
} from "lucide-react"

const techStack = [
  { name: "Python", color: "neon-green" as const, icon: <Binary className="h-4 w-4" /> },
  { name: "TypeScript", color: "neon-purple" as const, icon: <FileJson className="h-4 w-4" /> },
  { name: "Next.js", color: "neon-green" as const, icon: <Layers className="h-4 w-4" /> },
  { name: "AI Integration", color: "neon-purple" as const, icon: <Cpu className="h-4 w-4" /> },
  { name: "React", color: "neon-green" as const, icon: <Atom className="h-4 w-4" /> },
  { name: "Node.js", color: "neon-purple" as const, icon: <Server className="h-4 w-4" /> },
  { name: "Discord.py", color: "neon-green" as const, icon: <MessageSquare className="h-4 w-4" /> },
  { name: "Tailwind CSS", color: "neon-purple" as const, icon: <Wind className="h-4 w-4" /> },
]

import { translations, type Lang } from "@/lib/translations"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Magnetic } from "@/components/magnetic"
import type { ReactNode } from "react"

function TechBadge({ name, color, icon }: { name: string; color: "neon-purple" | "neon-green"; icon: ReactNode }) {
  const isPurple = color === "neon-purple"
  return (
    <div
      className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2 ${isPurple
          ? "border-neon-purple/20 bg-neon-purple/5"
          : "border-neon-green/20 bg-neon-green/5"
        }`}
    >
      <span
        className={`${isPurple ? "text-neon-purple" : "text-neon-green"
          } transition-transform group-hover:scale-110`}
      >
        {icon}
      </span>
      <span
        className={`font-mono text-sm font-medium ${isPurple ? "text-neon-purple" : "text-neon-green"
          }`}
      >
        {name}
      </span>
    </div>
  )
}

export function TechStackSection({ lang }: { lang: Lang }) {
  const t = translations.techStack
  const doubled = [...techStack, ...techStack]

  return (
    <section id="stack" className="relative overflow-hidden border-y border-border py-20">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-neon-green">
          {t.sectionLabel[lang]}
        </span>
        <h2 className="text-balance text-2xl font-bold text-foreground md:text-4xl">{t.sectionTitle[lang]}</h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent md:w-40" />

        <div className="flex gap-4 animate-marquee hover:pause" style={{ width: "max-content" }}>
          {doubled.map((tech, index) => (
            <Magnetic key={`${tech.name}-${index}`} strength={0.15}>
              <div>
                <TechBadge name={tech.name} color={tech.color} icon={tech.icon} />
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  )
}
