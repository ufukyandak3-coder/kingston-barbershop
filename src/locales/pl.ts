import type { Dictionary } from '../types'

export const pl: Dictionary = {
  nav: {
    book: 'Zarezerwuj',
    services: 'Usługi',
    about: 'O nas',
    reviews: 'Opinie',
    contact: 'Kontakt',
  },
  hero: {
    tagline: 'Najlepszy Barbershop w Krakowie',
    subtitle: 'Sztuka strzyżenia. Perfekcja.',
    cta: 'Zarezerwuj Wizytę',
    location: 'Nowa Huta — Kraków, Polska',
  },
  services: {
    heading: 'Cennik',
    currency: 'PLN',
    items: [
      {
        name: 'Strzyżenie + Stylizacja',
        duration: '30 min',
        price: '90',
        description: 'Profesjonalne strzyżenie dopasowane do Twojego stylu i osobowości',
      },
      {
        name: 'Trymowanie Brody + Stylizacja',
        duration: '30 min',
        price: '70',
        description: 'Stylizacja i pielęgnacja brody przy użyciu najlepszych kosmetyków premium',
      },
      {
        name: 'Combo — Włosy + Broda',
        duration: '60 min',
        price: '150',
        description: 'Kompletna usługa: strzyżenie + broda w atrakcyjnej cenie pakietu',
      },
      {
        name: 'VIP Combo',
        duration: '1h 40min',
        price: '250',
        description: 'Włosy + Broda + Brwi + Nos + Uszy + Maska + SPA',
      },
    ],
  },
  about: {
    heading: 'Kingston',
    label: 'Przestrzeń',
    description:
      'Sanktuarium stylu w sercu Nowej Huty. Gdzie rzemiosło barbera spotyka wyjątkowy świat — bilard, drinki i atmosfera stworzona dla tych, którzy cenią to, co najlepsze.',
    amenities: [
      'Doświadczenie Kingston',
      'Wyselekcjonowany Bar',
      'Strefa Bilardowa',
      'Pielęgnacja Szyta na Miarę',
      'Rytuał Gorącego Ręcznika',
      'Ekskluzywne Kosmetyki',
      'Prywatny Parking',
    ],
    amenityDescriptions: [
      'Ponad 10 lat doskonałego rzemiosła — każda wizyta tworzona specjalnie dla Ciebie. Wyjątkowe barbierstwo, niepowtarzalna atmosfera i standard, którego próżno szukać gdziekolwiek indziej w Krakowie.',
      'Przyjdź, odpocznij, oddaj się chwili. Starannie dobrane alkohole i koktajle sprawiają, że każda chwila w Kingston to przyjemność — jeszcze zanim barber chwyt nożyczki.',
      'Pełnowymiarowy stół bilardowy czeka między wizytami. Bo czas dżentelmena jest zbyt cenny, by go marnować — ma być przeżywany, nie czekany.',
      'Każde strzyżenie zaczyna się od rozmowy. Nasi barberzy czytają Twoją twarz, słuchają Twojej wizji i tworzą efekt szyty dokładnie na miarę — nie szablon, lecz sygnatura.',
      'Znak prawdziwego barbershopu. Parujący ręcznik, golenie do skóry, to wyjątkowe uczucie odnowy — rytuał doskonalony przez pokolenia, wykonywany z pełnym zaangażowaniem.',
      'Tylko najlepsze trafiają na nasze półki. Każdy produkt jest dobierany ręcznie pod kątem jakości i skuteczności, dla dżentelmena, który nie zadowala się mniej niż doskonałością.',
      'Twoja wizyta zaczyna się już przy parkowaniu. Dedykowane miejsce parkingowe gwarantuje bezproblemowy przyjazd — bo doświadczenie Kingston zaczyna się przy drzwiach samochodu.',
    ],
  },
  reviews: {
    heading: 'Opinie Klientów',
    rating: '5.0',
    count: '400+ Opinii Google',
    items: [
      {
        name: 'Marcin K.',
        text: 'Najlepszy barbershop w Krakowie. Przyszedłem po poleceniu kolegi i nie żałuję — fryzura wyszła dokładnie tak jak chciałem.',
      },
      {
        name: 'James W.',
        text: 'Moved to Kraków six months ago and Kingston was the first barbershop I tried. Needless to say, I never looked for another one.',
      },
      {
        name: 'Dawid L.',
        text: 'Profesjonalizm na najwyższym poziomie. Barber słucha, doradza i efekt zawsze powyżej oczekiwań. Stały klient od ponad roku.',
      },
      {
        name: 'Tom H.',
        text: 'Outstanding service. The VIP package is genuinely worth it — proper hot towel, relaxed atmosphere. Real craft, real people.',
      },
      {
        name: 'Marek J.',
        text: 'VIP Combo to absolutny must-have. Masaż, maska, gorący ręcznik — wychodzę stamtąd jak nowy człowiek za każdym razem.',
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
        name: 'Daniel M.',
        text: "Came here on a trip to Kraków and it was the best walk-in decision I've made. Incredible skill, perfect beard trim.",
      },
      {
        name: 'Łukasz S.',
        text: 'Niezmiennie wysoka jakość przy każdej wizycie. Chodzę tu od dwóch lat i nigdy się nie rozczarowałem.',
      },
      {
        name: 'Chris P.',
        text: "Best haircut I've had in Poland. Clean, precise, the barbers actually know what they're doing. The pool table is a brilliant touch.",
      },
    ],
  },
  contact: {
    heading: 'Znajdź Nas',
    address: 'Powstańców 86, 31-670 Kraków',
    district: 'Nowa Huta',
    phone: '+48 510 018 118',
    email: 'info@kingstonbarbershop.pl',
    hours: {
      weekdays: 'Pon – Sob  ·  09:00 – 21:00',
      weekend: 'Ndz  ·  10:00 – 20:00',
    },
    cta: 'Rezerwuj na Booksy',
    follow: 'Obserwuj',
  },
  outro: {
    heading: 'Fotel czeka.',
    sub: 'Nowa Huta · Kraków · Est. 2018',
    cta: 'Zarezerwuj Wizytę',
  },
}
