import { Box, Button, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import * as styles from './styles';

type Props = {
  onStart: () => void;
};

export const Welcome = ({ onStart }: Props) => {
  return (
    <Permission
      matchAll={[PermissionKey.EXECUTE_CONNECTION_SYNC]}
      fallback={
        <Box sx={styles.container}>
          <Typography variant="h6" color="primary" textAlign="center">
            {tr('shared.onboarding.welcome.fallback.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {tr('shared.onboarding.welcome.fallback.subTitle')}
          </Typography>
        </Box>
      }
    >
      <Box sx={styles.container}>
        <Typography variant="h6" color="primary" textAlign="center">
          {tr('shared.onboarding.welcome.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {tr('shared.onboarding.welcome.subTitle')}
        </Typography>
        <Button variant="contained" onClick={onStart} sx={{ mt: 2 }}>
          {tr('shared.start')}
        </Button>
      </Box>
    </Permission>
  );
};
