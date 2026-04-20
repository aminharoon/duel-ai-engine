export default function CodeBlock({ content, label }) {
  return (
    <div className="bg-[var(--color-surface-low)] border border-[var(--color-outline-variant)] rounded-[var(--radius-lg)] overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--color-surface-container)] border-b border-[var(--color-outline-variant)] font-display text-[0.7rem] tracking-[0.08em] uppercase text-[var(--color-on-surface-variant)]">
        <div className="flex gap-1.5">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />
        </div>
        <span>{label || 'Solution'}</span>
      </div>
      <pre className="p-4.5 font-mono text-[0.82rem] leading-[1.8] text-[var(--color-on-surface)] max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words">
        {content}
      </pre>
    </div>
  )
}
