import Lenis from 'lenis';
import gsap from 'gsap';

let instance = null;

export function initLenis() {
  instance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  gsap.ticker.add((time) => instance.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return instance;
}

export const getLenis = () => instance;
