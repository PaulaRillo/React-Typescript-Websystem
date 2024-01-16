import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';

const PersonalRootView = lazy(() => import('../views/PersonalRootView'));
const PersonalInfoView = lazy(() => import('../views/PersonalInfoView'));

export const PersonalRouter = () => (
  <Route
    path={path.settings.personal.root}
    element={
      <Suspense fallback={<Loading />}>
        <PersonalRootView />
      </Suspense>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<Loading />}>
          <PersonalInfoView />
        </Suspense>
      }
    />
    <Route
      path={path.settings.personal.info}
      element={
        <Suspense fallback={<Loading />}>
          <PersonalInfoView />
        </Suspense>
      }
    />
  </Route>
);
