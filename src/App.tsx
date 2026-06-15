import { LanguageProvider } from './context/LanguageContext'
import { NoiseOverlay } from './components/NoiseOverlay'
import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { About } from './sections/About'
import { ReviewsContactStack } from './components/ContactReveal'
import { Outro } from './sections/Outro'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useLenis } from './hooks/useLenis'

function AppFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-paper px-8 text-center">
      <p className="font-display text-ink text-4xl">Kingston Barbershop</p>
      <p className="text-ink-muted text-[11px] tracking-[0.4em] uppercase">
        Powstańców 86 · Nowa Huta · Kraków
      </p>
      <a
        href="https://booksy.com/pl-pl/189127_kingston-barbershop_barber-shop_8820_krakow"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 border border-ink/40 text-ink text-[10px] tracking-[0.4em] uppercase px-10 py-5 hover:bg-ink hover:text-paper transition-colors duration-500"
      >
        Zarezerwuj
      </a>
    </div>
  )
}

function AppInner() {
  useLenis()
  return (
    <>
      <NoiseOverlay />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <ReviewsContactStack />
        <Outro />
      </main>
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary fallback={<AppFallback />}>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ErrorBoundary>
  )
}
