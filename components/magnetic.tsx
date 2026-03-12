"use client"

import React, { useRef, useState, useCallback } from "react"

interface MagneticProps {
    children: React.ReactElement
    strength?: number
}

export function Magnetic({ children, strength = 0.5 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return

        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        setPosition({ x: middleX * strength, y: middleY * strength })
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 })
    }, [])

    return (
        <div
            ref={ref}
            onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
            onMouseLeave={handleMouseLeave}
            className="inline-block transition-transform duration-300 ease-out"
            style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
            {children}
        </div>
    )
}
