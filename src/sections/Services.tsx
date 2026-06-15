import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'

const SERVICE_IMAGES = [
  '/cennik/cennik-1.webp',
  '/cennik/cennik-2.webp',
  '/cennik/fırca-bıcak.webp',
  '/cennik/malzeme-marka.webp',
]

const IMAGE_SIZE: { maxHeight: string; maxWidth: string }[] = [
  { maxHeight: '105vh', maxWidth: '110%' },
  { maxHeight: '140vh', maxWidth: '150%' },
  { maxHeight: '115vh', maxWidth: '125%' },
  { maxHeight: '105vh', maxWidth: '115%' },
]

interface ServiceItem {
  name: string
  duration: string
  price: string
  description: string
  image: string
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
const IMG_T  = { duration: 1.4, ease: EASE }
const TEXT_T = { duration: 1.1, ease: EASE }
const D = [0, 0.08, 0.15, 0.21, 0.27, 0.34] as const

const itemVariant = {
  hidden: { opacity: 0, y: 28, filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:   { opacity: 0, y: -22, filter: 'blur(3px)' },
}

export function Services() {
  const { t } = useLanguage()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // -1 means "not yet entered" — AnimatePresence renders nothing until scroll begins
  const [activeIndex, setActiveIndex] = useState(-1)

  const cards: ServiceItem[] = t.services.items.map((svc, i) => ({
    ...svc,
    image: SERVICE_IMAGES[i] ?? SERVICE_IMAGES[0],
  }))
  const N = cards.length

  // ── Sticky scroll tracking ──────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // First event fires → sticky panel entered → trigger entry animation
    setActiveIndex(Math.min(Math.floor(v * N), N - 1))
  })

