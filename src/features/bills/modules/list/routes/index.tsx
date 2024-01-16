import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';

const BillsView = lazy(() => import('../views/BillsView'));

export const ListRouter = () => {
  return (
    <Route
      path={path.bills.root}
      element={
        <ProtectedRoute matchAll={[PermissionKey.VIEW_BILL]}>
          <Suspense fallback={<Loading />}>
            <BillsView />
          </Suspense>
        </ProtectedRoute>
      }
    />
  );
};
