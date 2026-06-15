import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
    })

    // Sync Lenis virtual scroll position with native scroll events so that
    // Framer Motion's useScroll (which reads window.scrollY) stays in sync
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll', { bubbles: false }))
    })

    // Smoothly scroll to in-page anchors (#services, #contact, …) through Lenis
    // so virtual scroll position stays consistent and targets land correctly.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      e.preventDefault()
      if (href === '#top') {
        lenis.scrollTo(0)
        return
      }
      const target = document.querySelector(href)
      if (target) lenis.scrollTo(target as HTMLElement, { offset: 0 })
    }
    document.addEventListener('click', onAnchorClick)

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}
