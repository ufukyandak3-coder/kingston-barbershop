import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, X } from 'lucide-react'

interface ReviewItem {
  name: string
  text: string
}

interface TestimonialCarouselProps {
  items: ReviewItem[]
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  cb: () => void,
) {
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      cb()
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [ref, cb])
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="w-11 h-11 rounded-full bg-ink flex items-center justify-center shrink-0">
      <span className="text-paper-soft text-[9px] tracking-[0.22em] font-light">
        {initials}
      </span>
    </div>
  )
}

function ExpandedCard({
  item,
  onClose,
}: {
  item: ReviewItem
  onClose: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  useOutsideClick(containerRef, onClose)

  useEffect(() => {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.dataset.scrollY = String(scrollY)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      const sy = parseInt(document.body.dataset.scrollY ?? '0', 10)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo({ top: sy })
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-ink/20 backdrop-blur-xl"
      />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.55, ease }}
        className="relative max-w-lg w-full bg-paper border border-ink/10 px-10 py-12 lg:px-14 lg:py-16 z-10 shadow-[0_48px_120px_rgba(26,22,18,0.14)]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-300"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Quote icon */}
        <Quote className="w-5 h-5 text-gold/50 mb-8" />

        {/* Full review text */}
        <p className="font-display text-ink/75 text-xl lg:text-[1.6rem] font-light italic leading-[1.65] tracking-wide mb-10">
          "{item.text}"
        </p>

        {/* Author row */}
        <div className="flex items-center gap-5 pt-8 border-t border-ink/10">
          <Avatar name={item.name} />
          <div>
            <p className="text-ink text-[10px] tracking-[0.45em] uppercase font-light">
              {item.name}
            </p>
            <div className="flex gap-0.5 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-[11px]">
                  ★
                </span>
              ))}
            </div>
          </div>
          <span className="ml-auto text-ink-soft text-[8px] tracking-[0.5em] uppercase">
            Google
          </span>
        </div>
      </motion.div>
    </div>
  )
}

function ReviewCard({
  item,
  index,
  onExpand,
}: {
  item: ReviewItem
  index: number
  onExpand: () => void
}) {
  return (
    <motion.button
      onClick={onExpand}
      initial={{ opacity: 0, y: 18 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.09 * index, ease },
      }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.985 }}
      className="text-left shrink-0 w-[17rem] lg:w-[20rem] group cursor-pointer"
    >
      <div className="h-[21rem] bg-paper-soft border border-ink/10 flex flex-col justify-between px-8 py-8 relative overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_28px_72px_rgba(26,22,18,0.10)]">
        {/* Large decorative quote mark */}
        <span className="absolute top-4 right-6 font-display text-[7rem] text-ink/[0.035] leading-none select-none pointer-events-none">
          "
        </span>

        {/* Header */}
        <div className="flex items-start gap-3 relative">
          <Avatar name={item.name} />
          <div className="flex-1 pt-0.5">
            <p className="text-ink text-[9px] tracking-[0.4em] uppercase font-light leading-snug">
              {item.name}
            </p>
            <div className="flex gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-[10px]">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Review snippet */}
        <p className="text-ink/55 text-sm leading-[1.75] font-light tracking-wide line-clamp-4 relative">
          {item.text}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-ink/8 relative">
          <span className="text-ink-soft text-[8px] tracking-[0.45em] uppercase">
            Google Reviews
          </span>
          <span className="text-ink/20 text-[8px] tracking-[0.3em] uppercase group-hover:text-ink/45 transition-colors duration-400">
            Read →
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)

  const check = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    check()
    el.addEventListener('scroll', check, { passive: true })
    return () => el.removeEventListener('scroll', check)
  }, [check])

  return (
    <>
      <AnimatePresence>
        {expanded !== null && (
          <ExpandedCard
            key="expanded"
            item={items[expanded]}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
        >
          <div className="flex gap-5 lg:gap-6">
            {items.map((item, i) => (
              <ReviewCard
                key={i}
                item={item}
                index={i}
                onExpand={() => setExpanded(i)}
              />
            ))}
            <div className="shrink-0 w-1" aria-hidden />
          </div>
        </div>

        {/* Navigation row */}
        <div className="flex items-center gap-3 mt-8 lg:mt-10">
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({ left: -360, behavior: 'smooth' })
            }
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-12 h-12 border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-all duration-400 disabled:opacity-25 disabled:cursor-not-allowed group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          </button>
          <button
            onClick={() =>
              scrollRef.current?.scrollBy({ left: 360, behavior: 'smooth' })
            }
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-12 h-12 border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-all duration-400 disabled:opacity-25 disabled:cursor-not-allowed group"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
          <span className="ml-4 text-ink-soft text-[9px] tracking-[0.45em] uppercase">
            {items.length} Reviews
          </span>
        </div>
      </div>
    </>
  )
}
