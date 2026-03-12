"use client"

import React, { useEffect, useState, useCallback } from "react"

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const onMouseMove = useCallback((e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
        if (!isVisible) setIsVisible(true)
    }, [isVisible])

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')

            setIsHovering(!!isClickable)
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [onMouseMove])

    if (!isVisible) return null

    return (
        <div
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                transition: 'transform 0.1s ease-out',
            }}
        >
            <div
                className={`relative -left-1/2 -top-1/2 rounded-full border border-neon-purple/50 bg-neon-purple/5 transition-all duration-300 ease-out ${isHovering ? "h-12 w-12 bg-neon-purple/20 scale-150" : "h-6 w-6"
                    }`}
            >
                <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple" />
            </div>
        </div>
    )
}
