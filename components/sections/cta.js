import gsap from 'gsap';
import { qs, qsa } from '../../js/utils.js';

const EASE = 'power3.out';

export function initCta() {
  const label = qs('.cta__label');
  const lines = qsa('.cta__title-line');
  const sub   = qs('.cta__sub');
  const btns  = qsa('.cta__actions a');

  if (!label) return;

  gsap.set(label, { opacity: 0, y: 24 });
  gsap.set(lines, { yPercent: 110 });
  gsap.set([sub, ...btns], { opacity: 0, y: 20 });

  gsap.to(label, {
    opacity: 1, y: 0, duration: 0.9, ease: EASE,
    scrollTrigger: {
      trigger: '.cta', start: 'top 78%', toggleActions: 'play none none none',
    },
  });

  gsap.to(lines, {
    yPercent: 0, duration: 1.4, ease: EASE, stagger: 0.1,
    scrollTrigger: {
      trigger: '.cta', start: 'top 68%', toggleActions: 'play none none none',
    },
  });

  gsap.to([sub, ...btns], {
    opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.12,
    scrollTrigger: {
      trigger: '.cta__actions', start: 'top 82%', toggleActions: 'play none none none',
    },
  });
}
