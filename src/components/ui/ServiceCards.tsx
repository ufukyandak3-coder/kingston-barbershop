import { useState } from 'react'

interface ServiceCardData {
  name: string
  duration: string
  price: string
  image: string
}

interface ServiceCardsProps {
  items: ServiceCardData[]
  currency: string
}

export function ServiceCards({ items, currency }: ServiceCardsProps) {
  const [expanded, setExpanded] = useState(0)

  return (
    <>
      {/* Desktop: horizontal expand */}
      <div className="hidden lg:flex gap-2 w-full" style={{ height: '32rem' }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="relative cursor-pointer overflow-hidden rounded-2xl border border-ink/10 transition-all duration-500 ease-in-out flex-shrink-0"
            style={{ width: expanded === i ? '24rem' : '5rem' }}
            onMouseEnter={() => setExpanded(i)}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: expanded === i ? 'scale(1.04)' : 'scale(1.1)' }}
              src={item.image}
              alt={item.name}
              loading="lazy"
            />

            {/* Dark gradient always present */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

            {/* Index number — visible when collapsed */}
            <div
              className="absolute top-5 left-0 right-0 flex justify-center transition-opacity duration-300"
              style={{ opacity: expanded === i ? 0 : 1 }}
            >
              <span className="font-display text-paper-soft/60 text-lg">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Info overlay — visible when expanded */}
            <div
              className="absolute bottom-0 left-0 right-0 p-7 transition-opacity duration-300"
              style={{ opacity: expanded === i ? 1 : 0 }}
            >
              <p className="text-paper-soft/60 text-[10px] tracking-[0.45em] uppercase mb-2">
                {item.duration}
              </p>
              <h3 className="font-display text-paper-soft text-xl leading-snug mb-3">
                {item.name}
              </h3>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-paper-soft text-4xl leading-none">
                  {item.price}
                </span>
                <span className="text-paper-soft/50 text-xs tracking-widest">{currency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-4 lg:hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-ink/10"
            style={{ height: '18rem' }}
          >
            <img
              className="w-full h-full object-cover"
              src={item.image}
              alt={item.name}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-paper-soft/60 text-[10px] tracking-[0.45em] uppercase mb-1.5">
                {item.duration}
              </p>
              <h3 className="font-display text-paper-soft text-xl mb-2">{item.name}</h3>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-paper-soft text-3xl">{item.price}</span>
                <span className="text-paper-soft/50 text-xs tracking-widest">{currency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
