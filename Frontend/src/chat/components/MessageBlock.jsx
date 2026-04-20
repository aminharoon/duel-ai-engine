import SolutionCard from '../../solutions/components/SolutionCard';
import JudgePanel from '../../judge/components/JudgePanel';

function SkeletonCard() {
  return (
    <div className="glass-card rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300 relative">
      <div className="px-6 pt-5 pb-4 bg-[var(--color-surface-container)] border-b border-[var(--color-outline-variant)] flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="animate-shimmer rounded-[var(--radius-md)] w-[140px] h-[18px]" />
          <div className="animate-shimmer w-[80px] h-[26px] rounded-full" />
        </div>
        <div className="animate-shimmer w-full h-[4px] mt-2 rounded-full" />
      </div>
      <div className="p-6 flex flex-col gap-5">
        <div className="animate-shimmer h-[200px] rounded-[var(--radius-md)]" />
        <div className="flex flex-col gap-2">
          <div className="animate-shimmer rounded-[var(--radius-md)] w-[80px] h-[12px]" />
          <div className="animate-shimmer rounded-[var(--radius-md)] w-full h-[14px]" />
          <div className="animate-shimmer rounded-[var(--radius-md)] w-full h-[14px]" />
          <div className="animate-shimmer rounded-[var(--radius-md)] w-[60%] h-[14px]" />
        </div>
      </div>
    </div>
  )
}

export default function MessageBlock({ message }) {
  const { problem, result, isLoading, error } = message;

  return (
    <div className="flex flex-col gap-8 mb-16 animate-[fadeInUp_0.5s_ease_forwards]">
      {/* Problem Header Box */}
      <div className="bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-card)] relative">
        <div className="absolute top-0 left-6 -translate-y-1/2 bg-[var(--color-primary-dim)] text-[var(--color-on-primary)] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase font-display shadow-[0_0_12px_rgba(199,153,255,0.4)]">
          Problem
        </div>
        <p className="font-sans text-[1rem] leading-relaxed text-[var(--color-on-surface)] mt-2">
          {problem}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-start">
            <SkeletonCard />
            <div className="flex flex-row lg:flex-col items-center justify-center p-4 lg:p-6 gap-4 sticky top-[120px]">
              <div className="w-[80px] h-[2px] lg:w-[2px] lg:h-[80px] bg-gradient-to-b lg:bg-gradient-to-b from-transparent via-[var(--color-outline-variant)] to-transparent" />
              <div className="w-[56px] h-[56px] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] rounded-full flex items-center justify-center text-[1.4rem] shadow-[0_0_24px_rgba(199,153,255,0.4)] animate-spin-slow">
                ⚡
              </div>
              <div className="w-[80px] h-[2px] lg:w-[2px] lg:h-[80px] bg-gradient-to-b lg:bg-gradient-to-b from-transparent via-[var(--color-outline-variant)] to-transparent" />
            </div>
            <SkeletonCard />
          </div>
          <div className="animate-shimmer h-[200px] rounded-[var(--radius-xl)] mt-2 w-full" />
        </div>
      ) : error ? (
        <div className="bg-[var(--color-error-container)] text-[#ffb2b9] border border-[rgba(255,110,132,0.3)] rounded-[var(--radius-lg)] p-4 font-display text-sm text-center">
          ⚠️ {error}
        </div>
      ) : result && result.solution_1 && result.judge ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-start">
            <SolutionCard
              title="Solution 1"
              icon="🤖"
              solution={result.solution_1}
              score={result.judge.solution_1_score || result.judge.solution_1_Score}
              feedback={result.judge.solution_1_feedBack || result.judge.solution_1_feedback}
              isWinner={(result.judge.solution_1_score || 0) >= (result.judge.solution_2_score || 0)}
              animDelay={0}
            />

            <div className="flex flex-row lg:flex-col items-center justify-center p-4 lg:p-6 gap-4 sticky top-[120px]">
              <div className="w-[80px] h-[2px] lg:w-[2px] lg:h-[80px] bg-gradient-to-b lg:bg-gradient-to-b from-transparent via-[var(--color-outline-variant)] to-transparent" />
              <div className="w-[56px] h-[56px] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] rounded-full flex items-center justify-center text-[1.4rem] shadow-[0_0_24px_rgba(199,153,255,0.4)]">
                ⚡
              </div>
              <span className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-on-surface-variant)]">
                VS
              </span>
              <div className="w-[80px] h-[2px] lg:w-[2px] lg:h-[80px] bg-gradient-to-b lg:bg-gradient-to-b from-transparent via-[var(--color-outline-variant)] to-transparent" />
            </div>

            <SolutionCard
              title="Solution 2"
              icon="🤖"
              solution={result.solution_2}
              score={result.judge.solution_2_score || result.judge.solution_2_Score}
              feedback={result.judge.solution_2_feedBack || result.judge.solution_2_feedback}
              isWinner={(result.judge.solution_1_score || 0) < (result.judge.solution_2_score || 0)}
              animDelay={100}
            />
          </div>

          <JudgePanel judge={result.judge} animDelay={200} />
        </div>
      ) : result ? (
        <div className="bg-[var(--color-surface-container)] text-white border border-[var(--color-outline-variant)] rounded-[var(--radius-lg)] p-4 font-mono text-sm overflow-auto max-h-[300px]">
          <h3 className="text-[var(--color-error)] mb-2 font-display">Data format mismatch! Backend returned:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
}
