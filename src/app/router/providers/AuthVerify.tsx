import core from 'core.v2';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalLoader } from 'shared/components/GlobalLoader';
import { path } from 'shared/constants/path';

type Props = {
  redirectTo?: string;
  children: JSX.Element;
};

export const AuthVerify = ({
  redirectTo = path.dashboard,
  children
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAuth, setHasAuth] = useState(false);

  useEffect(() => {
    core.auth
      .getAuthUser()
      .then(() => {
        setHasAuth(true);
      })
      .catch(() => {
        setHasAuth(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (hasAuth) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};
