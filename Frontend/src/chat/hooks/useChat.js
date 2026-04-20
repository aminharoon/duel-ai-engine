import { useState, useCallback } from 'react';
import { fetchBattleResult } from '../services/battleService';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (problem) => {
    const trimmed = problem.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    // Add a temporary message block indicating loading
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { id: tempId, problem: trimmed, result: null, isLoading: true }]);

    try {
      const data = await fetchBattleResult(trimmed);
      // Replace temp loading message with actual result
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempId ? { ...msg, result: data, isLoading: false } : msg
        )
      );
    } catch (err) {
      setError(err?.message || 'Battle failed. Check your connection and try again.');
      // Remove loading state on failure
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempId ? { ...msg, isLoading: false, error: err?.message || 'Failed' } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage
  };
}
