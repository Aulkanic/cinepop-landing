import { motion, useReducedMotion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'
import { useEffect, useMemo, useState } from 'react'

type Props = { targetDate: string }

export default function HeroSection({ targetDate }: Props) {
  const prefersReduced = useReducedMotion()
  const [live, setLive] = useState(false)
  const date = useMemo(() => new Date(targetDate), [targetDate])

  useEffect(() => {
    if (date.getTime() <= Date.now()) setLive(true)
  }, [date])

  return (
    <section className="relative z-10 mx-auto flex min-h-[80svh] max-w-5xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <motion.h1
        className="font-display text-6xl leading-none tracking-wider drop-shadow-md md:text-7xl"
        initial={prefersReduced ? false : { opacity: 0, filter: 'brightness(1.4) blur(2px)' }}
        animate={prefersReduced ? undefined : { opacity: 1, filter: 'brightness(1) blur(0px)' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        CINEPOP!
      </motion.h1>

      <p className="max-w-xl text-balance text-white/80">Where Story Meets Sensation</p>

      {!live ? (
        <CountdownTimer targetDate={targetDate} onZero={() => setLive(true)} />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
          <span className="text-lg">We’re Live</span>
        </div>
      )}

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <a
          className="focus-neon rounded-xl bg-[var(--crimson)] px-5 py-3 font-medium shadow-neon transition-colors hover:bg-[var(--rose)]"
          href="/signup"
        >
          Create Account
        </a>
        <a className="focus-neon rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-medium hover:bg-white/15" href="/signin">
          Sign In
        </a>
        <button id="watch-teaser-btn" className="focus-neon rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-medium hover:bg-white/15">
          Watch Teaser
        </button>
      </div>

      <p className="text-sm text-white/60">Premium adult cinema & series. Discreet. Ad‑free.</p>
    </section>
  )
}

