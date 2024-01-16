import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';
import { VendorsSettingsRouter } from '../modules/settings';

const RootView = lazy(() => import('../views/RootView'));
const OverviewView = lazy(() => import('../modules/overview'));
const BillsView = lazy(() => import('../modules/bills'));
const PaymentsView = lazy(() => import('../modules/payments'));
const ContactsView = lazy(() => import('../modules/contacts'));
// const HistoryView = lazy(() => import('../modules/history'));

export const VendorRouter = () => (
  <Route
    path={path.vendors.id.root}
    element={
      <ProtectedRoute matchAll={[PermissionKey.VIEW_VENDOR]}>
        <Suspense fallback={<Loading />}>
          <RootView />
        </Suspense>
      </ProtectedRoute>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<Loading />}>
          <OverviewView />
        </Suspense>
      }
    />
    <Route
      path={path.vendors.id.overview}
      element={
        <Suspense fallback={<Loading />}>
          <OverviewView />
        </Suspense>
      }
    />
    <Route
      path={path.vendors.id.bills}
      element={
        <Suspense fallback={<Loading />}>
          <BillsView />
        </Suspense>
      }
    />
    <Route
      path={path.vendors.id.payments}
      element={
        <Suspense fallback={<Loading />}>
          <PaymentsView />
        </Suspense>
      }
    />
    <Route
      path={path.vendors.id.contacts}
      element={
        <Suspense fallback={<Loading />}>
          <ContactsView />
        </Suspense>
      }
    />
    {/*<Route*/}
    {/*  path={path.vendors.id.history}*/}
    {/*  element={*/}
    {/*    <Suspense fallback={<Loading />}>*/}
    {/*      <HistoryView />*/}
    {/*    </Suspense>*/}
    {/*  }*/}
    {/*/>*/}
    {VendorsSettingsRouter()}
  </Route>
);
