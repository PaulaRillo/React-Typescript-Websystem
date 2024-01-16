import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';

const DashboardView = lazy(() => import('../views/DashboardView'));

export const DashboardRouter = () => {
  return (
    <Route
      index
      path="*"
      element={
        <Suspense fallback={<Loading />}>
          <DashboardView />
        </Suspense>
      }
    />
  );
};
