# Kingston Barbershop — Master Plan

## Aşama 0 — Temizlik (Mevcut Kodu Sıfırla)

- [ ] Mevcut `src/` dizini ve React bağımlılıkları kaldırılır.
- [ ] `package.json` temizlenir; sadece GSAP ve Three.js kalır (CDN veya npm, kararlaştırılacak).
- [ ] `.gitignore`, `README.md` güncellenir.

---

## Aşama 1 — Klasör Kurulumu ve HTML İskeleti

### Oluşturulacak Dosyalar

```
/
├── index.html              ← Tek sayfa giriş noktası, importmap buraya
├── styles/
│   ├── reset.css           ← Modern CSS reset (cascade layer)
│   ├── tokens.css          ← Tüm custom properties (renk, font, spacing)
│   ├── typography.css      ← Display font tanımları
│   └── layout.css          ← Grid sistemi ve section yapısı
├── js/
│   ├── main.js             ← Uygulama başlangıcı, modül orchestrator
│   ├── lenis.js            ← Smooth scroll init
│   └── utils.js            ← Ortak yardımcı fonksiyonlar
├── components/
│   ├── nav/
│   │   ├── nav.html        ← Nav HTML fragment
│   │   ├── nav.js          ← Hover efekti, dil geçişi
│   │   └── nav.css
│   ├── hero/
│   │   ├── hero.js         ← Hero giriş animasyonu (GSAP)
│   │   └── hero.css
│   └── sections/           ← Scroll bölümleri (Aşama 2'de doldurulur)
├── assets/
│   ├── fonts/
│   ├── images/
│   └── models/             ← Three.js için .glb / texture dosyaları
└── project_rules.md
```

**Aşama 1 Tamamlanma Kriteri:**
`index.html` tarayıcıda açılır, nav ve hero placeholder görünür, GSAP import çalışır, konsol hatası yoktur.

---

## Aşama 2 — GSAP Animasyonları

### Oluşturulacak / Güncellenen Dosyalar

```
components/
├── hero/
│   └── hero.js             ← SplitText ile harf harf açılış
├── sections/
│   ├── features-scroll.js  ← ScrollTrigger pinned scroll hikayesi (1→2→3 sırası)
│   ├── features-scroll.css
│   ├── parallax.js         ← "KINGSTON" parallax yazı katmanı
│   └── cta.js              ← Footer CTA staggered reveal
js/
└── scroll-init.js          ← Tüm ScrollTrigger'ları merkezi olarak yöneten dosya
```

**Animasyon Kuralı:**
Her GSAP timeline `paused: true` başlar, ScrollTrigger `onEnter` ile tetiklenir.
Stagger değeri `0.08s` — `0.15s` aralığında tutulur.

**Aşama 2 Tamamlanma Kriteri:**
Scroll yapıldığında öğeler sırasıyla, atlamadan, `cubic-bezier(0.16, 1, 0.3, 1)` eğrisiyle açılır. Mobilde de akıcıdır.

---

## Aşama 3 — Three.js Entegrasyonu

### Oluşturulacak Dosyalar

```
components/
└── three-canvas/
    ├── canvas-init.js      ← Renderer, scene, camera kurulumu
    ├── particles.js        ← Parçacık alanı veya şerit doku (Brutalist aksan)
    ├── scroll-sync.js      ← Three.js kamerasını GSAP ScrollTrigger'a bağlama
    └── canvas.css          ← position: fixed, z-index ve mix-blend-mode
assets/
└── models/                 ← Gerekirse .glb model veya HDR texture
```

**Three.js Kuralları:**
- Canvas her zaman `position: fixed`, HTML içeriği ile `mix-blend-mode` ile entegre.
- Renderer `antialias: true`, pixel ratio `Math.min(window.devicePixelRatio, 2)` ile sınırlı.
- Resize handler `ResizeObserver` ile yapılır, `window.resize` değil.

**Aşama 3 Tamamlanma Kriteri:**
Three.js sahnesi scroll'a bağlı hareket eder, sayfa performansı 60fps'in altına düşmez (DevTools ile kontrol).

---

## Genel Zaman Çizelgesi

| Aşama | Kapsam | Çıktı |
|---|---|---|
| 0 | Temizlik | Temiz repo |
| 1 | İskelet | Çalışan boş sayfa |
| 2 | GSAP | Tam animasyon akışı |
| 3 | Three.js | İmmersive arka plan |

## Doğrulama (Her Aşama Sonrası)

1. Tarayıcı konsolunda hata yok.
2. `project_rules.md` kural listesi elle kontrol edilir.
3. Lighthouse Performance skoru ≥ 85 (Aşama 2 sonrası).
4. Mobil (375px) ve geniş ekran (1920px) test edilir.
