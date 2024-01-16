import { useCallback } from 'react';
import { useLocation } from 'react-router';

type Return = ReturnType<typeof useLocation> & {
  isActive: (path: string) => boolean;
};

export const useAppLocation = (): Return => {
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location]
  );

  return { ...location, isActive };
};
