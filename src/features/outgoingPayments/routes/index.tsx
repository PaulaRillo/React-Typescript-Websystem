import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';

const OutgoingPaymentsView = lazy(() =>
  import('../views/OutgoingPaymentsView').then((module) => ({
    default: module.OutgoingPaymentsView
  }))
);

export const OutgoingPaymentsRouter = () => {
  return (
    <Route
      path={path.outgoingPayments}
      element={
        <ProtectedRoute matchAll={[PermissionKey.VIEW_BILL]}>
          <Suspense fallback={<Loading />}>
            <OutgoingPaymentsView />
          </Suspense>
        </ProtectedRoute>
      }
    />
  );
};
