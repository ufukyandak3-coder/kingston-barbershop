# Kingston Barbershop — Master Anayasa v2 (React + Framer)

## Teknoloji Yığını

| İzin Verilen | KESİNLİKLE YASAK |
|---|---|
| React 19 + TypeScript | Vanilla JS bileşenleri |
| Vite (build tool) | Create React App |
| Tailwind CSS v3 | Sıradan CSS dosyaları (global) |
| Framer Motion v11 | GSAP / Lenis |
| lucide-react (ikonlar) | jQuery / Bootstrap |

## Estetik Vizyon

**Ton:** Karanlık tema, sinematik, premium  
**Referans:** Prisma konsepti — gürültü (noise) efektleri, karakterli tipografi  
**Fontlar:** Almarai + Instrument Serif (Google Fonts veya local)

**KESİNLİKLE YASAK:**
- Açık arka planlı (beyaz/gri) tasarım
- Arial, Inter, Roboto, system-ui
- Klişe mor gradyanlar
- Jenerik AI arayüzü görünümü

## Mimari Kurallar

- Her UI bileşeni `src/components/` altında kendi `.tsx` dosyasında
- Sayfa bölümleri `src/sections/` altında
- Stiller Tailwind utility sınıflarıyla; tekrar eden desenler `@apply` ile
- Tip tanımları `src/types/` altında
- Hiçbir dosya 200 satırı geçmez; geçerse böl

## Animasyon Felsefesi (Framer Motion)

- Sayfa yüklenince hero animate eder (`initial → animate`)
- Scroll reveal: `whileInView` + `viewport={{ once: true }}`
- Easing: `[0.16, 1, 0.3, 1]` (Apple standard)
- Stagger: `staggerChildren` ile kademeli açılma
- Hover: `whileHover` ile ince scale/opacity değişimi

## Kalite Kontrol

Her bileşen yazıldıktan sonra:
1. TypeScript hatası var mı? → Gider.
2. Dosya 200 satırı geçiyor mu? → Böl.
3. `any` tipi kullanıldı mı? → Düzelt.
