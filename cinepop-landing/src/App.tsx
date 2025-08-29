import { useEffect, useMemo, useState } from 'react'
import './index.css'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function useCountdown(targetDateIso: string) {
  const targetMs = useMemo(() => new Date(targetDateIso).getTime(), [targetDateIso])
  const [nowMs, setNowMs] = useState<number>(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNowMs(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const diff = Math.max(0, targetMs - nowMs)
  const timeLeft: TimeLeft = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }

  return timeLeft
}

function TimeCell({ value, label }: { value: number; label: string }) {
  const formatted = value.toString().padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-4xl font-semibold tabular-nums">{formatted}</div>
      <div className="text-xs uppercase tracking-widest text-white/70">{label}</div>
    </div>
  )
}

function Countdown({ target }: { target: string }) {
  const { days, hours, minutes, seconds } = useCountdown(target)
  return (
    <div className="inline-flex items-stretch gap-4 rounded-3xl bg-purple-700/40 ring-1 ring-white/10 px-6 py-4 backdrop-blur-sm">
      <TimeCell value={days} label="days" />
      <div className="self-stretch w-px bg-white/10" />
      <TimeCell value={hours} label="hours" />
      <div className="self-stretch w-px bg-white/10" />
      <TimeCell value={minutes} label="minutes" />
      <div className="self-stretch w-px bg-white/10" />
      <TimeCell value={seconds} label="seconds" />
    </div>
  )
}

function App() {
  const target = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 6)
    d.setHours(d.getHours() + 10)
    d.setMinutes(d.getMinutes() + 58)
    d.setSeconds(d.getSeconds() + 30)
    return d.toISOString()
  }, [])

  return (
    <div className="radial-bg min-h-dvh flex items-center justify-center">
      <div className="text-center px-6 py-20 md:py-28">
        <h2 className="font-display text-2xl md:text-4xl tracking-tight text-white/90">
          A BETTER AND BOLDER
        </h2>
        <h1 className="mt-4 font-brand text-6xl md:text-8xl leading-none">CINEPOP!</h1>
        <div className="mt-10">
          <Countdown target={target} />
        </div>
      </div>
    </div>
  )
}

export default App
