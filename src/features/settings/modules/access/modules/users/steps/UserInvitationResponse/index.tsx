import { CircularProgress, Typography, Box } from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import * as styles from './styles';

import { useNewUser } from '../../hooks/useNewUser';

export const UserInvitationResponse = () => {
  const { isLoading, isSuccess, isError, message } = useNewUser();
  return (
    <Box sx={styles.response}>
      {isLoading && <CircularProgress color="secondary" size={64} />}
      <Box sx={styles.message}>
        {isSuccess && (
          <CheckCircleOutline sx={styles.messageIcon} color="success" />
        )}
        {isError && <ErrorOutline sx={styles.messageIcon} color="error" />}
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
};
