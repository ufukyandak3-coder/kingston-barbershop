import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { StaggerTestimonials } from '../components/ui/StaggerTestimonials'

export function Reviews() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  // Background transition: cream → #050505 — long scroll range for gradual fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  })
  const rawProgress = useSpring(scrollYProgress, { stiffness: 28, damping: 14, restDelta: 0.001 })

  const bgColor      = useTransform(rawProgress, [0, 1], ['#EDE8D6', '#050505'])
  const headingColor = useTransform(rawProgress, [0, 1], ['#1A1612', '#EFEAD9'])
  const labelColor   = useTransform(rawProgress, [0, 1], ['rgba(26,22,18,0.45)', 'rgba(239,234,217,0.30)'])
  const dividerColor = useTransform(rawProgress, [0, 1], ['rgba(26,22,18,0.10)', 'rgba(255,255,255,0.07)'])
  const statNumColor = useTransform(rawProgress, [0, 1], ['#1A1612', '#EFEAD9'])
  const statLblColor = useTransform(rawProgress, [0, 1], ['rgba(26,22,18,0.55)', 'rgba(239,234,217,0.60)'])
  const starColor    = useTransform(rawProgress, [0, 1], ['#1A1612', '#C9B97A'])

  return (
    <motion.section
      id="reviews"
      style={{ backgroundColor: bgColor }}
      className="relative overflow-hidden"
    >
      <div ref={sectionRef} className="py-40 lg:py-56">
        <div className="relative z-10 max-w-screen-xl mx-auto px-8 lg:px-20">

          {/* ── Header ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-end mb-24 lg:mb-36">
            <div className="lg:col-span-7 space-y-10">
              <Reveal distance={40}>
                <motion.p
                  style={{ color: labelColor }}
                  className="text-[10px] tracking-[0.5em] uppercase"
                >
                  03 — {t.nav.reviews}
                </motion.p>
              </Reveal>

              <Parallax speed={0.14}>
                <Reveal distance={80} plateau="extra-wide">
                  <motion.h2
                    style={{ color: headingColor }}
                    className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.9]"
                  >
                    {t.reviews.heading}
                  </motion.h2>
                </Reveal>
              </Parallax>
            </div>

            {/* Stats — right column */}
            <div className="lg:col-span-5 flex flex-col gap-0">
              <motion.div
                style={{ borderColor: dividerColor }}
                className="border-t py-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span key={i} style={{ color: starColor }} className="text-lg leading-none">★</motion.span>
                  ))}
                </div>
                <motion.p style={{ color: statNumColor }} className="font-display text-[clamp(2.4rem,4vw,4rem)] leading-none">
                  {t.reviews.rating}
                </motion.p>
              </motion.div>

              <motion.div
                style={{ borderColor: dividerColor }}
                className="border-t py-8 flex items-center justify-between"
              >
                <motion.p style={{ color: statLblColor }} className="text-[9px] tracking-[0.5em] uppercase">
                  Google Reviews
                </motion.p>
                <motion.p style={{ color: statNumColor }} className="font-display text-[clamp(2.4rem,4vw,4rem)] leading-none">
                  400+
                </motion.p>
              </motion.div>

              <motion.div
                style={{ borderColor: dividerColor }}
                className="border-t border-b py-8 flex items-center justify-between"
              >
                <motion.p style={{ color: statLblColor }} className="text-[9px] tracking-[0.5em] uppercase">
                  Booksy Reviews
                </motion.p>
                <motion.p style={{ color: statNumColor }} className="font-display text-[clamp(2.4rem,4vw,4rem)] leading-none">
                  2000+
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* ── Carousel — full viewport width ── */}
          <Reveal distance={40} plateau="wide">
            <div className="relative z-10 mt-6">
              <StaggerTestimonials items={t.reviews.items} />
            </div>
          </Reveal>

        </div>
      </div>

      {/* Gradient out → frozen dark backdrop (Contact rises over this) */}
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20 bg-gradient-to-b from-transparent to-[#050505]" />
    </motion.section>
  )
}
