import { useRef, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const BOOKSY_URL =
  'https://booksy.com/pl-pl/189127_kingston-barbershop_barber-shop_8820_krakow'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, delay: 0.4 + i * 0.22, ease },
  }),
}

const SCROLL_DWELL = 1400
const TOTAL_FRAMES = 241
const BASE_PATH = '/hero-frames-upscale/ezgif-frame-'

// Preload all frames into Image objects so drawImage is instant
function preloadFrames(): HTMLImageElement[] {
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const img = new Image()
    img.src = `${BASE_PATH}${String(i + 1).padStart(3, '0')}.jpg`
    return img
  })
}

export function Hero() {
  const { t } = useLanguage()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Preload images once on mount
  useEffect(() => {
    framesRef.current = preloadFrames()
  }, [])

  // RAF draw loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })!

    // Set canvas dimensions to match frame images (set once on first draw)
    let sized = false

    let rafId: number
    const tick = () => {
      const frames = framesRef.current
      if (frames.length > 0) {
        const progress = scrollYProgress.get()
        const idx = Math.min(
          Math.floor(progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1,
        )
        const img = frames[idx]
        if (img.complete && img.naturalWidth > 0) {
          if (!sized) {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            sized = true
          }
          ctx.drawImage(img, 0, 0)
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [scrollYProgress])

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${SCROLL_DWELL}px)` }}>
      <section id="top" className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas — static pre-rendered frames, zero decode overhead */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: '35% 50%' }}
        />

        {/* Left-side readability gradient — preserves original video colors on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(239,234,217,0.65) 0%, rgba(239,234,217,0.28) 32%, transparent 50%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20 bg-gradient-to-b from-transparent to-paper" />

        {/* ── Content: upper-left heading + lower row ── */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between px-8 lg:px-20 pt-36 pb-12">

          <div className="space-y-6 max-w-xl">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-ink-muted text-[10px] tracking-[0.5em] uppercase"
            >
              {t.hero.location}
            </motion.p>
            <div>
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display text-[clamp(4rem,13vw,13rem)] leading-[0.85] text-ink tracking-tight"
              >
                Kingston
              </motion.h1>
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display text-[clamp(1.1rem,3.2vw,3.2rem)] leading-none text-ink/70 tracking-[0.18em] uppercase pl-1 mt-8 lg:mt-10"
              >
                Barbershop
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-4">
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display italic text-ink/80 text-[clamp(1.2rem,2.4vw,2.4rem)] leading-tight lg:col-span-6 max-w-xl text-balance"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 flex flex-col items-start lg:items-end justify-end gap-6"
            >
              <p className="text-ink-muted text-xs tracking-[0.25em] uppercase max-w-xs lg:text-right">
                {t.hero.tagline}
              </p>
              <motion.a
                href={BOOKSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.45, ease }}
                className="inline-block border border-ink/40 text-ink text-[10px] tracking-[0.4em] uppercase px-12 py-5 hover:bg-ink hover:text-paper transition-colors duration-600"
              >
                {t.hero.cta}
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6, ease }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-ink-soft z-10"
        >
          <span className="text-[9px] tracking-[0.5em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="block w-px h-10 bg-ink-soft/60"
          />
        </motion.div>

      </section>
    </div>
  )
}
