import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { initLenis }    from './lenis.js';
import { initI18n }     from './i18n.js';
import { initNav }      from '../components/nav/nav.js';
import { initHero }     from '../components/hero/hero.js';
import { initServices } from '../components/sections/services.js';
import { initAbout }    from '../components/sections/about.js';
import { initReviews }  from '../components/sections/reviews.js';
import { initCta }      from '../components/sections/cta.js';

gsap.registerPlugin(ScrollTrigger);

function initReveal() {
  const els = gsap.utils.toArray('[data-reveal]');
  els.forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: (i % 4) * 0.08,
    });
  });
}

function init() {
  const lenis = initLenis();
  lenis.on('scroll', ScrollTrigger.update);

  initI18n();
  initNav();
  initHero();
  initServices();
  initAbout();
  initReviews();
  initCta();
  initReveal();

  ScrollTrigger.refresh();
}

document.addEventListener('DOMContentLoaded', init);
