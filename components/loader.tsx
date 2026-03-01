"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Loader() {
    const [percent, setPercent] = useState(0)
    const [show, setShow] = useState(true)
    const [status, setStatus] = useState("Initializing systems...")

    const statuses = [
        "Initializing systems...",
        "Loading core modules...",
        "Establishing secure connection...",
        "Syncing neural interface...",
        "Ready."
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    setTimeout(() => setShow(false), 500)
                    return 100
                }
                return prev + Math.floor(Math.random() * 5) + 1
            })
        }, 50)

        const statusTimer = setInterval(() => {
            setStatus(statuses[Math.floor(Math.random() * (statuses.length - 1))])
        }, 600)

        return () => {
            clearInterval(timer)
            clearInterval(statusTimer)
        }
    }, [])

    useEffect(() => {
        if (percent >= 100) {
            setStatus("Boot sequence complete.")
        }
    }, [percent])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] font-mono"
                >
                    {/* Scanning Line Effect */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
                        <div className="h-1/2 w-full animate-scan bg-gradient-to-b from-transparent via-neon-purple to-transparent" />
                    </div>

                    <div className="relative flex flex-col items-center gap-8">
                        {/* Main Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-baseline gap-2"
                        >
                            <h1 className="text-4xl font-bold tracking-tighter text-white md:text-6xl">
                                WELCOME TO <span className="text-neon-purple">FINORA</span>
                            </h1>
                            <span className="h-3 w-3 animate-pulse rounded-full bg-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                        </motion.div>

                        {/* Technical Details */}
                        <div className="flex w-64 flex-col gap-2 md:w-80">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                                <span>{status}</span>
                                <span>{percent}%</span>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5 border border-white/10">
                                <motion.div
                                    className="absolute left-0 top-0 h-full bg-neon-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                />
                            </div>

                            {/* Decorative Elements */}
                            <div className="mt-4 flex justify-center gap-10 opacity-40">
                                <div className="flex flex-col gap-1">
                                    <div className="h-[2px] w-8 bg-neon-purple" />
                                    <div className="h-[2px] w-12 bg-neon-purple/50" />
                                </div>
                                <div className="text-[9px] uppercase tracking-[0.2em] text-white">System Boot v2.0.4</div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="h-[2px] w-8 bg-neon-purple" />
                                    <div className="h-[2px] w-12 bg-neon-purple/50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Decorations */}
                    <div className="absolute bottom-10 left-10 flex flex-col gap-1 font-mono text-[9px] text-muted-foreground/40 hidden md:flex">
                        <span>// ARCH: X64_86</span>
                        <span>// KERNEL: FINORA_OS_STABLE</span>
                        <span>// UI: NEON_VIRTUAL_MACHINE</span>
                    </div>
                    <div className="absolute bottom-10 right-10 font-mono text-[9px] text-muted-foreground/40 hidden md:block">
                        EST. 2026 // LAB_04
                    </div>


                </motion.div>
            )}
        </AnimatePresence>
    )
}