  // ── Mouse parallax for floating image ──────────────────────────────────────
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const floatX = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.9 })
  const floatY = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.9 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    rawX.set(((e.clientX - r.left  - r.width  / 2) / r.width)  * -13)
    rawY.set(((e.clientY - r.top   - r.height / 2) / r.height) * -11)
  }
  const onMouseLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <section id="services" className="relative bg-paper">

      {/* ── Section heading ─────────────────────────────────────────────────── */}
      <div className="relative z-10 pt-48 lg:pt-64 pb-0 px-8 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="space-y-8 max-w-4xl">
            <Reveal distance={40}>
              <p className="text-ink-soft text-[10px] tracking-[0.5em] uppercase">
                01 — {t.nav.services}
              </p>
            </Reveal>
            <Parallax speed={0.16}>
              <Reveal distance={90} plateau="extra-wide">
                <h2 className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] text-ink">
                  {t.services.heading}
                </h2>
              </Reveal>
            </Parallax>
          </div>
        </div>
      </div>

      {/* ── Mobile: card stack ─────────────────────────────────────────────── */}
      <div className="relative z-10 lg:hidden px-8 pt-16 pb-32 flex flex-col gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-ink/10 overflow-hidden bg-paper-soft"
            style={{ height: '22rem' }}
          >
            <img
              src={card.image}
              alt={card.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-6"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-paper-soft/60 text-[10px] tracking-[0.45em] uppercase mb-1.5">
                {card.duration}
              </p>
              <h3 className="font-display text-paper-soft text-xl mb-1">{card.name}</h3>
              <p className="text-paper-soft/45 text-[10px] tracking-wide font-light mb-3">
                {card.description}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-paper-soft text-3xl">{card.price}</span>
                <span className="text-paper-soft/50 text-xs tracking-widest">{t.services.currency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop: sticky scroll zone ─────────────────────────────────────── */}
      {/* Height = (N+1)×100vh → gives exactly N×100vh of sticky dwell         */}
      <div
        ref={wrapperRef}
        className="hidden lg:block relative z-10 mt-20"
        style={{ height: `${(N + 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex">

          {/* LEFT — floating image panel ──────────────────────────────────── */}
          <div
            className="w-[55%] flex-shrink-0 relative flex items-center justify-center overflow-hidden"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Ambient glow — always present */}
            <div
              className="absolute w-[28rem] h-[28rem] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(26,22,18,0.05) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Image — only mounts after first scroll event, triggering entry anim */}
            <AnimatePresence mode="sync">
              {activeIndex >= 0 && (
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 1.04, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1,    y: 0,  filter: 'blur(0px)' }}
                  exit={{    opacity: 0, scale: 0.97, y: -20, filter: 'blur(5px)' }}
                  transition={IMG_T}
                >
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.06, rotate: -1 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <motion.img
                      src={cards[activeIndex].image}
                      alt={cards[activeIndex].name}
                      draggable={false}
                      className="select-none object-contain"
                      style={{
                        x: floatX,
                        y: floatY,
                        maxHeight: IMAGE_SIZE[activeIndex].maxHeight,
                        maxWidth:  IMAGE_SIZE[activeIndex].maxWidth,
                        filter: 'drop-shadow(0 28px 56px rgba(26,22,18,0.18))',
                      }}
                      whileHover={{ filter: 'drop-shadow(0 40px 80px rgba(26,22,18,0.28))' }}
                      transition={{ duration: 0.55, ease: EASE }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress dots — visible only after entry */}
            {activeIndex >= 0 && (
              <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 pointer-events-none">
                {cards.map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full bg-ink"
                    animate={{
                      width:   i === activeIndex ? 26 : 5,
                      height:  4,
                      opacity: i === activeIndex ? 0.35 : 0.12,
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — staggered text panel ──────────────────────────────────── */}
          <div className="flex-1 border-l border-ink/6 relative overflow-hidden">
            <AnimatePresence mode="sync">
              {activeIndex >= 0 && (
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0 flex items-center px-16 xl:px-24"
                >
                  <div className="space-y-7 w-full">

                    {/* Index number */}
                    <motion.div
                      className="flex items-baseline gap-4"
                      variants={itemVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      transition={{ ...TEXT_T, delay: D[0] }}
                    >
                      <span className="font-display text-ink/10 text-8xl xl:text-9xl leading-none select-none">
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="text-ink/30 text-[9px] tracking-[0.55em] uppercase">
                        / {String(N).padStart(2, '0')}
                      </span>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                      className="h-px bg-ink/20"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{    scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.85, delay: D[1], ease: EASE }}
                      style={{ originX: 0, width: '2.5rem' }}
                    />

                    {/* Service name */}
                    <motion.h3
                      className="font-display text-ink text-[clamp(2.2rem,3.8vw,4.5rem)] leading-[0.95] max-w-xs"
                      variants={itemVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      transition={{ ...TEXT_T, delay: D[2] }}
                    >
                      {cards[activeIndex].name}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-ink/40 text-xs font-light tracking-wide leading-relaxed max-w-xs"
                      variants={itemVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      transition={{ ...TEXT_T, delay: D[3] }}
                    >
                      {cards[activeIndex].description}
                    </motion.p>

                    {/* Duration */}
                    <motion.p
                      className="text-ink/35 text-[9px] tracking-[0.55em] uppercase"
                      variants={itemVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      transition={{ ...TEXT_T, delay: D[4] }}
                    >
                      {cards[activeIndex].duration}
                    </motion.p>

                    {/* Price */}
                    <motion.div
                      className="flex items-baseline gap-3 pt-2"
                      variants={itemVariant}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      transition={{ ...TEXT_T, delay: D[5] }}
                    >
                      <span className="font-display text-ink text-[clamp(3.5rem,5vw,6.5rem)] leading-none">
                        {cards[activeIndex].price}
                      </span>
                      <span className="text-ink/30 text-xs tracking-[0.35em] uppercase">
                        {t.services.currency}
                      </span>
                    </motion.div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <div className="h-20 lg:h-28" />
      {/* Gradient → paper-soft (About) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20 bg-gradient-to-b from-transparent to-[#F5F1E5]" />
    </section>
  )
}
