import { useEffect } from 'react'

type Props = { open: boolean; onClose: () => void }

export default function TeaserModal({ open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label="Watch teaser" className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur">
      <div className="mx-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div className="aspect-video w-full bg-black">
          {/* Mock video */}
          <iframe title="Teaser" className="h-full w-full" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" allow="autoplay; encrypted-media" />
        </div>
        <div className="flex justify-end gap-3 p-4">
          <button onClick={onClose} className="focus-neon rounded-xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/15">Close</button>
        </div>
      </div>
    </div>
  )
}

