import core from 'core.v2';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/constants/path';

type SignOut = (redirectTo?: string) => void;

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const clearLocalStorage = () => {
    const dashboard = window.localStorage.getItem('@DashboardGridLayouts');
    window.localStorage.clear();
    if (dashboard) {
      window.localStorage.setItem('@DashboardGridLayouts', dashboard);
    }
  };

  const signOut = useCallback<SignOut>(
    (redirectTo = path.signIn) => {
      core.stop().then(() => {
        queryClient.clear();
        clearLocalStorage();
        navigate(redirectTo);
      });
    },
    [navigate, queryClient]
  );

  return signOut;
};
