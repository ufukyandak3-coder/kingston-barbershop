import { useState } from 'react'
import { motion } from 'framer-motion'

interface Transform {
  x: number
  y: number
  rotationZ: number
}

// Extended to 28 entries — covers phone + email lengths
const TRANSFORMS: Transform[] = [
  { x: -0.8, y: -0.6, rotationZ: -29 },
  { x: -0.2, y: -0.4, rotationZ: -6  },
  { x: -0.05, y: 0.1, rotationZ: 12  },
  { x: -0.05, y: -0.1, rotationZ: -9 },
  { x: -0.1, y: 0.55, rotationZ: 3   },
  { x: 0,    y: -0.1, rotationZ: 9   },
  { x: 0,    y: 0.15, rotationZ: -12 },
  { x: 0,    y: 0.15, rotationZ: -17 },
  { x: 0,    y: -0.65, rotationZ: 9  },
  { x: 0.1,  y: 0.4,  rotationZ: 12  },
  { x: 0,    y: -0.15, rotationZ: -9 },
  { x: 0.2,  y: 0.15, rotationZ: 12  },
  { x: 0.8,  y: 0.6,  rotationZ: 20  },
  { x: -0.4, y: 0.3,  rotationZ: -15 },
  { x: 0.3,  y: -0.5, rotationZ: 18  },
  { x: -0.6, y: 0.2,  rotationZ: -22 },
  { x: 0.5,  y: 0.4,  rotationZ: 8   },
  { x: -0.3, y: -0.3, rotationZ: 25  },
  { x: 0.1,  y: 0.6,  rotationZ: -7  },
  { x: -0.2, y: 0.5,  rotationZ: 14  },
  { x: 0.4,  y: -0.2, rotationZ: -19 },
  { x: -0.1, y: -0.4, rotationZ: 11  },
  { x: 0.6,  y: 0.1,  rotationZ: -24 },
  { x: -0.5, y: 0.7,  rotationZ: 16  },
  { x: 0.2,  y: -0.6, rotationZ: -13 },
  { x: -0.7, y: -0.2, rotationZ: 21  },
  { x: 0.3,  y: 0.5,  rotationZ: -10 },
  { x: -0.3, y: -0.7, rotationZ: 17  },
]

const charVariants = {
  open: (i: number) => {
    const t = TRANSFORMS[i % TRANSFORMS.length]
    return {
      x: `${t.x}em`,
      y: `${t.y}em`,
      rotateZ: t.rotationZ,
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
      zIndex: 1,
    }
  },
  closed: {
    x: 0,
    y: 0,
    rotateZ: 0,
    transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
    zIndex: 0,
  },
}

interface TextDisperseProps {
  children: string
  className?: string
  onHover?: (active: boolean) => void
}

export function TextDisperse({ children, className = '', onHover }: TextDisperseProps) {
  const [active, setActive] = useState(false)

  const enter = () => { setActive(true);  onHover?.(true)  }
  const leave = () => { setActive(false); onHover?.(false) }

  return (
    <span
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {children.split('').map((char, i) => (
        <motion.span
          key={char + i}
          custom={i}
          variants={charVariants}
          animate={active ? 'open' : 'closed'}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}
