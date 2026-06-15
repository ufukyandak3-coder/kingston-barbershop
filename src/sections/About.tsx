import { useRef, useState, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'

const GALLERY_IMAGES = [
  '/gallery/gallery-1.jpeg',
  '/gallery/gallery-2.jpeg',
  '/gallery/gallery-3.jpeg',
  '/gallery/gallery-4.jpeg',
  '/gallery/gallery-5.jpeg',
  '/gallery/gallery-6.jpeg',
  '/gallery/gallery-7.jpeg',
]

export function About() {
  const { t } = useLanguage()
  const [hovered, setHovered] = useState<number | null>(null)

  // ── Scroll track measurement ─────────────────────────────────────────────
  const wrapperRef = useRef<HTMLDivElement>(null)
  const filmRef    = useRef<HTMLDivElement>(null)
  const [travelPx, setTravelPx] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!filmRef.current) return
      setTravelPx(filmRef.current.scrollWidth - window.innerWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travelPx])
  const x = useSpring(rawX, { stiffness: 80, damping: 25, restDelta: 0.5 })

  return (
    /*
     * CRITICAL: NO overflow-hidden on this element.
     * Any ancestor with overflow != visible silently kills position:sticky on all descendants.
     * Blob clipping is handled by its own isolated wrapper below.
     */
    <section id="about" className="relative bg-paper-soft">

      {/* Decorative blobs — clipped inside their own div, not the section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
        <Parallax speed={-0.08}>
          <div className="absolute top-[-5%] left-[-12%] w-[55vw] h-[55vw] rounded-full bg-paper-deep/55 blur-3xl" />
          <div className="absolute bottom-[-8%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-paper/70 blur-3xl" />
        </Parallax>
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 pt-48 lg:pt-64 pb-20 lg:pb-28 max-w-screen-xl mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-end">

          <div className="lg:col-span-5 space-y-10">
            <Reveal distance={40}>
              <p className="text-ink-soft text-[10px] tracking-[0.5em] uppercase">
                02 — {t.about.label}
              </p>
            </Reveal>
            <Parallax speed={0.16}>
              <Reveal distance={90} plateau="extra-wide">
                <h2 className="font-display text-[clamp(4rem,11vw,11rem)] leading-[0.9] text-ink">
                  {t.about.heading}
                </h2>
              </Reveal>
            </Parallax>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pb-3">
            <Reveal distance={70} plateau="narrow">
              <p className="text-ink/75 text-lg lg:text-xl font-light leading-[1.7] tracking-wide max-w-xl text-balance">
                {t.about.description}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── LAYER 1: SCROLL TRACK (Ray) ─────────────────────────────────────
          Tall wrapper whose scrollYProgress drives the horizontal translation.
          Height = viewport + exact filmstrip travel distance → perfect 1:1 sync.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        ref={wrapperRef}
        style={{ height: travelPx > 0 ? `calc(100vh + ${travelPx}px)` : '400vh' }}
      >

        {/* ── LAYER 2: STICKY CAMERA ──────────────────────────────────────────
            Locks to viewport while the scroll track scrolls beneath it.
            overflow-hidden HERE is correct — clips the filmstrip at viewport edges.
        ────────────────────────────────────────────────────────────────────── */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">

          {/* ── LAYER 3: MOTION FILMSTRIP ─────────────────────────────────── */}
          <motion.div
            ref={filmRef}
            style={{ x }}
            className="flex gap-[4vw] pl-[8vw] pr-[8vw] items-center"
          >
            {GALLERY_IMAGES.map((src, idx) => (
              <div
                key={idx}
                className="relative shrink-0 w-[38vw] lg:w-[30vw] aspect-[4/5] overflow-hidden cursor-default"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Image — scales on hover via Framer Motion */}
                <motion.img
                  src={src}
                  alt={t.about.amenities[idx] ?? ''}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                  animate={{ scale: hovered === idx ? 1.05 : 1 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                />

                {/* Base gradient — always subtle */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />

                {/* Hover gradient — fades in */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent pointer-events-none"
                  animate={{ opacity: hovered === idx ? 1 : 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />

                {/* Index label */}
                <span className="absolute top-5 left-5 text-[9px] tracking-[0.55em] uppercase text-paper/40 select-none z-10">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Masked text reveal — clips via overflow:hidden parent */}
                {t.about.amenities[idx] && (
                  <div className="absolute bottom-6 left-6 right-6 overflow-hidden z-10">
                    <motion.span
                      className="block text-[11px] tracking-[0.4em] uppercase text-paper/90 font-light"
                      animate={{ y: hovered === idx ? '0%' : '100%' }}
                      initial={{ y: '100%' }}
                      transition={{ duration: 0.65, ease: [0.33, 1, 0.68, 1] }}
                    >
                      {t.about.amenities[idx]}
                    </motion.span>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient → Reviews section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20 bg-gradient-to-b from-transparent to-[#EDE8D6]" />
    </section>
  )
}
