import { useLayoutEffect, useRef } from 'react';

export const useCallbackRef = (callback: () => void) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef.current;
};
