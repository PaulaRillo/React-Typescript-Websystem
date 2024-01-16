import { Navigate, useLocation } from 'react-router-dom';
import { useGetLoggedUser } from 'shared/api/queries/useGetLoggedUser';
import { GlobalLoader } from 'shared/components/GlobalLoader';
import { path } from 'shared/constants/path';
import { useSignOut } from 'shared/hooks/useSignOut';

type Props = {
  redirectTo?: string;
  children: JSX.Element;
};

export const RequireAuth = ({ redirectTo = path.signIn, children }: Props) => {
  const signOut = useSignOut();
  const { pathname } = useLocation();
  const { isError, isLoading } = useGetLoggedUser({ enabled: true });

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (isError) {
    signOut();
    return <Navigate to={redirectTo} state={{ from: pathname }} />;
  }

  return children;
};
