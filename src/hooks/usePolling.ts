import { useEffect, useRef } from 'react';

/**
 * usePolling - React hook for polling a callback at a specified interval.
 * @param callback Function to call at each interval
 * @param delay Polling interval in milliseconds (set to null to disable)
 */
export function usePolling(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
