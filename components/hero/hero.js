import gsap from 'gsap';
import { qsa, qs } from '../../js/utils.js';

const EASE = 'power3.out';

export function initHero() {
  const lines  = qsa('.hero__title-line');
  const sub    = qs('.hero__sub');
  const btn    = qs('.hero__btn');
  const bgText = qs('.hero__bg-text');

  gsap.set([sub, btn], { y: 28, opacity: 0 });

  gsap.timeline({ delay: 0.2 })
    .from(lines, {
      yPercent: 115,
      duration: 1.5,
      ease: EASE,
      stagger: 0.1,
    })
    .to(sub, { opacity: 1, y: 0, duration: 1.1, ease: EASE }, '-=0.8')
    .to(btn, { opacity: 1, y: 0, duration: 1.1, ease: EASE }, '-=0.85')
    .from(bgText, { scale: 1.1, opacity: 0, duration: 2.5, ease: EASE }, 0);

  gsap.to(bgText, {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });
}
