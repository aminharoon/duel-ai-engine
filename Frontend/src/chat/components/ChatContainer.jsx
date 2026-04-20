import { useEffect, useRef } from 'react';
import MessageBlock from './MessageBlock';

export default function ChatContainer({ messages }) {
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-4">
        <div className="text-[3.5rem] opacity-50 animate-[idle-float_4s_ease-in-out_infinite]">⚔️</div>
        <h2 className="font-display text-[1.2rem] font-semibold text-[var(--color-on-surface-variant)] tracking-[-0.01em]">
          The Arena Awaits
        </h2>
        <p className="text-[0.875rem] text-[var(--color-on-surface-variant)] opacity-60 max-w-[420px] leading-[1.7]">
          Enter a problem below and hit <strong className="text-[var(--color-primary)] font-semibold">Start Battle</strong> to watch two AI models compete. The judge will score both solutions and crown the winner.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      {messages.map((msg) => (
        <MessageBlock key={msg.id} message={msg} />
      ))}
    </div>
  );
}
