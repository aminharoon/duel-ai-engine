import { useState } from 'react';

export default function MessageInput({ onSendMessage, loading }) {
  const [problem, setProblem] = useState('');

  const handleBattle = () => {
    if (!problem.trim() || loading) return;
    onSendMessage(problem);
    setProblem(''); // clear input after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleBattle();
    }
  };

  return (
    <div className="sticky bottom-0 z-50 pt-8 pb-8 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)] to-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="font-display text-[0.7rem] tracking-[0.12em] uppercase text-[var(--color-primary)] mb-3 flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-[var(--color-outline-variant)] after:to-transparent after:max-w-[200px]">
          ⚡ Next Battle
        </div>

        <div className="bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-card)] transition-all duration-300 focus-within:border-[rgba(199,153,255,0.4)] focus-within:shadow-[var(--shadow-card),0_0_0_1px_rgba(199,153,255,0.15),var(--shadow-glow)]">
          <label htmlFor="problem-input" className="font-display text-[1.1rem] font-semibold text-[var(--color-on-surface)] mb-4 flex items-center gap-2.5">
            📋 Enter Your Problem
          </label>
          <textarea
            id="problem-input"
            className="w-full min-h-[100px] bg-[var(--color-surface-highest)] border border-transparent rounded-[var(--radius-lg)] p-4 font-sans text-[0.95rem] text-[var(--color-on-surface)] resize-y outline-none leading-[1.7] transition-all duration-200 placeholder-[var(--color-on-surface-variant)] focus:border-[rgba(199,153,255,0.5)] focus:shadow-[0_0_0_3px_rgba(199,153,255,0.08)] disabled:opacity-50"
            placeholder="Describe your problem or question... Two AI models will compete to give you the best answer."
            value={problem}
            onChange={e => setProblem(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-[0.8rem] text-[var(--color-on-surface-variant)] opacity-70">
              Press <kbd className="bg-[var(--color-surface-highest)] px-1.5 py-0.5 rounded text-[0.75em] border border-[var(--color-outline-variant)] font-sans">Ctrl+Enter</kbd> to start battle
            </span>
            <button
              onClick={handleBattle}
              disabled={loading || !problem.trim()}
              className={`flex items-center gap-2.5 px-8 py-3 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[var(--color-on-primary)] border-none rounded-full font-display text-[0.9rem] font-bold tracking-[0.04em] cursor-pointer transition-all duration-250 shadow-[0_4px_20px_rgba(199,153,255,0.3)] hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_8px_32px_rgba(199,153,255,0.45)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap`}
            >
              <span className={`text-[1.1rem] ${loading ? 'animate-spin' : ''}`}>
                {loading ? '⟳' : '⚡'}
              </span>
              {loading ? 'Battling…' : 'Start Battle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
