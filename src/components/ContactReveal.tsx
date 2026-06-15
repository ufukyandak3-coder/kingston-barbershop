import { useLayoutEffect, useRef, useState } from 'react'
import { Reviews } from '../sections/Reviews'
import { Contact } from '../sections/Contact'

/**
 * Reviews (testimonials) scrolls normally, then LOCKS on its last screen
 * (pinned, bottom-aligned). From that point, continued scrolling slides the
 * Contact ("Znajdź Nas") section up from the bottom — as a separate sheet
 * opening directly over the frozen testimonials, with no scroll gap between
 * them. The sheet rises at the natural 1:1 scroll speed (same feel as the
 * rest of the site), then hands off to normal scroll (its lower content +
 * Outro below).
 */
export function ReviewsContactStack() {
  const reviewsRef = useRef<HTMLDivElement>(null)
  const [vh, setVh] = useState(0)
  const [reviewsH, setReviewsH] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      setVh(window.innerHeight)
      if (reviewsRef.current) setReviewsH(reviewsRef.current.offsetHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (reviewsRef.current) ro.observe(reviewsRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div className="relative">
      {/* Reviews — scrolls normally, then pins bottom-aligned on its last screen */}
      <div
        ref={reviewsRef}
        className="sticky z-10"
        style={{ top: vh && reviewsH ? `${vh - reviewsH}px` : 0 }}
      >
        <Reviews />
      </div>

      {/* Contact sheet — scrolls up over the locked Reviews at natural speed */}
      <div className="relative z-20">
        {/* Soft depth shadow cast upward onto the locked Reviews — top only,
            so it never bleeds onto the Outro section below */}
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="relative overflow-hidden rounded-t-[44px]">
          <Contact />
        </div>
      </div>
    </div>
  )
}
