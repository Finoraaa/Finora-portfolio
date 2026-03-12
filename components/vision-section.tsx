import { Lightbulb, Layers, Rocket } from "lucide-react"
import { translations, type Lang } from "@/lib/translations"
import type { ReactNode } from "react"

const pillarIcons: ReactNode[] = [
  <Lightbulb key="lightbulb" className="h-5 w-5" />,
  <Layers key="layers" className="h-5 w-5" />,
  <Rocket key="rocket" className="h-5 w-5" />,
]

export function VisionSection({ lang }: { lang: Lang }) {
  const t = translations.vision

  return (
    <section id="vision" className="relative px-6 py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[400px] rounded-full bg-neon-green/3 blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left side - text */}
          <div>
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-neon-purple">
              {t.sectionLabel[lang]}
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-5xl">
              {t.sectionTitleTop[lang]}
              <br />
              <span className="text-neon-purple">{t.sectionTitleHighlight[lang]}</span>
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {t.paragraph1[lang]}
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {t.paragraph2[lang]}
            </p>

            {/* Terminal-style decorative element */}
            <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-4">
              <div className="mb-2 flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#eab308]/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-neon-green/60" />
              </div>
              <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
                <code>
{`$ finora --status
  
  brand:     active
  projects:  4 in development
  mission:   ${t.terminal.mission[lang]}
  status:    ${t.terminal.status[lang]}`}
                </code>
              </pre>
            </div>
          </div>

          {/* Right side - pillars */}
          <div className="flex flex-col gap-6">
            {t.pillars.map((pillar, index) => (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card/30 p-6 transition-all duration-500 hover:border-neon-purple/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neon-purple/20 bg-neon-purple/5 text-neon-purple transition-colors group-hover:bg-neon-purple/10">
                    {pillarIcons[index]}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-foreground">{pillar.title[lang]}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
