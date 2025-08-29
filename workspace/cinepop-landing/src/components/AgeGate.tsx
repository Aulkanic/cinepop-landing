import { useEffect, useRef, useState } from 'react'
import { isAgeConfirmed, setAgeConfirmed } from '../lib/age-gate'

type Props = { onConfirmed: () => void }

export default function AgeGate({ onConfirmed }: Props) {
  const [open, setOpen] = useState(!isAgeConfirmed())
  const firstButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (open) firstButtonRef.current?.focus()
  }, [open])

  if (!open) return null

  const confirm = () => {
    setAgeConfirmed(true)
    setOpen(false)
    onConfirmed()
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="age-title" className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-xl">
        <h2 id="age-title" className="mb-3 font-display text-3xl tracking-wide">Age Confirmation</h2>
        <p className="text-sm text-white/80">This site contains adult content. You must be 18+ to continue.</p>
        <div className="mt-6 flex gap-3">
          <button ref={firstButtonRef} onClick={confirm} className="focus-neon flex-1 rounded-xl bg-[var(--crimson)] px-5 py-3 font-medium shadow-neon transition-colors hover:bg-[var(--rose)]">
            I'm 18+
          </button>
          <a href="https://www.google.com" className="focus-neon flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-center font-medium hover:bg-white/15">
            Leave
          </a>
        </div>
      </div>
    </div>
  )
}

