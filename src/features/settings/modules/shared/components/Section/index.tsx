//material-ui
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
//styles
import * as styles from './styles';

type Props = {
  title: string;
  subTitle?: string;
  children: ReactNode;
};

export const Section = ({ title, subTitle, children }: Props) => {
  return (
    <Box component="section" sx={styles.card}>
      <Box sx={styles.header}>
        <Typography variant="h6">{title}</Typography>
        {subTitle && (
          <Typography variant="body2" color="text.secondary">
            {subTitle}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
};
