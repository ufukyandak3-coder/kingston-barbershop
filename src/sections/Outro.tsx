import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Scissors } from 'lucide-react'
import * as THREE from 'three'
import { useLanguage } from '../context/LanguageContext'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { AnimatedDock } from '../components/ui/AnimatedDock'
import { ErrorBoundary } from '../components/ErrorBoundary'

const BOOKSY_URL = 'https://booksy.com/pl-pl/189127_kingston-barbershop_barber-shop_8820_krakow'
const INSTAGRAM_URL = 'https://www.instagram.com/kingstonbarbershop.pl'
const FACEBOOK_URL = 'https://www.facebook.com/KingstonBarbershoppl'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SOCIALS = [
  { href: INSTAGRAM_URL,  Icon: Instagram, label: 'Instagram' },
  { href: FACEBOOK_URL,   Icon: Facebook,  label: 'Facebook'  },
  { href: BOOKSY_URL,     Icon: Scissors,  label: 'Booksy'    },
]

interface ChairProps {
  targetRotY: React.MutableRefObject<number>
  targetRotX: React.MutableRefObject<number>
}

function BarberChair({ targetRotY, targetRotX }: ChairProps) {
  const { scene } = useGLTF('/barber_chair.glb')
  const chairRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!chairRef.current) return
    chairRef.current.rotation.y +=
      (targetRotY.current - chairRef.current.rotation.y) * 0.08
    chairRef.current.rotation.x +=
      (targetRotX.current - chairRef.current.rotation.x) * 0.08
  })

  return (
    <primitive
      ref={chairRef}
      object={scene}
      scale={1.45}
      position={[0, -0.45, 0]}
    />
  )
}

function ChairCanvas({
  targetRotY,
  targetRotX,
}: ChairProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.0, 5.8], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.9} color="#F5F1E5" />
      <directionalLight position={[6, 9, 6]}  intensity={1.6} />
      <directionalLight position={[-4, 3, -4]} intensity={0.45} color="#C4A882" />
      <Suspense fallback={null}>
        <BarberChair targetRotY={targetRotY} targetRotX={targetRotX} />
        <ContactShadows
          position={[0, -0.47, 0]}
          opacity={0.14}
          scale={12}
          blur={3.5}
          far={4}
          color="#1A1612"
        />
      </Suspense>
      <Environment preset="studio" />
    </Canvas>
  )
}

export function Outro() {
  const { t } = useLanguage()

  const targetRotY = useRef(0.22)
  const targetRotX = useRef(0.04)

  // Section-level mouse listener → chair responds across the full section
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, width, top, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left - width  / 2) / (width  / 2)
    const y = (e.clientY - top  - height / 2) / (height / 2)
    targetRotY.current = x * Math.PI * 0.50
    targetRotX.current = y * 0.14 + 0.04
  }

  const handleMouseLeave = () => {
    targetRotY.current = 0.22
    targetRotX.current = 0.04
  }

  return (
    <section
      id="outro"
      className="relative min-h-screen flex flex-col bg-paper-soft overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative parallax blob — background moves slower than text */}
      <Parallax speed={-0.08} className="absolute inset-0 pointer-events-none -z-0">
        <div className="absolute top-1/4 right-[-10%] w-[55vw] h-[55vw] rounded-full bg-paper-deep/60 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-8%] w-[40vw] h-[40vw] rounded-full bg-paper-deep/40 blur-3xl" />
      </Parallax>

      <div className="relative z-10 flex-1 max-w-screen-xl mx-auto px-8 lg:px-20 w-full flex flex-col lg:flex-row items-center py-48 lg:py-0">

        {/* ── Left: text + socials ── */}
        <div className="lg:w-[48%] flex flex-col justify-center gap-10 lg:h-screen">

          <Reveal distance={35}>
            <p className="text-ink-soft text-[10px] tracking-[0.5em] uppercase">
              05 — Kingston
            </p>
          </Reveal>

          <Parallax speed={0.16}>
            <Reveal distance={90} plateau="extra-wide">
              <h2 className="font-display text-[clamp(3.5rem,9vw,9.5rem)] leading-[0.88] text-ink">
                {t.outro.heading}
              </h2>
            </Reveal>
          </Parallax>

          <Reveal distance={50} plateau="wide">
            <p className="text-ink/80 text-[11px] tracking-[0.4em] uppercase font-medium">
              {t.outro.sub}
            </p>
          </Reveal>

          <Reveal distance={45} plateau="narrow">
            <motion.a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.5, ease }}
              className="inline-block border border-ink/50 text-ink font-medium text-[10px] tracking-[0.4em] uppercase px-10 py-5 hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-600 w-fit"
            >
              {t.outro.cta}
            </motion.a>
          </Reveal>

          {/* Social icons — animated dock */}
          <Reveal distance={35} plateau="narrow">
            <div className="flex flex-col gap-3 pt-6 border-t border-ink/10">
              <span className="text-ink/75 text-[10px] tracking-[0.45em] uppercase font-medium">
                {t.contact.follow}
              </span>
              <AnimatedDock
                items={SOCIALS.map(({ href, Icon, label }) => ({
                  href,
                  label,
                  target: '_blank',
                  icon: <Icon size={21} strokeWidth={1.7} />,
                }))}
              />
            </div>
          </Reveal>

        </div>

        {/* ── Right: 3D chair (canvas pointer-events intact, no cursor-none) ── */}
        <div className="lg:w-[52%] h-[65vh] lg:h-screen flex-shrink-0">
          <ErrorBoundary fallback={null}>
            <ChairCanvas targetRotY={targetRotY} targetRotX={targetRotX} />
          </ErrorBoundary>
        </div>

      </div>

      {/* Bottom bar */}
      <Reveal distance={20} plateau="narrow">
        <div className="relative z-10 max-w-screen-xl mx-auto px-8 lg:px-20 w-full pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span className="font-display text-ink/20 text-sm tracking-[0.3em] uppercase">
            Kingston
          </span>
          <span className="text-ink/20 text-[9px] tracking-[0.35em] uppercase">
            © {new Date().getFullYear()} Kingston Barbershop · Wszelkie prawa zastrzeżone
          </span>
        </div>
      </Reveal>
    </section>
  )
}
