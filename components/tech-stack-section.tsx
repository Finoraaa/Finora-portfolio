import { translations, type Lang } from "@/lib/translations"

const techStack = [
  { name: "Python", color: "neon-green" as const },
  { name: "TypeScript", color: "neon-purple" as const },
  { name: "Next.js", color: "neon-green" as const },
  { name: "AI Integration", color: "neon-purple" as const },
  { name: "React", color: "neon-green" as const },
  { name: "Node.js", color: "neon-purple" as const },
  { name: "Discord.py", color: "neon-green" as const },
  { name: "Tailwind CSS", color: "neon-purple" as const },
]

function TechBadge({ name, color }: { name: string; color: "neon-purple" | "neon-green" }) {
  const isPurple = color === "neon-purple"
  return (
    <div
      className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2 ${
        isPurple
          ? "border-neon-purple/20 bg-neon-purple/5"
          : "border-neon-green/20 bg-neon-green/5"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPurple ? "bg-neon-purple shadow-[0_0_6px_rgba(168,85,247,0.6)]" : "bg-neon-green shadow-[0_0_6px_rgba(34,197,94,0.6)]"
        }`}
      />
      <span
        className={`font-mono text-sm font-medium ${
          isPurple ? "text-neon-purple" : "text-neon-green"
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

        <div className="flex gap-4 animate-marquee" style={{ width: "max-content" }}>
          {doubled.map((tech, index) => (
            <TechBadge key={`${tech.name}-${index}`} name={tech.name} color={tech.color} />
          ))}
        </div>
      </div>
    </section>
  )
}
