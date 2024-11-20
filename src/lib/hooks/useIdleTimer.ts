import { useState, useEffect } from 'react';

export const useIdleTimer = (idleTime = 60000) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let idleTimeout: number;

    const resetTimer = () => {
      clearTimeout(idleTimeout);
      setIsIdle(false);
      idleTimeout = window.setTimeout(() => setIsIdle(true), idleTime);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => document.removeEventListener(event, resetTimer));
      clearTimeout(idleTimeout);
    };
  }, [idleTime]);

  return isIdle;
};