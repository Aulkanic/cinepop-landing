export default function Footer(){
  return (
    <footer className="mx-auto max-w-5xl px-6 py-10 text-sm text-white/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex gap-4">
          <a className="hover:text-white" href="/terms">Terms</a>
          <a className="hover:text-white" href="/privacy">Privacy</a>
          <a className="hover:text-white" href="/support">Support</a>
        </nav>
        <div>© {new Date().getFullYear()} CinePOP</div>
      </div>
    </footer>
  )
}

