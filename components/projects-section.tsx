"use client"

import { Bot, Terminal, Activity, Code, Wrench, ChefHat, Globe, ExternalLink, ArrowRight } from "lucide-react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { translations, type Lang } from "@/lib/translations"
import type { ReactNode } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"

import { useEffect, useState } from "react"
import { getProjects } from "@/app/actions/admin-projects"
import type { projects as projectsSchema } from "@/lib/db/schema"
import Link from "next/link"

type ProjectFromDB = typeof projectsSchema.$inferSelect

const projectIcons: ReactNode[] = [
  <Wrench key="wrench" className="h-6 w-6" />,
  <ChefHat key="chefhat" className="h-6 w-6" />,
  <Globe key="globe" className="h-6 w-6" />,
  <Bot key="bot" className="h-6 w-6" />,
  <Terminal key="terminal" className="h-6 w-6" />,
  <Activity key="activity" className="h-6 w-6" />,
  <Code key="code" className="h-6 w-6" />,
]

const accentColors: ("purple" | "green")[] = ["purple", "green", "purple", "green", "purple", "green", "purple"]

function ProjectCard({
  title,
  description,
  icon,
  tags,
  accentColor,
  slug,
}: {
  title: string
  description: string
  icon: ReactNode
  tags: readonly string[]
  accentColor: "purple" | "green"
  slug: string
}) {
  const isPurple = accentColor === "purple"
  const glowShadow = isPurple
    ? "rgba(168, 85, 247, 0.15)"
    : "rgba(34, 197, 94, 0.15)"
  const borderHover = isPurple ? "hover:border-neon-purple/40" : "hover:border-neon-green/40"
  const iconColor = isPurple ? "text-neon-purple" : "text-neon-green"
  const iconBg = isPurple ? "bg-neon-purple/10 border-neon-purple/20" : "bg-neon-green/10 border-neon-green/20"
  const tagBorder = isPurple ? "border-neon-purple/20 text-neon-purple" : "border-neon-green/20 text-neon-green"

  // 3D Tilt Hook Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 ${borderHover} cursor-pointer hover:shadow-2xl hover:-translate-y-1`}
    >
      <Link href={`/projects/${slug}`} className="absolute inset-0 z-20" aria-label={`View ${title}`} />

      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="relative z-10 pointer-events-none"
      >
        {/* Corner accent */}
        <div
          className={`absolute right-[-10px] top-[-10px] h-px w-12 ${isPurple ? "bg-neon-purple/40" : "bg-neon-green/40"} transition-all duration-500 group-hover:w-20`}
        />
        <div
          className={`absolute right-[-10px] top-[-10px] h-12 w-px ${isPurple ? "bg-neon-purple/40" : "bg-neon-green/40"} transition-all duration-500 group-hover:h-20`}
        />

        <div className="flex items-start justify-between mb-4">
          <div className={`inline-flex rounded-lg border p-2.5 ${iconBg}`}>
            <span className={iconColor}>{icon}</span>
          </div>
          <div className={`rounded-full border p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 ${iconBg} ${tagBorder}`}>
            <ArrowRight className={`h-4 w-4 ${iconColor}`} />
          </div>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className={`rounded-md border px-2.5 py-0.5 font-mono text-xs ${tagBorder}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${glowShadow}, transparent 70%)`,
          transform: "translateZ(-10px)"
        }}
      />
    </motion.div>
  )
}

export function ProjectsSection({ lang }: { lang: Lang }) {
  const t = translations.projects
  const [dbProjects, setDbProjects] = useState<ProjectFromDB[]>([])

  useEffect(() => {
    getProjects().then(setDbProjects)
  }, [])

  // Fallback to translations if DB loading or empty? 
  // No, the plan is to move to DB. 
  const displayItems = dbProjects.length > 0 ? dbProjects : []

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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayItems.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 100}
              animation="fade-up"
            >
              <ProjectCard
                title={project.title}
                description={lang === "EN" ? project.descriptionEn : project.descriptionTr}
                icon={projectIcons[index % projectIcons.length]}
                tags={project.tags}
                accentColor={accentColors[index % accentColors.length]}
                slug={project.slug}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

