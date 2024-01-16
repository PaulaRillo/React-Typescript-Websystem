import { Box, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { useAuth } from 'features/auth/hooks/useAuth';
import * as styles from './styles';

export const AuthError = () => {
  const { error } = useAuth();
  if (!error) {
    return <></>;
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="body2" color="error">
        {tr(`shared.error.${error.code}`)}
      </Typography>
    </Box>
  );
};
