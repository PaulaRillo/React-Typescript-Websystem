import { useCallback } from 'react';

export const useRemoteSubmit = () => {
  const submit = useCallback((formRef: React.RefObject<HTMLFormElement>) => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  }, []);

  return { submit };
};
