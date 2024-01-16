import { Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  unreadNotifications: number;
};

export const Notifications = ({ unreadNotifications }: Props) => {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={styles.notifications}
    >
      {unreadNotifications}
    </Typography>
  );
};
