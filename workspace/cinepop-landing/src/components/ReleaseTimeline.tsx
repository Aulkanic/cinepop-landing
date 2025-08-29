import { useEffect, useState } from 'react'
import { generateIcs } from '../lib/calendar'

type Item = {
  id: string
  title: string
  date: string
  blurb: string
}

const STORAGE_KEY = 'cinepop.reminders'

function loadReminders(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveReminders(map: Record<string, boolean>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)) } catch {}
}

export default function ReleaseTimeline() {
  const [items, setItems] = useState<Item[]>([])
  const [reminders, setReminders] = useState<Record<string, boolean>>(() => loadReminders())

  useEffect(() => {
    fetch('/mocks/releases.json').then(r => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  const toggleRemind = (item: Item) => {
    const next = { ...reminders, [item.id]: !reminders[item.id] }
    setReminders(next)
    saveReminders(next)
    if (next[item.id]) {
      const ics = generateIcs({ title: item.title, description: item.blurb, startUtcISO: new Date(item.date).toISOString() })
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${item.title.replace(/\s+/g, '-')}.ics`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h3 className="mb-6 font-display text-3xl">Release Schedule</h3>
      <ol className="space-y-4">
        {items.map((it) => (
          <li key={it.id} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-white/70">{new Date(it.date).toLocaleString()}</div>
              <p className="mt-1 text-sm text-white/80">{it.blurb}</p>
            </div>
            <button onClick={() => toggleRemind(it)} className={`focus-neon h-9 rounded-full px-3 text-sm ${reminders[it.id] ? 'bg-[var(--crimson)]' : 'bg-white/10'} hover:bg-white/15`}>
              {reminders[it.id] ? 'Added' : 'Remind me'}
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}

