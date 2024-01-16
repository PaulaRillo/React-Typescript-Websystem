import { newAlert } from 'app/store/slices/alert/alertSlice';
import core from 'core.v2';
import { useMutation } from 'react-query';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';

export const useSubmitPaymentRequestGroupUser = () => {
  const dispatch = useAppDispatch();
  return useMutation(() => core.payment.submitPaymentRequestGroup(), {
    onError: () => {
      dispatch(
        newAlert({
          title: 'Ops!',
          message: 'Unable to send payment',
          severity: 'error'
        })
      );
    }
  });
};
