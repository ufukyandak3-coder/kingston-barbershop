import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 }

export function Parallax({ children, className, speed = 0.25 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${-speed * 100}%`],
  )

  // Spring wrapping — objects feel heavy and lag behind scroll with inertia
  const y = useSpring(rawY, SPRING)

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
