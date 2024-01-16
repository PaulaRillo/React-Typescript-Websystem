import { Box, BoxProps, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { forwardRef } from 'react';
import { useNewUser } from '../../hooks/useNewUser';
import * as styles from './styles';

export const UserInvitations = forwardRef<HTMLFormElement, BoxProps>(
  function UserInvitations() {
    const { data } = useNewUser();

    return (
      <Box sx={styles.container}>
        <Typography>
          {tr('settings.access.users.step3.invitations.title', {
            firstName: data?.firstName,
            lastName: data?.lastName
          })}
        </Typography>
        <Box sx={styles.invite}>
          <Typography variant="body2" fontWeight="700" mb={2}>
            {tr('shared.message')}
          </Typography>
          <Typography>
            {tr('settings.access.users.step3.invitations.message', {
              firstName: data?.firstName,
              lastName: data?.lastName
            })}
          </Typography>
        </Box>
      </Box>
    );
  }
);
