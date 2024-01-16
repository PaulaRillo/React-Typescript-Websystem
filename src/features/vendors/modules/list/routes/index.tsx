import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';

const VendorsView = lazy(() => import('../views/VendorsView'));

export const ListRouter = () => (
  <Route
    path={path.vendors.root}
    element={
      <ProtectedRoute matchAll={[PermissionKey.VIEW_VENDOR]}>
        <Suspense fallback={<Loading />}>
          <VendorsView />
        </Suspense>
      </ProtectedRoute>
    }
  />
);
