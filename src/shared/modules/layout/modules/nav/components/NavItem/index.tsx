//material-ui
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
//resources
import { ReactNode } from 'react';
//hooks
import { useAppLocation } from 'shared/hooks/useAppLocation';
//core-components
import { Link } from 'shared/components/Link';
import { Notifications } from '../Notifications';
//styles
import * as styles from './styles';

type Props = {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  unreadNotifications?: number;
};

export const NavItem = ({
  id,
  label,
  icon,
  path,
  unreadNotifications
}: Props) => {
  const { isActive } = useAppLocation();
  const isActivePath = isActive(path);

  return (
    <Link data-testid={id} to={path} style={styles.link}>
      <MenuItem sx={isActivePath ? styles.ActiveMenuItem : styles.menuItem}>
        <ListItemIcon sx={isActivePath ? styles.ActiveIcon : styles.icon}>
          {icon}
        </ListItemIcon>
        <ListItemText sx={styles.label}>{label}</ListItemText>
        {unreadNotifications && (
          <Notifications unreadNotifications={unreadNotifications} />
        )}
      </MenuItem>
    </Link>
  );
};
