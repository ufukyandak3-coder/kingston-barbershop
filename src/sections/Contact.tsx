import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { LocationMap } from '../components/ui/LocationMap'
import { TextDisperse } from '../components/ui/text-disperse'

const BOOKSY_URL = 'https://booksy.com/pl-pl/189127_kingston-barbershop_barber-shop_8820_krakow'
const MAPS_URL   = 'https://maps.google.com/?q=Powsta%C5%84c%C3%B3w+86,+31-670+Krak%C3%B3w'

// ── Magnetic link with underline reveal ─────────────────────────────────────
function MagneticLink({
  href,
  external = false,
  className = '',
  children,
}: {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)

  const springCfg = { stiffness: 180, damping: 18, mass: 0.4 }
  const mx = useSpring(0, springCfg)
  const my = useSpring(0, springCfg)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r  = ref.current.getBoundingClientRect()
    const dx = ((e.clientX - (r.left + r.width  / 2)) / r.width)  * 10
    const dy = ((e.clientY - (r.top  + r.height / 2)) / r.height) * 6
    mx.set(dx)
    my.set(dy)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: mx, y: my }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {children}
      {/* Underline reveal: scaleX 0→1, origin left */}
      <motion.span
        className="absolute left-0 bottom-[-2px] h-px w-full bg-ink/25 origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.a>
  )
}

// ── Disperse link — anchor + underline reveal, no magnetic (TextDisperse handles hover) ──
function DisperseLink({
  href,
  external = false,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-[-2px] h-px w-full bg-ink/25 origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </a>
  )
}

// ── Section ─────────────────────────────────────────────────────────────────
export function Contact() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="relative py-48 lg:py-64 px-8 lg:px-20 bg-paper overflow-hidden"
    >
      {/* Decorative parallax blobs */}
      <Parallax speed={-0.08} className="absolute inset-0 pointer-events-none -z-0">
        <div className="absolute top-[-10%] right-[-8%] w-[50vw] h-[50vw] rounded-full bg-paper-deep/50 blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-paper-soft/60 blur-3xl" />
      </Parallax>

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="space-y-16 lg:space-y-20">

          {/* ── Heading ── */}
          <div className="space-y-8 max-w-4xl">
            <Reveal distance={40}>
              <p className="text-ink-soft text-[10px] tracking-[0.5em] uppercase">
                04 — {t.nav.contact}
              </p>
            </Reveal>
            <Parallax speed={0.16}>
              <Reveal distance={90} plateau="extra-wide">
                <h2 className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] text-ink">
                  {t.contact.heading}
                </h2>
              </Reveal>
            </Parallax>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* ── Left: interactive info ── */}
            <div className="lg:col-span-5 space-y-12">

              {/* Address — Google Maps link */}
              <Reveal distance={50}>
                <div className="space-y-2 border-l border-ink/15 pl-6">
                  <MagneticLink href={MAPS_URL} external>
                    <TextDisperse className="text-ink text-base tracking-wide font-light">
                      {t.contact.address}
                    </TextDisperse>
                  </MagneticLink>
                  <div>
                    <TextDisperse className="text-ink-muted text-sm tracking-wide font-light">
                      {t.contact.district}
                    </TextDisperse>
                  </div>
                </div>
              </Reveal>

              {/* Hours — TextDisperse scatter */}
              <Reveal distance={50}>
                <div className="space-y-2 border-l border-ink/15 pl-6">
                  <div>
                    <TextDisperse className="text-ink text-base tracking-wide font-light">
                      {t.contact.hours.weekdays}
                    </TextDisperse>
                  </div>
                  <div>
                    <TextDisperse className="text-ink-muted text-sm tracking-wide font-light">
                      {t.contact.hours.weekend}
                    </TextDisperse>
                  </div>
                </div>
              </Reveal>

              {/* Phone + Email — TextDisperse scatter + underline reveal */}
              <Reveal distance={50}>
                <div className="space-y-2 border-l border-ink/15 pl-6">
                  <div>
                    <DisperseLink href={`tel:${t.contact.phone.replace(/\s/g, '')}`}>
                      <TextDisperse className="text-ink text-base tracking-wide font-light">
                        {t.contact.phone}
                      </TextDisperse>
                    </DisperseLink>
                  </div>
                  <div>
                    <DisperseLink href={`mailto:${t.contact.email}`}>
                      <TextDisperse className="text-ink-muted text-sm tracking-wide font-light">
                        {t.contact.email}
                      </TextDisperse>
                    </DisperseLink>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* ── Right: map + CTA ── */}
            <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-10 justify-end">
              <Reveal distance={60}>
                <LocationMap
                  location={t.contact.address}
                  coordinates="50.1065° N, 20.0120° E"
                  large
                />
              </Reveal>

              <Reveal distance={50}>
                <motion.a
                  href={BOOKSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-full text-center border border-ink/30 text-ink text-[10px] tracking-[0.45em] uppercase px-12 py-10 lg:py-14 hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-600"
                >
                  {t.contact.cta}
                </motion.a>
              </Reveal>
            </div>
          </div>

          {/* ── Footer row ── */}
          <Reveal distance={30} plateau="wide">
            <div className="pt-12 border-t border-ink/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <span className="font-display text-ink/30 text-base tracking-[0.3em] uppercase">
                Kingston
              </span>
              <span className="text-ink-soft text-[10px] tracking-[0.4em] uppercase">
                Powstańców 86 · Nowa Huta · Kraków
              </span>
              <span className="text-ink/30 text-[10px] tracking-[0.3em] uppercase">
                Designed &amp; developed by{" "}
                <a
                  href="https://www.valthusagency.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ink/50 transition-colors"
                >
                  Valthus Agency
                </a>
              </span>
            </div>
          </Reveal>

        </div>
      </div>

      {/* Gradient → Outro */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20 bg-gradient-to-b from-transparent to-[#F5F1E5]" />
    </section>
  )
}
