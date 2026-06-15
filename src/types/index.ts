export type Language = 'en' | 'pl'

export interface ServiceItem {
  name: string
  duration: string
  price: string
  description: string
}

export interface ReviewItem {
  name: string
  text: string
}

export interface Dictionary {
  nav: {
    book: string
    services: string
    about: string
    reviews: string
    contact: string
  }
  hero: {
    tagline: string
    subtitle: string
    cta: string
    location: string
  }
  services: {
    heading: string
    currency: string
    items: ServiceItem[]
  }
  about: {
    heading: string
    label: string
    description: string
    amenities: string[]
    amenityDescriptions: string[]
  }
  reviews: {
    heading: string
    rating: string
    count: string
    items: ReviewItem[]
  }
  contact: {
    heading: string
    address: string
    district: string
    phone: string
    email: string
    hours: {
      weekdays: string
      weekend: string
    }
    cta: string
    follow: string
  }
  outro: {
    heading: string
    sub: string
    cta: string
  }
}
