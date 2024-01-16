import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNav = (key: string, callback?: () => void) => {
  const navigate = useNavigate();

  const handleCallback = useCallback(() => {
    if (callback) {
      callback();
    }
  }, [callback]);

  const handleNavigate = useCallback(
    (event: SyntheticEvent) => {
      navigate(event.currentTarget.getAttribute(key) as string);
      handleCallback();
    },
    [key, navigate, handleCallback]
  );

  return handleNavigate;
};
