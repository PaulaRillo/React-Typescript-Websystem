//resources
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
//loader
import { RootView } from 'features/bills/modules/bill/views/RootView';
import { Loading } from 'shared/components/Loading';
//path
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';
//views
const PreviewView = lazy(() => import('../modules/preview'));
const PaymentsView = lazy(() => import('../modules/payments'));
const InstallmentsView = lazy(() => import('../modules/installments'));
const HistoryView = lazy(() => import('../modules/history'));
const CommentsView = lazy(() => import('../modules/comments'));

export const BillRouter = () => (
  <Route
    path={path.bills.id.root}
    element={
      <ProtectedRoute matchAll={[PermissionKey.VIEW_BILL]}>
        <RootView />
      </ProtectedRoute>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<Loading />}>
          <PreviewView />
        </Suspense>
      }
    />
    <Route
      path={path.bills.id.preview}
      element={
        <Suspense fallback={<Loading />}>
          <PreviewView />
        </Suspense>
      }
    />
    <Route
      path={path.bills.id.payments}
      element={
        <Suspense fallback={<Loading />}>
          <PaymentsView />
        </Suspense>
      }
    />
    <Route
      path={path.bills.id.installments}
      element={
        <Suspense fallback={<Loading />}>
          <InstallmentsView />
        </Suspense>
      }
    />
    <Route
      path={path.bills.id.history}
      element={
        <Suspense fallback={<Loading />}>
          <HistoryView />
        </Suspense>
      }
    />
    <Route
      path={path.bills.id.comments}
      element={
        <Suspense fallback={<Loading />}>
          <CommentsView />
        </Suspense>
      }
    />
  </Route>
);
