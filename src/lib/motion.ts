import type { Variants } from 'framer-motion'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease },
  },
}

export const scaleReveal: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease },
  },
}

export const sectionStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
}

export const gridStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease },
  },
}
