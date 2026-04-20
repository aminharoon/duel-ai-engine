import ScoreBadge from '../../shared/ui/ScoreBadge'
import ScoreBar from '../../shared/ui/ScoreBar'
import { scoreTier } from '../utils/scoreUtils'

export default function JudgePanel({ judge, animDelay = 0 }) {
  const s1Tier = scoreTier(judge.solution_1_score)
  const s2Tier = scoreTier(judge.solution_2_score)
  const winnerNum = judge.solution_1_score >= judge.solution_2_score ? 1 : 2

  const numberColors = {
    high: 'text-[var(--color-tertiary-container)]',
    mid: 'text-[var(--color-secondary)]',
    low: 'text-[var(--color-error)]'
  }

  return (
    <div
      className="relative animate-[fadeInUp_0.5s_ease_forwards] opacity-0"
      style={{ animationDelay: `${animDelay}ms` }}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-br from-[rgba(199,153,255,0.4)] via-[rgba(0,244,254,0.2)] to-[rgba(255,215,9,0.2)] rounded-[calc(var(--radius-xl)+1px)] z-0 pointer-events-none" />
      
      <div className="relative z-10 bg-[var(--color-surface-container)] rounded-[var(--radius-xl)] overflow-hidden">
        <div className="px-8 py-6 flex items-center justify-between flex-wrap gap-4 border-b border-[var(--color-outline-variant)] bg-gradient-to-br from-[rgba(199,153,255,0.05)] to-transparent">
          <h2 className="font-display text-[1.15rem] font-bold flex items-center gap-3">
            ⚖️ Judge Recommendation
          </h2>
          <div className="flex items-center gap-2.5 px-5 py-2 bg-[rgba(255,215,9,0.12)] border border-[rgba(255,215,9,0.3)] rounded-full font-display text-[0.9rem] font-bold text-[var(--color-secondary)] shadow-[0_0_20px_rgba(255,215,9,0.1)]">
            🏆 Winner: Solution {winnerNum}
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solution 1 Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-display text-[0.85rem] font-semibold flex items-center gap-2">
                🤖 Solution 1
              </span>
              <div className="flex items-center gap-3">
                <span className={`font-display text-[2rem] font-bold tracking-[-0.03em] leading-none ${numberColors[s1Tier]}`}>
                  {judge.solution_1_score}
                </span>
                <div>
                  <div className="text-[0.75rem] text-[var(--color-on-surface-variant)] font-display">Score</div>
                  <ScoreBadge score={judge.solution_1_score} />
                </div>
              </div>
            </div>
            <ScoreBar score={judge.solution_1_score} />
            <p className="text-[0.875rem] leading-[1.7] text-[var(--color-on-surface-variant)] px-4 py-3.5 bg-[var(--color-surface-high)] rounded-[var(--radius-md)]">
              {judge.solution_1_feedBack}
            </p>
          </div>

          {/* Solution 2 Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-display text-[0.85rem] font-semibold flex items-center gap-2">
                🤖 Solution 2
              </span>
              <div className="flex items-center gap-3">
                <span className={`font-display text-[2rem] font-bold tracking-[-0.03em] leading-none ${numberColors[s2Tier]}`}>
                  {judge.solution_2_score}
                </span>
                <div>
                  <div className="text-[0.75rem] text-[var(--color-on-surface-variant)] font-display">Score</div>
                  <ScoreBadge score={judge.solution_2_score} />
                </div>
              </div>
            </div>
            <ScoreBar score={judge.solution_2_score} />
            <p className="text-[0.875rem] leading-[1.7] text-[var(--color-on-surface-variant)] px-4 py-3.5 bg-[var(--color-surface-high)] rounded-[var(--radius-md)]">
              {judge.solution_2_feedBack}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
