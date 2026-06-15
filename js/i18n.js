import { translations } from './data.js';

let currentLang = 'pl';

export function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t[el.getAttribute('data-i18n')];
    if (val !== undefined) el.textContent = val;
  });
}

export function initI18n() {
  applyTranslations(currentLang);

  const btn = document.querySelector('[data-lang-toggle]');
  if (!btn) return;

  btn.addEventListener('click', () => {
    currentLang = currentLang === 'pl' ? 'en' : 'pl';
    btn.textContent = currentLang === 'pl' ? 'EN' : 'PL';
    applyTranslations(currentLang);
  });
}
