import gsap from 'gsap';
import { qs, qsa } from '../../js/utils.js';

const EASE = 'power3.out';

export function initServices() {
  const header = qs('.services__header');
  const title  = qs('.services__title');
  const cards  = qsa('.service-card');

  gsap.set(header, { opacity: 0, y: 50 });
  gsap.set(cards,  { opacity: 0, y: 44 });

  gsap.to(header, {
    opacity: 1, y: 0, duration: 1.1, ease: EASE,
    scrollTrigger: {
      trigger: '.services', start: 'top 80%', toggleActions: 'play none none none',
    },
  });

  gsap.to(title, {
    yPercent: -12, ease: 'none',
    scrollTrigger: {
      trigger: '.services', start: 'top bottom', end: 'bottom top', scrub: 1,
    },
  });

  gsap.to(cards, {
    opacity: 1, y: 0, duration: 1.0, ease: EASE, stagger: 0.12,
    scrollTrigger: {
      trigger: '.services__grid', start: 'top 84%', toggleActions: 'play none none none',
    },
  });

  gsap.to(header, {
    opacity: 0, y: -35, ease: 'none',
    scrollTrigger: {
      trigger: '.services__header', start: 'bottom 28%', end: 'bottom 0%', scrub: 1,
    },
  });

  gsap.to(cards, {
    opacity: 0, y: -22, ease: 'none',
    stagger: { from: 'end', each: 0.08 },
    scrollTrigger: {
      trigger: '.services', start: 'bottom 52%', end: 'bottom 8%', scrub: 1,
    },
  });
}
