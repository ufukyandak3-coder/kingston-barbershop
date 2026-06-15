import { useState } from 'react'

interface ReviewItem {
  name: string
  text: string
}

interface TestimonialCardsProps {
  items: ReviewItem[]
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

const STACK_BASE = [
  // Card 0 — back, most desaturated
  '[grid-area:stack] hover:-translate-y-6 ' +
  'before:absolute before:inset-0 before:rounded-2xl before:content-[\'\'] ' +
  'before:bg-paper/55 before:transition-opacity before:duration-500 ' +
  'grayscale-[100%] hover:before:opacity-0 hover:grayscale-0',

  // Card 1 — middle
  '[grid-area:stack] translate-x-10 sm:translate-x-16 translate-y-4 sm:translate-y-7 hover:-translate-y-1 ' +
  'before:absolute before:inset-0 before:rounded-2xl before:content-[\'\'] ' +
  'before:bg-paper/35 before:transition-opacity before:duration-500 ' +
  'grayscale-[50%] hover:before:opacity-0 hover:grayscale-0',

  // Card 2 — front, fully saturated
  '[grid-area:stack] translate-x-20 sm:translate-x-32 translate-y-8 sm:translate-y-14',
]

function getSpreadClass(cardIndex: number, focusedIndex: number | null, base: string) {
  if (focusedIndex === 0 && cardIndex === 1)
    return base + ' !translate-y-20 sm:!translate-y-28 !translate-x-14 sm:!translate-x-20'
  if (focusedIndex === 0 && cardIndex === 2)
    return base + ' !translate-y-28 sm:!translate-y-44 !translate-x-22 sm:!translate-x-36'
  if (focusedIndex === 1 && cardIndex === 2)
    return base + ' !translate-y-20 sm:!translate-y-36 !translate-x-22 sm:!translate-x-36'
  return base
}

function ReviewCard({
  item,
  stackClass,
  onMouseEnter,
  onMouseLeave,
}: {
  item: ReviewItem
  stackClass: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col h-auto min-h-[170px] w-[270px] sm:w-[360px]',
        '-skew-y-[8deg] select-none rounded-2xl',
        'border border-ink/10 bg-paper-soft',
        'px-5 py-5 transition-all duration-500 ease-in-out cursor-default',
        stackClass
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center shrink-0">
          <span className="text-paper-soft text-xs font-light tracking-widest">
            {initials(item.name)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-ink text-sm font-light tracking-wide truncate">{item.name}</p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-gold text-[11px]">★</span>
            ))}
          </div>
        </div>
        <span className="font-display text-5xl text-gold/25 leading-none -mt-2 shrink-0">"</span>
      </div>

      {/* Review text */}
      <p className="text-ink/65 text-xs sm:text-sm leading-relaxed font-light tracking-wide line-clamp-4 flex-1">
        {item.text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink/8">
        <span className="text-ink-soft text-[9px] tracking-[0.4em] uppercase">
          Google Reviews
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-gold/50 text-[9px]">★</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TestimonialCards({ items }: TestimonialCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const displayed = items.slice(0, 3)

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-start pb-32 sm:pb-40">
      {displayed.map((item, i) => (
        <ReviewCard
          key={i}
          item={item}
          stackClass={getSpreadClass(i, hovered, STACK_BASE[i] ?? '')}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}
    </div>
  )
}
