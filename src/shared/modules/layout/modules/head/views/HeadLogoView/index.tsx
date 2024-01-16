import { Box } from '@mui/material';
import { Logo } from 'shared/components/Logo';
import * as styles from './styles';

export const HeadLogoView = () => {
  return (
    <Box sx={styles.container}>
      <Logo />
    </Box>
  );
};
