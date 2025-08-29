type Props = { title: string; description: string; icon?: React.ReactNode }

export default function FeatureCard({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-transform will-change-transform hover:scale-[1.01]">
      <div className="mb-3 text-2xl font-semibold">{title}</div>
      <p className="text-sm text-white/75">{description}</p>
    </div>
  )
}

