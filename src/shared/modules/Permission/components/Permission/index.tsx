import { PermissionKey } from '../../enums/PermissionKey';
import { usePermission } from '../../hooks/usePermission';

type Props = {
  matchAll?: PermissionKey[];
  matchOne?: PermissionKey[];
  fallback?: JSX.Element;
  children: JSX.Element;
};

export const Permission = ({
  children,
  fallback = <></>,
  ...props
}: Props): JSX.Element => {
  const { matchAll, matchOne } = usePermission();

  if (props.matchAll && props.matchOne) {
    throw new Error(
      'Permission component can only receive matchAll or matchOne props'
    );
  }

  if (props.matchAll) {
    return matchAll(props.matchAll) ? children : fallback;
  }

  if (props.matchOne) {
    return matchOne(props.matchOne) ? children : fallback;
  }

  return children;
};
