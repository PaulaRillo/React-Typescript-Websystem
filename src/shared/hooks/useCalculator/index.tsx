import core from 'core.v2';
import { useMemo } from 'react';

export const useCalculator = () => {
  const calc = useMemo(() => {
    return core.utils.createCalculator();
  }, []);

  return { calc };
};
