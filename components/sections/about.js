import gsap from 'gsap';
import { qs, qsa } from '../../js/utils.js';

export function initAbout() {
  const label    = qs('.about__label');
  const title    = qs('.about__title');
  const text     = qs('.about__text');
  const media    = qs('.about__media');
  const textEls  = [label, title, text];

  gsap.set(textEls, { opacity: 0, y: 50 });
  gsap.set(media, { opacity: 0, y: 90 });

  // Text column: scrub fade-in as section approaches center
  gsap.fromTo(textEls,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, ease: 'none', stagger: 0.16,
      scrollTrigger: {
        trigger: '.about', start: 'top 82%', end: 'top 28%', scrub: 1.2,
      },
    }
  );

  // Text column: scrub fade-out as section exits top
  gsap.to(textEls, {
    opacity: 0, y: -30, ease: 'none', stagger: 0.08,
    scrollTrigger: {
      trigger: '.about', start: 'bottom 52%', end: 'bottom 10%', scrub: 1,
    },
  });

  // Media: slower scrub reveal for depth contrast vs text
  gsap.fromTo(media,
    { opacity: 0, y: 90 },
    {
      opacity: 1, y: 0, ease: 'none',
      scrollTrigger: {
        trigger: '.about__media', start: 'top 90%', end: 'top 38%', scrub: 1.5,
      },
    }
  );

  // Deep parallax: media drifts at different speed than text column
  gsap.to(media, {
    yPercent: -6, ease: 'none',
    scrollTrigger: {
      trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1,
    },
  });
}
