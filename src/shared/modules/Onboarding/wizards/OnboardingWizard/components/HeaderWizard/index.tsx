import { Box, Typography } from '@mui/material';
import { Logo } from 'shared/components/Logo';
import * as styles from './styles';

export const HeaderWizard = () => {
  return (
    <Box sx={styles.container}>
      <Logo sx={{ height: 40 }} />
      <Typography variant="h6" color="text.primary">
        Onboarding
      </Typography>
    </Box>
  );
};
