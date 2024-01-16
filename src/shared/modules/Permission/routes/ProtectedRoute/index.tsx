import { Navigate } from 'react-router-dom';
import { path } from 'shared/constants/path';
import { PermissionKey } from '../../enums/PermissionKey';
import { usePermission } from '../../hooks/usePermission';

type Props = {
  matchAll?: PermissionKey[];
  matchOne?: PermissionKey[];
  redirectTo?: string;
  children: JSX.Element;
};

export const ProtectedRoute = ({
  redirectTo = path.dashboard,
  children,
  ...props
}: Props) => {
  const { matchAll, matchOne } = usePermission();

  if (props.matchAll) {
    return matchAll(props.matchAll) ? children : <Navigate to={redirectTo} />;
  }

  if (props.matchOne) {
    return matchOne(props.matchOne) ? children : <Navigate to={redirectTo} />;
  }

  return children;
};
