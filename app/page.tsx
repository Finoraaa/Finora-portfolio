"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { VisionSection } from "@/components/vision-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import type { Lang } from "@/lib/translations"

export default function Home() {
  const [lang, setLang] = useState<Lang>("EN")

  return (
    <main className="min-h-screen bg-background">
      <Navbar lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />
      <ProjectsSection lang={lang} />
      <TechStackSection lang={lang} />
      <VisionSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
