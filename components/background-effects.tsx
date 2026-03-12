"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"

export function BackgroundEffects() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isMounted, setIsMounted] = useState(false)
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        setOpacity(1)
    }, [])

    useEffect(() => {
        setIsMounted(true)
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [handleMouseMove])

    const spotlightStyle = useMemo(() => ({
        opacity,
        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.08), transparent 80%)`,
    }), [mousePosition.x, mousePosition.y, opacity])

    if (!isMounted) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {/* Interactive Spotlight */}
            <div
                className="absolute inset-0 transition-opacity duration-1000 ease-out"
                style={spotlightStyle}
            />

            {/* Gentle Mesh Gradients */}
            <div
                className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-neon-purple/3 blur-[120px]"
                style={{
                    animation: 'pulse-bloom 15s ease-in-out infinite, float-slow 20s ease-in-out infinite'
                }}
            />
            <div
                className="absolute -right-[5%] top-[10%] h-[40%] w-[40%] rounded-full bg-neon-green/3 blur-[100px]"
                style={{
                    animation: 'pulse-bloom 20s ease-in-out infinite, float-slower 25s ease-in-out infinite',
                    animationDelay: '2s'
                }}
            />
            <div
                className="absolute bottom-[5%] left-[10%] h-[45%] w-[45%] rounded-full bg-neon-purple/2 blur-[130px]"
                style={{
                    animation: 'pulse-bloom 18s ease-in-out infinite, float-slow 22s ease-in-out infinite',
                    animationDelay: '5s'
                }}
            />
        </div>
    )
}
