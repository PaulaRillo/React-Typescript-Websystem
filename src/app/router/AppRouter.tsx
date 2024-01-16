//resources
import { Route, Routes } from 'react-router-dom';
//auth
import { AuthVerify } from './providers/AuthVerify';
import { RequireAuth } from './providers/RequireAuth';
import { SyncStatusVerify } from './providers/SyncStatusVerify';
import { TenantSettingsVerify } from './providers/TenantSettingsVerify';
//layout
import { Layout } from 'shared/modules/layout';
//paths
import { path } from 'shared/constants/path';
//routers
import { AuthRouter } from 'features/auth';
import { BillsRouter } from 'features/bills';
import { DashboardRouter } from 'features/dashboard';
import { OutgoingPaymentsRouter } from 'features/outgoingPayments';
import { ReportsRouter } from 'features/reports';
import { SettingsRouter } from 'features/settings/routes';
import { VendorsRouter } from 'features/vendors';

export function AppRouter() {
  return (
    <Routes>
      <Route
        element={
          <RequireAuth>
            <SyncStatusVerify>
              <TenantSettingsVerify>
                <Layout />
              </TenantSettingsVerify>
            </SyncStatusVerify>
          </RequireAuth>
        }
      >
        {DashboardRouter()}
        {BillsRouter()}
        {VendorsRouter()}
        {SettingsRouter()}
        {OutgoingPaymentsRouter()}
        {ReportsRouter()}
      </Route>
      <Route
        path={path.signIn}
        element={
          <AuthVerify>
            <Layout variant="fullframe" />
          </AuthVerify>
        }
      >
        {AuthRouter()}
      </Route>
    </Routes>
  );
}

export default AppRouter;
