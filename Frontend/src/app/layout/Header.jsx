export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-[var(--color-outline-variant)] backdrop-blur-md sticky top-0 z-[100] bg-[rgba(13,13,24,0.85)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] rounded-[var(--radius-md)] flex items-center justify-center text-xl shadow-[0_0_16px_rgba(199,153,255,0.3)]">
          ⚔️
        </div>
        <div>
          <div className="font-display text-xl font-bold tracking-tight text-gradient">
            AI Battle Arena
          </div>
          <div className="text-xs text-[var(--color-on-surface-variant)] font-display tracking-[0.08em] uppercase">
            Where AI Models Compete
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] rounded-full text-xs text-[var(--color-on-surface-variant)] font-display tracking-[0.04em]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-tertiary-container)] shadow-[0_0_8px_var(--color-tertiary-container)] animate-pulse-dot" />
        Arena Online
      </div>
    </header>
  );
}
