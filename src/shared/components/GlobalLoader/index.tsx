import { Box, CircularProgress, Typography } from '@mui/material';
import { Logo } from '../Logo';
import * as styles from './styles';

type Props = {
  title?: string;
};

export const GlobalLoader = ({ title }: Props) => {
  return (
    <Box sx={styles.container}>
      <Logo />
      <CircularProgress color="primary" size={32} thickness={4} />
      {title && (
        <Typography variant="caption" color="text.primary">
          {title}
        </Typography>
      )}
    </Box>
  );
};
