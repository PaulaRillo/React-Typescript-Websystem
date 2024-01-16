import { Suspense, lazy, useCallback } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import {
  PermissionKey,
  ProtectedRoute,
  usePermission
} from 'shared/modules/Permission';
const AccountingRootView = lazy(() => import('../views/AccountingRootView'));
const CurrenciesView = lazy(
  () => import('../modules/currencies/views/CurrenciesView')
);

export const AccountingRouter = () => {
  const { matchAll } = usePermission();

  const handleRedirect = useCallback((): string => {
    if (matchAll([PermissionKey.MANAGE_COMPANY])) {
      return path.settings.accounting.currencies;
    }
    return path.bills.root;
  }, [matchAll]);

  return (
    <Route
      path={path.settings.accounting.root}
      element={
        <Suspense fallback={<Loading />}>
          <AccountingRootView />
        </Suspense>
      }
    >
      <Route index element={<Navigate to={handleRedirect()} />} />
      <Route
        path={path.settings.accounting.currencies}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_COMPANY]}>
            <Suspense fallback={<Loading />}>
              <CurrenciesView />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Route>
  );
};
