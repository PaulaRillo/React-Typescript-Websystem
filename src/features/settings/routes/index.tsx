import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
//routers
import { AccountingRouter } from '../modules/accounting';
import { CompanyRouter } from '../modules/company';
import { IntegrationsRouter } from '../modules/integrations';
import { PersonalRouter } from '../modules/personal';
//path
import { path } from 'shared/constants/path';
import { AccessRouter } from '../modules/access';

const RootView = lazy(() =>
  import('../views/RootView').then((m) => ({ default: m.RootView }))
);

export const SettingsRouter = () => {
  return (
    <Route
      path={path.settings.root}
      element={
        <Suspense fallback={<Loading />}>
          <RootView />
        </Suspense>
      }
    >
      <Route index element={<Navigate to={path.settings.personal.root} />} />
      {PersonalRouter()}
      {CompanyRouter()}
      {AccountingRouter()}
      {IntegrationsRouter()}
      {AccessRouter()}
    </Route>
  );
};
