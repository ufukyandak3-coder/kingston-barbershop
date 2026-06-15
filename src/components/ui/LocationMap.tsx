import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

const MAPS_URL = 'https://maps.app.goo.gl/Vwv44dBYdXcoyx3X7'

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
  large?: boolean
}

export function LocationMap({
  location = 'Powstańców 86, Kraków',
  coordinates = '50.1065° N, 20.0120° E',
  className,
  large = false,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${large ? 'w-full' : ''} ${className ?? ''}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(MAPS_URL, '_blank', 'noopener,noreferrer')}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl bg-paper-soft border border-ink/15 ${large ? 'w-full' : ''}`}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
        animate={
          large
            ? { height: isHovered ? 340 : 200 }
            : { width: isHovered ? 360 : 280, height: isHovered ? 280 : 140 }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-paper-deep/20 via-transparent to-paper-deep/40" />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <div className="absolute inset-0 bg-paper-deep" />
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {[35, 65].map((y, i) => (
                  <motion.line key={`h${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    className="stroke-ink/25" strokeWidth="4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} />
                ))}
                {[30, 70].map((x, i) => (
                  <motion.line key={`v${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    className="stroke-ink/20" strokeWidth="3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }} />
                ))}
                {[20, 50, 80].map((y, i) => (
                  <motion.line key={`hs${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    className="stroke-ink/10" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }} />
                ))}
              </svg>
              {[
                { t: '40%', l: '10%', w: '15%', h: '20%' },
                { t: '15%', l: '35%', w: '12%', h: '15%' },
                { t: '70%', l: '75%', w: '18%', h: '18%' },
                { t: '20%', l: '78%', w: '10%', h: '25%' },
              ].map((b, i) => (
                <motion.div key={i}
                  className="absolute rounded-sm bg-ink-muted/25 border border-ink-muted/15"
                  style={{ top: b.t, left: b.l, width: b.w, height: b.h }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }} />
              ))}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.3 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(139,115,85,0.6))' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#8B7355" />
                  <circle cx="12" cy="9" r="2.5" fill="#F5F1E5" />
                </svg>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-paper-soft via-transparent to-transparent opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="absolute inset-0 opacity-[0.03]"
          animate={{ opacity: isHovered ? 0 : 0.03 }} transition={{ duration: 0.3 }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="km-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-ink" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#km-grid)" />
          </svg>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <motion.div animate={{ opacity: isHovered ? 0 : 1 }} transition={{ duration: 0.3 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" />
              </svg>
            </motion.div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-ink/5">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[10px] text-ink-muted tracking-wide uppercase">Nowa Huta</span>
            </div>
          </div>

          <div className="space-y-1">
            <motion.h3 className="text-ink font-medium text-sm tracking-tight"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              {location}
            </motion.h3>
            <AnimatePresence>
              {isHovered && (
                <motion.p className="text-ink-muted text-xs font-mono"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.2 }}>
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.div className="h-px bg-gradient-to-r from-gold/60 via-gold/30 to-transparent"
              initial={{ scaleX: 0.3, originX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }} />
          </div>
        </div>
      </motion.div>

      <motion.p className="absolute -bottom-7 left-1/2 text-[10px] text-ink-muted whitespace-nowrap"
        style={{ x: '-50%' }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}>
        Open in Google Maps →
      </motion.p>
    </motion.div>
  )
}
