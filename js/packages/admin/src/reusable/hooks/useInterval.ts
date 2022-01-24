import { useEffect, useRef } from 'react';

interface IntervalProps {
  callback: () => void;
  delay: number;
  runEffect: boolean;
}

// Reusable hook that lets you setup an interval with a given callback,
// with an optional boolean parameter that dictates when the effect
// should be run
export const useInterval = ({
  callback,
  delay,
  runEffect = true,
}: IntervalProps): void => {
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (runEffect) {
      intervalRef.current = setInterval(() => {
        callback();
      }, delay);
    }
    return (): void => {
      clearInterval(intervalRef.current);
    };
  }, [callback, delay, runEffect]);
};
