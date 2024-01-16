import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetLoggedUser } from 'shared/api/queries/useGetLoggedUser';
import { path } from 'shared/constants/path';

export const useOnAuth = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [hasAuth, setHasAuth] = useState(false);

  useGetLoggedUser({ enabled: hasAuth });

  const handleAuth = useCallback(async () => {
    setHasAuth(true);
    navigate(state?.from || path.dashboard);
  }, [navigate, state?.from]);

  return handleAuth;
};
