import { useEffect, useMemo, useRef, useState } from 'react'

export type CountdownTimerProps = {
  targetDate: string | Date
  onZero?: () => void
}

export type TimeParts = { days: number; hours: number; minutes: number; seconds: number }

export function computeRemaining(target: number): TimeParts {
  const now = Date.now()
  let delta = Math.max(0, Math.floor((target - now) / 1000))
  const days = Math.floor(delta / 86400); delta -= days * 86400
  const hours = Math.floor(delta / 3600); delta -= hours * 3600
  const minutes = Math.floor(delta / 60); delta -= minutes * 60
  const seconds = delta
  return { days, hours, minutes, seconds }
}

export default function CountdownTimer({ targetDate, onZero }: CountdownTimerProps) {
  const target = useMemo(() => typeof targetDate === 'string' ? new Date(targetDate).getTime() : targetDate.getTime(), [targetDate])
  const [parts, setParts] = useState<TimeParts>(() => computeRemaining(target))
  const [finished, setFinished] = useState(false)
  const lastSecondRef = useRef(parts.seconds)

  useEffect(() => {
    if (finished) return
    const id = setInterval(() => {
      const next = computeRemaining(target)
      setParts(next)
      if (next.days === 0 && next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
        setFinished(true)
        onZero?.()
      }
      const aria = document.getElementById('aria-updates')
      if (aria && next.seconds === 0) {
        aria.textContent = `${next.days} days ${next.hours} hours ${next.minutes} minutes remaining`
      }
      // micro pulse on change (respect reduced motion via media query)
      if (lastSecondRef.current !== next.seconds) {
        const root = document.documentElement
        root.style.setProperty('--pulse-scale', '1.03')
        setTimeout(() => root.style.setProperty('--pulse-scale', '1'), 120)
      }
      lastSecondRef.current = next.seconds
    }, 1000)
    return () => clearInterval(id)
  }, [target, finished, onZero])

  const Digit = ({ label, value }: { label: string; value: number }) => (
    <div className="pulse flex min-w-16 flex-col items-center justify-center rounded-xl bg-white/10 px-3 py-2">
      <div className="font-mono text-2xl tabular-nums">{value.toString().padStart(2, '0')}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  )

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      <Digit label="days" value={parts.days} />
      <span className="text-white/30">:</span>
      <Digit label="hours" value={parts.hours} />
      <span className="text-white/30">:</span>
      <Digit label="minutes" value={parts.minutes} />
      <span className="text-white/30">:</span>
      <Digit label="seconds" value={parts.seconds} />
    </div>
  )
}

