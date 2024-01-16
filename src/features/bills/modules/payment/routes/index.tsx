import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';

const PaymentView = lazy(() => import('../views/PaymentView'));

export const PaymentRouter = () => (
  <Route
    path={path.bills.payment.root}
    element={
      <ProtectedRoute matchAll={[PermissionKey.PAY_BILL]}>
        <Suspense fallback={<Loading />}>
          <PaymentView />
        </Suspense>
      </ProtectedRoute>
    }
  />
);
