import { useId, useState } from 'react'
import { subscribe } from '../lib/notify'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function EmailCapture() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!isValidEmail(email)) { setError('Enter a valid email'); return }
    if (!consent) { setError('Please agree to receive updates'); return }
    if (status === 'loading' || status === 'success') return
    setStatus('loading')
    const res = await subscribe(email)
    if (res.success) setStatus('success')
    else { setStatus('error'); setError(res.message) }
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16 text-center">
      <h3 className="mb-4 font-display text-3xl">Join the List</h3>
      <p className="mb-6 text-white/80">Be first to know when new titles drop.</p>
      <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor={`${id}-email`} className="sr-only">Email</label>
          <input id={`${id}-email`} name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                 className="focus-neon flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/40" placeholder="you@example.com" />
          <button type="submit" disabled={status==='loading' || status==='success'} className="focus-neon rounded-xl bg-[var(--crimson)] px-5 py-3 font-medium shadow-neon transition-colors hover:bg-[var(--rose)] disabled:opacity-60">
            {status==='success' ? 'Subscribed' : status==='loading' ? 'Submitting…' : 'Sign Up'}
          </button>
        </div>
        <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-left text-sm text-white/75">
          <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-black/60" />
          I agree to receive updates from CinePOP.
        </label>
        {error && <div role="alert" className="mt-2 text-sm text-rose-300">{error}</div>}
      </form>
    </section>
  )
}

export { isValidEmail }

