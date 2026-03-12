"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Lang } from "@/lib/translations"
import type { projects } from "@/lib/db/schema"
import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

type Project = typeof projects.$inferSelect

export default function ProjectDetailView({ project }: { project: Project }) {
    const [lang, setLang] = useState<Lang>("EN")

    const challenge = lang === "EN" ? project.challengeEn : project.challengeTr
    const solution = lang === "EN" ? project.solutionEn : project.solutionTr
    const features = lang === "EN" ? project.featuresEn : project.featuresTr
    const description = lang === "EN" ? project.descriptionEn : project.descriptionTr

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar lang={lang} setLang={setLang} />

            <div className="relative pt-32 pb-20 px-6">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-neon-purple/5 blur-[120px] pointer-events-none" />

                <div className="mx-auto max-w-4xl">
                    {/* Back Button */}
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-purple transition-colors mb-12 group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {lang === "EN" ? "Back to Projects" : "Projelere Dön"}
                    </Link>

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-xs font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            {project.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-purple text-background font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    {lang === "EN" ? "Live Demo" : "Canlı Demo"}
                                </a>
                            )}
                            <a
                                href="https://github.com/Finoraaa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:border-neon-purple/50 transition-all font-bold"
                            >
                                <Github className="h-4 w-4" />
                                GitHub
                            </a>
                        </div>
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid gap-16 md:grid-cols-1">
                        {/* Challenge & Solution */}
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple/50" />
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <span className="text-neon-purple text-sm font-mono opacity-50">01</span>
                                        {lang === "EN" ? "The Challenge" : "Zorluk"}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {challenge}
                                    </p>
                                </div>

                                <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/50" />
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <span className="text-neon-green text-sm font-mono opacity-50">02</span>
                                        {lang === "EN" ? "The Solution" : "Çözüm"}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {solution}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Features */}
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-card/30 rounded-3xl p-8 border border-border/50"
                        >
                            <h2 className="text-3xl font-bold mb-8">
                                {lang === "EN" ? "Key Features" : "Temel Özellikler"}
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <CheckCircle2 className="h-5 w-5 text-neon-green" />
                                        </div>
                                        <p className="text-muted-foreground font-medium">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>

            <Footer lang={lang} />
        </main>
    )
}
