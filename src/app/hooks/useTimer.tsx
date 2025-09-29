// hooks/useTimer.tsx
import { useState, useEffect, useRef } from "react";

export function useTimer(initialMinutes = 0) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = window.setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  useEffect(() => { if (seconds <= 0) setRunning(false); }, [seconds]);

  const setMinutes = (minutes: number) => setSeconds(minutes * 60);
  const resetMinutes = (minutes: number) => setSeconds(minutes * 60);
  
  // Helper to get current minutes and remaining seconds for display
  const displayMinutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return { 
    seconds, 
    displayMinutes,
    displaySeconds,
    setSeconds, 
    setMinutes,
    running, 
    setRunning, 
    reset: resetMinutes 
  };
}

export default useTimer;