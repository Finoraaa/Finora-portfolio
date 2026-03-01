"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { type ReactNode } from "react"

/* ── Fade-in-up (for hero staggered titles) ────────────── */

interface FadeInUpProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
  duration?: number
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  ...rest
}: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ── Scroll-reveal (for sections below the fold) ───────── */

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  y = 40,
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ── Hover-lift wrapper (scale + shadow on hover) ──────── */

interface HoverLiftProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  as?: "div" | "a" | "button"
}

export function HoverLift({
  children,
  className = "",
  ...rest
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 30px rgba(168, 85, 247, 0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger container ─────────────────────────────────── */

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.12,
  delayChildren = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger child (used inside StaggerContainer) ──────── */

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode
}

export function StaggerItem({ children, ...rest }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
