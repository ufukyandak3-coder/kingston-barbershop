import { useRef } from 'react'
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export interface DockItemData {
  href: string
  icon: React.ReactNode
  label: string
  target?: string
}

interface AnimatedDockProps {
  items: DockItemData[]
  className?: string
}

interface DockItemProps {
  mouseX: MotionValue<number>
  item: DockItemData
}

function DockItem({ mouseX, item }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-140, 0, 140], [40, 72, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 13 })

  const iconScale = useTransform(width, [40, 72], [1, 1.45])
  const iconSpring = useSpring(iconScale, { mass: 0.1, stiffness: 160, damping: 13 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-ink/10 border border-ink/20 flex items-center justify-center cursor-pointer hover:bg-ink/16 transition-colors duration-300"
    >
      <motion.a
        href={item.href}
        target={item.target}
        rel="noopener noreferrer"
        aria-label={item.label}
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-full h-full text-ink/85 hover:text-ink transition-colors duration-300"
      >
        {item.icon}
      </motion.a>
    </motion.div>
  )
}

export function AnimatedDock({ items, className = '' }: AnimatedDockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex h-14 items-end gap-5 ${className}`}
    >
      {items.map((item) => (
        <DockItem key={item.label} mouseX={mouseX} item={item} />
      ))}
    </motion.div>
  )
}
