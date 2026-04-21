import React, { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";

const SkeletonCard = () => (
  <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl animate-pulse">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 bg-slate-800 rounded-lg"></div>
      <div className="h-4 bg-slate-800 rounded w-24"></div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-slate-800 rounded w-full"></div>
      <div className="h-3 bg-slate-800 rounded w-5/6"></div>
      <div className="h-3 bg-slate-800 rounded w-4/6"></div>
    </div>
  </div>
);

const SkeletonVerdict = () => (
  <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-2xl animate-pulse space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 bg-slate-800 rounded"></div>
      <div className="h-4 bg-slate-800 rounded w-32"></div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="h-3 bg-slate-800 rounded w-1/2"></div>
        <div className="h-2 bg-slate-800 rounded w-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-800 rounded w-1/2"></div>
        <div className="h-2 bg-slate-800 rounded w-full"></div>
      </div>
    </div>
    <div className="h-3 bg-slate-800 rounded w-3/4 mx-auto"></div>
  </div>
);

const ChatPage = () => {
  const { messages, input, setInput, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AI Battle Arena
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">Live Engine Active</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8 max-w-5xl mx-auto w-full scroll-smooth">
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
              <div className="relative w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-slate-300">Summon the Contenders</p>
              <p className="text-slate-500 max-w-xs">Describe a complex problem and watch two AI models battle for the superior implementation.</p>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {msg.role === "user" ? (
              <div className="flex justify-end">
                <div className="bg-blue-600/10 border border-blue-500/30 text-blue-100 px-5 py-4 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg shadow-blue-500/5">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Challenge Submission</p>
                  <p className="text-base leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AI Solution 1 */}
                  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400 font-bold">1</div>
                        <h3 className="font-bold text-slate-200">AI Alpha</h3>
                      </div>
                      <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-[10px] font-bold uppercase tracking-tighter">Distributed</div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{msg.solution1}</p>
                  </div>

                  {/* AI Solution 2 */}
                  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400 font-bold">2</div>
                        <h3 className="font-bold text-slate-200">AI Beta</h3>
                      </div>
                      <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-tighter">Modular</div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{msg.solution2}</p>
                  </div>
                </div>

                {/* Judge Verdict Section */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/5 blur-2xl rounded-3xl"></div>
                  <div className="relative bg-slate-900/60 border border-amber-500/20 p-6 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center shadow-inner">
                        <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05l-3.294 3.293a1 1 0 01-1.414 0l-3.294-3.293a1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm0 13.06l1.646 1.647 1.647-1.647L10 11.754l-3.293 3.306 1.647 1.647L10 15.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-black text-amber-500 uppercase tracking-tighter text-lg">Judge Evaluation</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Cross-Model Capability Report</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Alpha Scoring */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alpha Efficiency</span>
                          <span className="text-lg font-black text-purple-400">{msg.solution1Score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: `${msg.solution1Score}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                          <span className="text-purple-400 font-bold not-italic">Feedback:</span> {msg.solution1Feedback}
                        </p>
                      </div>

                      {/* Beta Scoring */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Beta Precision</span>
                          <span className="text-lg font-black text-emerald-400">{msg.solution2Score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: `${msg.solution2Score}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                          <span className="text-emerald-400 font-bold not-italic">Feedback:</span> {msg.solution2Feedback}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-800/50">
                      <p className="text-sm text-amber-200 font-medium leading-relaxed bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 italic">
                        "{msg.judgeResult}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <SkeletonVerdict />
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <div className="p-6 bg-black border-t border-slate-800 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex gap-4 items-end">
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Inject problem parameters..."
              className="relative w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 transition-all resize-none h-16 min-h-[64px] text-slate-200 placeholder:text-slate-600"
              rows="1"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="h-16 bg-white hover:bg-slate-200 disabled:bg-slate-800 disabled:text-slate-600 text-black px-8 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-xl active:scale-95 group overflow-hidden"
          >
            {isLoading ? (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            ) : (
              <>
                <span className="uppercase tracking-widest text-xs">Execute</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
        <p className="max-w-5xl mx-auto mt-4 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
          Neural Combat Protocol v2.4.0 • Awaiting Instructions
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
