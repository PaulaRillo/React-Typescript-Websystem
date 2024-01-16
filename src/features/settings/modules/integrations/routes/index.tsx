import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { lazy, Suspense, useCallback, useMemo } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import {
  PermissionKey,
  ProtectedRoute,
  usePermission
} from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import { SyncStatus } from '../modules/sync-status/views/SyncStatusView';

const ConnectionsView = lazy(
  () => import('../modules/connections/views/ConnectionsView')
);
const NavView = lazy(() => import('../../shared/views/NavView'));

export const IntegrationsRouter = () => {
  const { matchAll } = usePermission();
  const items = useMemo(
    () => [
      {
        icon: <HubOutlinedIcon />,
        label: tr('shared.connections'),
        path: path.settings.integrations.connection
      },
      {
        icon: <CloudSyncOutlinedIcon />,
        label: tr('shared.syncStatus'),
        path: path.settings.integrations.sync
      }
    ],
    []
  );

  const handleRedirect = useCallback((): string => {
    if (
      matchAll([
        PermissionKey.MANAGE_CONNECTION,
        PermissionKey.EXECUTE_CONNECTION_SYNC
      ])
    ) {
      return path.settings.integrations.connection;
    }
    return path.settings.integrations.root;
  }, [matchAll]);

  return (
    <Route
      path={path.settings.integrations.root}
      element={
        <ProtectedRoute matchAll={[PermissionKey.VIEW_INTEGRATION]}>
          <Suspense fallback={<Loading />}>
            <NavView rootPath="/settings/integrations" items={items} />
          </Suspense>
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to={handleRedirect()} />} />
      <Route
        path={path.settings.integrations.connection}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_INTEGRATION]}>
            <Suspense fallback={<Loading />}>
              <ConnectionsView />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={path.settings.integrations.sync}
        element={
          <Suspense fallback={<Loading />}>
            <SyncStatus />
          </Suspense>
        }
      />
    </Route>
  );
};
