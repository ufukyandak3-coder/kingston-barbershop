import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  distance?: number
  plateau?: 'narrow' | 'wide' | 'extra-wide'
}

// Elements only begin to appear when very close to viewport center
const PLATEAUS: Record<NonNullable<RevealProps['plateau']>, readonly [number, number, number, number]> = {
  narrow:       [0, 0.56, 0.76, 1],
  wide:         [0, 0.52, 0.78, 1],
  'extra-wide': [0, 0.30, 0.84, 1],
}

// Lazy spring — visual reveal lags noticeably behind scroll position
const SPRING = { stiffness: 26, damping: 10, restDelta: 0.001 }

export function Reveal({
  children,
  className,
  distance = 90,
  plateau = 'wide',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const [p0, p1, p2, p3] = PLATEAUS[plateau]

  // y and opacity share the same plateau window — element stays "below" until it should appear
  const rawOpacity = useTransform(scrollYProgress, [p0, p1, p2, p3], [0, 1, 1, 0])
  const rawY = useTransform(scrollYProgress, [p0, p1, p2, p3], [distance, 0, 0, -distance])

  const opacity = useSpring(rawOpacity, SPRING)
  const y = useSpring(rawY, SPRING)

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  )
}
