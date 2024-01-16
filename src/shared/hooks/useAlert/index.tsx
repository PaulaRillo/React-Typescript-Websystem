import { newAlert, resetAlert } from 'app/store/slices/alert/alertSlice';
import { useCallback } from 'react';
import { IAlert } from 'shared/types/alert';
import { useAppDispatch } from '../useAppDispatch';

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const alert = useCallback(
    (alert: IAlert) => {
      dispatch(newAlert(alert));
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch(resetAlert());
  }, [dispatch]);

  return { alert, reset };
};
