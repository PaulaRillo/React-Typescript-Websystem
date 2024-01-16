import { lazy, Suspense, useCallback, useMemo } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { tr } from 'shared/translate';
import {
  PermissionKey,
  ProtectedRoute,
  usePermission
} from 'shared/modules/Permission';

const NavView = lazy(() => import('../../shared/views/NavView'));
const UsersView = lazy(() => import('../modules/users/views/UsersView'));
const RolesView = lazy(() => import('../modules/roles/views/RolesView'));

export const AccessRouter = () => {
  const { matchAll } = usePermission();
  const items = useMemo(
    () => [
      {
        icon: <PeopleAltOutlinedIcon />,
        label: tr('shared.users'),
        path: path.settings.access.users,
        permissions: [PermissionKey.VIEW_USER]
      },
      {
        icon: <EngineeringOutlinedIcon />,
        label: tr('shared.roles'),
        path: path.settings.access.roles,
        permissions: [PermissionKey.VIEW_ROLE]
      }
    ],
    []
  );

  return (
    <Route
      path={path.settings.access.root}
      element={
        <ProtectedRoute
          matchOne={[
            PermissionKey.VIEW_USER,
            PermissionKey.MANAGE_USER,
            PermissionKey.VIEW_ROLE,
            PermissionKey.MANAGE_ROLE,
            PermissionKey.VIEW_GROUP,
            PermissionKey.MANAGE_GROUP
          ]}
        >
          <Suspense fallback={<Loading />}>
            <NavView rootPath="/settings/access" items={items} />
          </Suspense>
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to={path.settings.access.users} />} />
      <Route
        path={path.settings.access.users}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_USER]}>
            <Suspense fallback={<Loading />}>
              <UsersView />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={path.settings.access.roles}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_ROLE]}>
            <Suspense fallback={<Loading />}>
              <RolesView />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Route>
  );
};
