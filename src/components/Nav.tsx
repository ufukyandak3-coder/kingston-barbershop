import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const BOOKSY_URL =
  'https://booksy.com/pl-pl/189127_kingston-barbershop_barber-shop_8820_krakow'

const NAV_LINKS = ['services', 'about', 'reviews', 'contact'] as const

export function Nav() {
  const { language, t, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoRef = useRef<HTMLAnchorElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const logoX = useSpring(rawX, { stiffness: 160, damping: 16, mass: 0.5 })
  const logoY = useSpring(rawY, { stiffness: 160, damping: 16, mass: 0.5 })

  const onLogoMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return
    const r = logoRef.current.getBoundingClientRect()
    rawX.set(Math.max(0, ((e.clientX - (r.left + r.width  / 2)) / r.width)  * 12))
    rawY.set(((e.clientY - (r.top  + r.height / 2)) / r.height) * 8)
  }
  const onLogoLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={[
        'fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-6 transition-all duration-700',
        scrolled
          ? 'backdrop-blur-2xl bg-paper/75 border-b border-ink/[0.06]'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* ── Craft Panel — absolute flush against left screen edge ───────── */}
      {/* D-shape: flat left edge flush to screen, curved right */}
      <motion.a
        ref={logoRef}
        href="#top"
        className="select-none absolute left-0 z-10"
        style={{ top: '12px', x: logoX, y: logoY }}
        onMouseMove={onLogoMove}
        onMouseLeave={onLogoLeave}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Smoky crossfade — only right + top/bottom sides, left is clipped by screen */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            borderRadius: '0 999px 999px 0',
            boxShadow:
              '0 0 32px 18px rgba(245,241,229,0.95), 0 0 72px 40px rgba(245,241,229,0.7)',
          }}
        />

        {/* Gold metallic outer frame — flat left, curved right */}
        <div
          style={{
            padding: '2px',
            borderRadius: '0 999px 999px 0',
            background:
              'linear-gradient(135deg, #E8C97A 0%, #B8922A 22%, #3D2A0E 48%, #B8922A 74%, #E8C97A 100%)',
            boxShadow:
              '0 6px 28px rgba(26,22,18,0.38), 0 1px 0 rgba(232,201,122,0.55), inset 0 1px 0 rgba(232,201,122,0.2)',
          }}
        >
          {/* Inner obsidian — flat left, curved right */}
          <div
            style={{
              borderRadius: '0 999px 999px 0',
              background:
                'radial-gradient(ellipse at 28% 22%, #2C2218 0%, #0A0806 60%, #050302 100%)',
              boxShadow:
                'inset 0 3px 14px rgba(0,0,0,0.9), inset 0 -1px 6px rgba(232,201,122,0.08)',
            }}
          >
            <img
              src="/cennik/logo-resim.webp"
              alt="Kingston Barbershop"
              className="h-16 w-auto object-contain block"
              draggable={false}
              style={{ filter: 'drop-shadow(0 2px 8px rgba(232,201,122,0.15))' }}
            />
          </div>
        </div>
      </motion.a>

      {/* ── Nav links + buttons — right-aligned ────────────────────────── */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-end gap-10">
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((key) => (
            <motion.a
              key={key}
              href={`#${key}`}
              className="group relative text-ink-muted hover:text-ink text-[10px] tracking-[0.35em] uppercase transition-colors duration-400 flex flex-col gap-[3px]"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.88, rotate: -1, transition: { type: 'spring', stiffness: 600, damping: 10 } }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.nav[key]}
              <span className="block h-px w-0 bg-ink/50 group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            onClick={toggle}
            className="text-ink-muted hover:text-ink text-[10px] tracking-[0.35em] uppercase transition-colors duration-400"
            whileHover={{ y: -5, scale: 1.12 }}
            whileTap={{ scale: 0.85, rotate: 2, transition: { type: 'spring', stiffness: 600, damping: 10 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {language === 'en' ? 'PL' : 'EN'}
          </motion.button>

          <motion.a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.94, y: 1, transition: { type: 'spring', stiffness: 500, damping: 10 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] tracking-[0.3em] uppercase border border-ink/30 px-6 py-3 text-ink hover:bg-ink hover:text-paper hover:border-ink transition-all duration-500"
          >
            {t.nav.book}
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}
