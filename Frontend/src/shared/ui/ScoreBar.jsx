import { scoreTier } from '../../judge/utils/scoreUtils'

export default function ScoreBar({ score }) {
  const tier = scoreTier(score)

  const tierStyles = {
    high: { background: 'linear-gradient(90deg, #00b4cc, #00f4fe)' },
    mid: { background: 'linear-gradient(90deg, #c49000, #ffd709)' },
    low: { background: 'linear-gradient(90deg, #a00020, #ff6e84)' }
  }

  return (
    <div className="h-1 bg-[var(--color-surface-highest)] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: `${score}%`, ...tierStyles[tier] }}
      />
    </div>
  )
}
