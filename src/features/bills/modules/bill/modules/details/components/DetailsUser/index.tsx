import { Avatar, Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  user: {
    firstname: string;
    lastname: string;
  };
};

export const DetailsUser = ({ user }: Props) => {
  return (
    <Box sx={styles.container}>
      <Avatar sx={styles.avatar}>
        <Typography variant="caption" sx={styles.initials}>
          {`${user.firstname[0]}${user.lastname[0]}`}
        </Typography>
      </Avatar>
      <Typography variant="body2">{`${user.firstname} ${user.lastname}`}</Typography>
    </Box>
  );
};
