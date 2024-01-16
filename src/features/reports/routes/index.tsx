import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';

const ReportsView = lazy(() => import('../views/ReportsView'));

export const ReportsRouter = () => {
  return (
    <Route
      path={path.reports}
      element={
        <ProtectedRoute matchAll={[PermissionKey.VIEW_REPORT]}>
          <Suspense fallback={<Loading />}>
            <ReportsView />
          </Suspense>
        </ProtectedRoute>
      }
    />
  );
};
