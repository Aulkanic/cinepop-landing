import './App.css'
import AgeGate from './components/AgeGate'
import HeroSection from './components/HeroSection'
import FeatureCard from './components/FeatureCard'
import ReleaseTimeline from './components/ReleaseTimeline'
import EmailCapture from './components/EmailCapture'
import TeaserModal from './components/TeaserModal'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'

function App() {
  const [ageOk, setAgeOk] = useState(false)
  const [teaserOpen, setTeaserOpen] = useState(false)
  useEffect(() => {
    const btn = () => {
      const b = document.getElementById('watch-teaser-btn')
      b?.addEventListener('click', () => setTeaserOpen(true))
    }
    const id = setTimeout(btn, 0)
    return () => clearTimeout(id)
  }, [])

  const target = import.meta.env.VITE_TARGET_DATE || new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()

  return (
    <main className="grain vignette min-h-screen bg-[var(--ink)] text-white antialiased">
      <div className="sr-only" aria-live="polite" id="aria-updates" />
      {!ageOk && <AgeGate onConfirmed={() => setAgeOk(true)} />}
      {ageOk && (
        <>
          <HeroSection targetDate={target} />

          <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 pb-10 sm:grid-cols-2 md:grid-cols-4">
            <FeatureCard title="Premium Originals" description="Exclusives shot with cinematic craft." />
            <FeatureCard title="Ad‑Free HD" description="Pure stories. No interruptions." />
            <FeatureCard title="Private Watchlists" description="Your queue, only for you." />
            <FeatureCard title="Mobile Apps" description="Watch anywhere, anytime." />
          </section>

          <ReleaseTimeline />
          <EmailCapture />

          <Footer />
        </>
      )}

      <TeaserModal open={teaserOpen} onClose={() => setTeaserOpen(false)} />
    </main>
  )
}

export default App
