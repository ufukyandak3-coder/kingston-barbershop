import gsap from 'gsap';
import { qs, qsa } from '../../js/utils.js';

const EASE = 'power3.out';

export function initReviews() {
  const label  = qs('.reviews__label');
  const title  = qs('.reviews__title');
  const rating = qs('.reviews__rating');
  const cards  = qsa('.review-card');

  if (!label) return;

  gsap.set([label, title, rating], { opacity: 0, y: 40 });
  gsap.set(cards, { opacity: 0, y: 60 });

  gsap.to([label, title, rating], {
    opacity: 1, y: 0,
    duration: 1.1,
    ease: EASE,
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.reviews',
      start: 'top 78%',
      toggleActions: 'play none none none',
    },
  });

  gsap.to(cards, {
    opacity: 1, y: 0,
    duration: 1.0,
    ease: EASE,
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.reviews__grid',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
  });
}
