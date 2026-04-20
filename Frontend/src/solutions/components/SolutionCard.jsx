import CodeBlock from './CodeBlock'
import ScoreBadge from '../../shared/ui/ScoreBadge'
import ScoreBar from '../../shared/ui/ScoreBar'

export default function SolutionCard({ title, icon, solution, score, feedback, isWinner, animDelay = 0 }) {
  return (
    <div
      className={`glass-card rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 ease-in-out relative animate-[fadeInUp_0.5s_ease_forwards] opacity-0 ${
        isWinner
          ? 'border-[rgba(255,215,9,0.4)] shadow-[var(--shadow-winner),var(--shadow-card)]'
          : ''
      }`}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {isWinner && (
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,215,9,0.04)] to-transparent pointer-events-none" />
      )}

      <div className="px-6 pt-5 pb-4 bg-[var(--color-surface-container)] border-b border-[var(--color-outline-variant)] flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2.5">
          <h2 className="font-display text-[1rem] font-bold text-[var(--color-on-surface)] flex items-center gap-2.5 tracking-[-0.01em]">
            <span className="text-[1.2rem]">{icon}</span>
            {title}
            {isWinner && (
              <span className="text-[1rem] animate-[float_3s_ease-in-out_infinite]" title="Winner">
                🏆
              </span>
            )}
          </h2>
          <ScoreBadge score={score} />
        </div>
        <ScoreBar score={score} />
      </div>

      <div className="p-6 flex flex-col gap-5 relative z-10">
        <CodeBlock content={solution} label="Response" />

        <div className="flex flex-col gap-2">
          <span className="font-display text-[0.7rem] tracking-[0.1em] uppercase text-[var(--color-on-surface-variant)]">
            Judge Feedback
          </span>
          <p className="text-[0.875rem] leading-[1.7] text-[var(--color-on-surface-variant)] px-4 py-3 bg-[var(--color-surface-high)] rounded-[var(--radius-md)] border-l-2 border-[var(--color-primary-dim)]">
            {feedback}
          </p>
        </div>
      </div>
    </div>
  )
}
