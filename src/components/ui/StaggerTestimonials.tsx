"use client"

import React, { useState, useEffect } from 'react'

const SQRT_5000 = Math.sqrt(5000)

interface ReviewItem {
  name: string
  text: string
  tempId: number
}

interface CardProps {
  position: number
  item: ReviewItem
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<CardProps> = ({ position, item, handleMove, cardSize }) => {
  const isCenter = position === 0
  const absPos = Math.abs(position)

  const initials = item.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      onClick={() => handleMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
      style={{
        width: cardSize,
        height: cardSize,
        zIndex: isCenter ? 10 : Math.max(1, 6 - absPos),
        background: isCenter
          ? 'rgba(239,234,217,0.96)'
          : 'rgba(255,255,255,0.025)',
        border: isCenter
          ? '1px solid rgba(239,234,217,0.15)'
          : '1px solid rgba(255,255,255,0.07)',
        clipPath:
          'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.4) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 12px 0px 4px rgba(0,0,0,0.35)'
          : 'none',
        padding: '2.5rem',
      }}
    >
      {/* Diagonal cut line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1.5,
          background: isCenter
            ? 'rgba(26,22,18,0.12)'
            : 'rgba(255,255,255,0.07)',
        }}
      />

      {/* Avatar */}
      <div
        className="mb-6 h-12 w-10 flex items-center justify-center"
        style={{
          background: isCenter
            ? 'rgba(26,22,18,0.08)'
            : 'rgba(201,185,122,0.10)',
          border: isCenter
            ? '1px solid rgba(26,22,18,0.12)'
            : '1px solid rgba(201,185,122,0.20)',
          boxShadow: isCenter
            ? '3px 3px 0px rgba(26,22,18,0.06)'
            : '3px 3px 0px rgba(0,0,0,0.25)',
        }}
      >
        <span
          className="text-[8px] tracking-[0.28em] font-light"
          style={{
            color: isCenter ? 'rgba(26,22,18,0.55)' : 'rgba(201,185,122,0.65)',
          }}
        >
          {initials}
        </span>
      </div>

      {/* Quote */}
      <p
        className="font-display font-light italic leading-snug text-base sm:text-lg"
        style={{
          color: isCenter ? 'rgba(26,22,18,0.88)' : 'rgba(239,234,217,0.65)',
        }}
      >
        "{item.text}"
      </p>

      {/* Author */}
      <p
        className="absolute bottom-8 left-10 right-8 text-[8px] tracking-[0.5em] uppercase font-light"
        style={{
          color: isCenter ? 'rgba(26,22,18,0.40)' : 'rgba(239,234,217,0.28)',
        }}
      >
        — {item.name}
      </p>
    </div>
  )
}

interface StaggerTestimonialsProps {
  items: { name: string; text: string }[]
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ items }) => {
  const [cardSize, setCardSize] = useState(365)
  const [list, setList] = useState<ReviewItem[]>(() =>
    items.map((item, i) => ({ ...item, tempId: i })),
  )

  const handleMove = (steps: number) => {
    const next = [...list]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift()
        if (!item) return
        next.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop()
        if (!item) return
        next.unshift({ ...item, tempId: Math.random() })
      }
    }
    setList(next)
  }

  useEffect(() => {
    const update = () => {
      setCardSize(window.matchMedia('(min-width: 640px)').matches ? 365 : 290)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      className="relative w-screen overflow-hidden"
      style={{ height: 600, left: '50%', transform: 'translateX(-50%)' }}
    >
      {list.map((item, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2
        return (
          <TestimonialCard
            key={item.tempId}
            item={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}

    </div>
  )
}
