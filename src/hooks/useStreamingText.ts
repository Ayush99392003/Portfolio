"use client";
import { useState, useEffect, useRef } from "react";

/**
 * Reveals text word-by-word at the specified speed.
 * Returns the partially-revealed string plus an isComplete flag.
 *
 * Args:
 *     fullText: The complete text to reveal.
 *     wordsPerSecond: How many words to reveal per second.
 *     enabled: If false, return fullText immediately (for
 *              messages that have already been "seen").
 */
export function useStreamingText(
  fullText: string,
  wordsPerSecond = 40,
  enabled = true,
) {
  const words = useRef(fullText.split(/(\s+)/));
  const [visibleCount, setVisibleCount] = useState(
    enabled ? 0 : words.current.length,
  );
  const [isComplete, setIsComplete] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setVisibleCount(words.current.length);
      setIsComplete(true);
      return;
    }

    const interval = setInterval(
      () => {
        setVisibleCount((prev) => {
          // Reveal 1-3 tokens per tick for natural pacing
          const next = prev + Math.ceil(Math.random() * 2 + 1);
          if (next >= words.current.length) {
            clearInterval(interval);
            setIsComplete(true);
            return words.current.length;
          }
          return next;
        });
      },
      1000 / wordsPerSecond,
    );

    return () => clearInterval(interval);
  }, [enabled, wordsPerSecond]);

  const displayText = words.current
    .slice(0, visibleCount)
    .join("");

  return { displayText, isComplete };
}
