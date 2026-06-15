export const qs  = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

export const lerp  = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
export const map   = (v, iMin, iMax, oMin, oMax) =>
  ((v - iMin) / (iMax - iMin)) * (oMax - oMin) + oMin;
