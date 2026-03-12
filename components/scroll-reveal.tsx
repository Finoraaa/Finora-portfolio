"use client"

import React, { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
    children: React.ReactNode
    animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up"
    delay?: number
    duration?: number
    className?: string
}

export function ScrollReveal({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 800,
    className = "",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    const getAnimationStyles = () => {
        if (!isVisible) {
            switch (animation) {
                case "fade-up": return "translate-y-10 opacity-0"
                case "fade-down": return "-translate-y-10 opacity-0"
                case "fade-left": return "translate-x-10 opacity-0"
                case "fade-right": return "-translate-x-10 opacity-0"
                case "scale-up": return "scale-90 opacity-0"
                default: return "opacity-0"
            }
        }
        return "translate-y-0 translate-x-0 scale-100 opacity-100"
    }

    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${getAnimationStyles()} ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    )
}
