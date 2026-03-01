"use client"

import { Bot, Terminal, Activity, Code } from "lucide-react"
import { translations, type Lang } from "@/lib/translations"
import type { ReactNode } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

const projectIcons: ReactNode[] = [
  <Bot key="bot" className="h-6 w-6" />,
  <Terminal key="terminal" className="h-6 w-6" />,
  <Activity key="activity" className="h-6 w-6" />,
  <Code key="code" className="h-6 w-6" />,
]

const accentColors: ("purple" | "green")[] = ["purple", "green", "purple", "green"]

function ProjectCard({
  title,
  description,
  icon,
  tags,
  accentColor,
}: {
  title: string
  description: string
  icon: ReactNode
  tags: readonly string[]
  accentColor: "purple" | "green"
}) {
  const isPurple = accentColor === "purple"
  const glowColor = isPurple
    ? "hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
    : "hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
  const borderHover = isPurple ? "hover:border-neon-purple/40" : "hover:border-neon-green/40"
  const iconColor = isPurple ? "text-neon-purple" : "text-neon-green"
  const iconBg = isPurple ? "bg-neon-purple/10 border-neon-purple/20" : "bg-neon-green/10 border-neon-green/20"
  const tagBorder = isPurple ? "border-neon-purple/20 text-neon-purple" : "border-neon-green/20 text-neon-green"

  return (
    <div
      className={`group relative rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 ${glowColor} ${borderHover}`}
    >
      {/* Corner accent */}
      <div
        className={`absolute right-0 top-0 h-px w-12 ${isPurple ? "bg-neon-purple/40" : "bg-neon-green/40"} transition-all duration-500 group-hover:w-20`}
      />
      <div
        className={`absolute right-0 top-0 h-12 w-px ${isPurple ? "bg-neon-purple/40" : "bg-neon-green/40"} transition-all duration-500 group-hover:h-20`}
      />

      <div className={`mb-4 inline-flex rounded-lg border p-2.5 ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className={`rounded-md border px-2.5 py-0.5 font-mono text-xs ${tagBorder}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ProjectsSection({ lang }: { lang: Lang }) {
  const t = translations.projects

  return (
    <section id="projects" className="relative px-6 py-32">
      {/* Section background accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[300px] -translate-y-1/2 rounded-full bg-neon-purple/3 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <ScrollReveal animation="fade-up" className="mb-16 text-center">
          <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-neon-purple">
            {t.sectionLabel[lang]}
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">{t.sectionTitle[lang]}</h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            {t.sectionDescription[lang]}
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {t.items.map((project, index) => (
            <ScrollReveal
              key={project.title}
              delay={index * 150}
              animation={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <ProjectCard
                title={project.title}
                description={project.description[lang]}
                icon={projectIcons[index]}
                tags={project.tags}
                accentColor={accentColors[index]}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
