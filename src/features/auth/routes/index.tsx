import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { GlobalLoader } from 'shared/components/GlobalLoader';
import { path } from 'shared/constants/path';
import { useOnAuth } from 'shared/hooks/useOnAuth';

const Authenticator = lazy(() => import('../components/Authenticator'));

export const AuthRouter = () => {
  const handleAuth = useOnAuth();

  return (
    <Route
      path={path.signIn}
      element={
        <Suspense fallback={<GlobalLoader />}>
          <Authenticator onAuth={handleAuth} />
        </Suspense>
      }
    />
  );
};
