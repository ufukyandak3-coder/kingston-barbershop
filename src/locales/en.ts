import type { Dictionary } from '../types'

export const en: Dictionary = {
  nav: {
    book: 'Book Now',
    services: 'Services',
    about: 'About',
    reviews: 'Reviews',
    contact: 'Contact',
  },
  hero: {
    tagline: "Kraków's Premier Barbershop",
    subtitle: 'The art of the cut. Refined.',
    cta: 'Reserve Your Session',
    location: 'Nowa Huta — Kraków, Poland',
  },
  services: {
    heading: 'The Menu',
    currency: 'PLN',
    items: [
      {
        name: 'Haircut & Styling',
        duration: '30 min',
        price: '90',
        description: 'Professional haircut tailored to your style and personality',
      },
      {
        name: 'Beard Trim & Styling',
        duration: '30 min',
        price: '70',
        description: 'Beard styling and grooming using the finest premium cosmetics',
      },
      {
        name: 'Combo — Hair & Beard',
        duration: '60 min',
        price: '150',
        description: 'Complete service: haircut + beard at an attractive package price',
      },
      {
        name: 'VIP Combo',
        duration: '1h 40min',
        price: '250',
        description: 'Hair + Beard + Eyebrows + Nose + Ears + Mask + SPA',
      },
    ],
  },
  about: {
    heading: 'Kingston',
    label: 'The Space',
    description:
      'A sanctuary of style in the heart of Nowa Huta. Where the craft of barbering meets a world of its own — billiards, drinks, and an atmosphere built for those who appreciate the finer things.',
    amenities: [
      'The Kingston Experience',
      'Complimentary Bar',
      'Billiards Lounge',
      'Bespoke Grooming',
      'Hot Towel Ritual',
      'Premium Products',
      'Private Parking',
    ],
    amenityDescriptions: [
      'Over a decade of devoted craft — each visit is shaped around you. Exceptional barbering, rare atmosphere, and a standard that simply cannot be found elsewhere in Kraków.',
      'Arrive, unwind, indulge. A curated selection of fine spirits and handcrafted cocktails ensures every moment at Kingston is one worth savouring — long before the cut begins.',
      "A full-size billiards table, waiting between appointments. Because a gentleman's time is too valuable to be spent waiting — it is spent living.",
      'Every cut begins with a conversation. Our barbers read your face, listen to your vision, and craft a result tailored precisely to who you are — not a template, but a signature.',
      'The mark of a true barbershop. A steaming towel, a blade-close shave, that singular feeling of renewal — a ritual refined over generations, delivered with intention.',
      'Only the finest reach our shelves. Each product is handpicked for performance, quality, and the discerning gentleman who expects nothing less than the best.',
      'Your visit begins the moment you park. Dedicated private parking ensures a seamless arrival — because the Kingston experience starts at your car door.',
    ],
  },
  reviews: {
    heading: 'What They Say',
    rating: '5.0',
    count: '400+ Google Reviews',
    items: [
      {
        name: 'James W.',
        text: 'Moved to Kraków six months ago and Kingston was the first barbershop I tried. Needless to say, I never looked for another one.',
      },
      {
        name: 'Marcin K.',
        text: 'Najlepszy barbershop w Krakowie. Przyszedłem po poleceniu kolegi i nie żałuję — fryzura wyszła dokładnie tak jak chciałem.',
      },
      {
        name: 'Daniel M.',
        text: "Came here on a trip to Kraków and it was the best walk-in decision I've made. Incredible skill, perfect beard trim. Will be back.",
      },
      {
        name: 'Łukasz S.',
        text: 'Niezmiennie wysoka jakość przy każdej wizycie. Chodzę tu od dwóch lat i nigdy się nie rozczarowałem.',
      },
      {
        name: 'Tom H.',
        text: 'Outstanding service. The VIP package is genuinely worth it — proper hot towel, relaxed atmosphere. Real craft, real people.',
      },
      {
        name: 'Dawid L.',
        text: 'Profesjonalizm na najwyższym poziomie. Barber słucha, doradza i efekt zawsze powyżej oczekiwań. Stały klient od ponad roku.',
      },
      {
        name: 'Marco R.',
        text: 'Found Kingston on Google — the 5 stars are completely deserved. Professional, friendly, and the attention to detail is exceptional.',
      },
      {
        name: 'Piotr N.',
        text: 'Rewelacja! Można pograć w bilarda podczas czekania, atmosfera super męska. Obsługa zna się na rzeczy — polecam każdemu facetowi.',
      },
      {
        name: 'Chris P.',
        text: "Best haircut I've had in Poland. Clean, precise, the barbers actually know what they're doing. The pool table is a brilliant touch.",
      },
      {
        name: 'Marek J.',
        text: 'VIP Combo to absolutny must-have. Masaż, maska, gorący ręcznik — wychodzę stamtąd jak nowy człowiek za każdym razem.',
      },
    ],
  },
  contact: {
    heading: 'Find Us',
    address: 'Powstańców 86, 31-670 Kraków',
    district: 'Nowa Huta',
    phone: '+48 510 018 118',
    email: 'info@kingstonbarbershop.pl',
    hours: {
      weekdays: 'Mon – Sat  ·  09:00 – 21:00',
      weekend: 'Sun  ·  10:00 – 20:00',
    },
    cta: 'Book on Booksy',
    follow: 'Follow',
  },
  outro: {
    heading: 'The chair awaits.',
    sub: 'Nowa Huta · Kraków · Est. 2018',
    cta: 'Reserve Your Session',
  },
}
