import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import * as styles from './styles';

export const Content = () => {
  return (
    <Box component="main" sx={styles.container}>
      <Outlet />
    </Box>
  );
};
