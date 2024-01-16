import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import * as styles from './styles';

type Props = {
  children?: ReactNode;
};

export const Content = ({ children }: Props) => {
  return (
    <Box component="main" sx={styles.main}>
      <Box component="section" sx={styles.section}>
        <Outlet />
      </Box>
      {children && (
        <Box component="aside" sx={styles.aside}>
          <Box sx={styles.asideContent}>{children}</Box>
        </Box>
      )}
    </Box>
  );
};
