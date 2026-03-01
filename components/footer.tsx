import { Github, Twitter, Instagram } from "lucide-react"
import { translations, type Lang } from "@/lib/translations"
import { Magnetic } from "@/components/magnetic"

export function Footer({ lang }: { lang: Lang }) {
  const t = translations.footer

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neon-purple/10 border border-neon-purple/20">
            <span className="font-mono text-xs font-bold text-neon-purple">F</span>
          </div>
          <span className="text-sm font-medium text-foreground">Finora</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#projects" className="text-xs text-muted-foreground transition-colors hover:text-neon-purple">
            {t.projects[lang]}
          </a>
          <a href="#stack" className="text-xs text-muted-foreground transition-colors hover:text-neon-purple">
            {t.stack[lang]}
          </a>
          <a href="#vision" className="text-xs text-muted-foreground transition-colors hover:text-neon-purple">
            {t.vision[lang]}
          </a>
          <a href="#contact" className="text-xs text-muted-foreground transition-colors hover:text-neon-purple">
            {t.contact[lang]}
          </a>
          <Magnetic strength={0.2}>
            <a
              href="https://github.com/Finoraaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-neon-purple"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href="https://x.com/Furkan_Denizzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-neon-purple"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>

        <p className="font-mono text-[11px] text-muted-foreground">
          &copy; {new Date().getFullYear()} Finora. {t.rights[lang]}
        </p>
      </div>
    </footer>
  )
}
