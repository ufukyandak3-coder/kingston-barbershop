import { qs } from '../../js/utils.js';

export function initNav() {
  const nav = qs('#nav');
  let lastY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle('nav--hidden', y > lastY && y > 80);
      lastY = y;
      ticking = false;
    });
    ticking = true;
  });
}
