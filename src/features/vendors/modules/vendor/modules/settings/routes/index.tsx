import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';

const SettingsView = lazy(() => import('../views/SettingsView'));
const PaymentMethodsView = lazy(() => import('../modules/payment-methods'));

export const VendorsSettingsRouter = () => {
  return (
    <Route
      path={path.vendors.id.settings.root}
      element={
        <Suspense fallback={<Loading />}>
          <SettingsView />
        </Suspense>
      }
    >
      <Route
        index
        element={<Navigate to={path.vendors.id.settings.paymentMethods} />}
      />
      <Route
        path={path.vendors.id.settings.paymentMethods}
        element={
          <Suspense fallback={<Loading />}>
            <PaymentMethodsView />
          </Suspense>
        }
      />
    </Route>
  );
};
