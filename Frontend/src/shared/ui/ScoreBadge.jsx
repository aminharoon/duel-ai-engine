import { scoreTier } from '../../judge/utils/scoreUtils'

export default function ScoreBadge({ score }) {
  const tier = scoreTier(score)
  const icons = { high: '✦', mid: '◈', low: '▽' }

  const tierClasses = {
    high: 'bg-[rgba(0,244,254,0.15)] text-[var(--color-tertiary-container)] border border-[rgba(0,244,254,0.25)] shadow-[0_0_12px_rgba(0,244,254,0.1)]',
    mid: 'bg-[rgba(255,215,9,0.15)] text-[var(--color-secondary)] border border-[rgba(255,215,9,0.25)] shadow-[0_0_12px_rgba(255,215,9,0.1)]',
    low: 'bg-[rgba(255,110,132,0.15)] text-[var(--color-error)] border border-[rgba(255,110,132,0.25)] shadow-[0_0_12px_rgba(255,110,132,0.1)]'
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-display text-[0.85rem] font-bold tracking-[0.02em] whitespace-nowrap ${tierClasses[tier]}`}
      title={`Score: ${score}/100`}
    >
      {icons[tier]} {score}<span className="opacity-70 text-[0.75em]">/100</span>
    </span>
  )
}
