import { Box, Typography } from '@mui/material';
import * as styles from './styles';
import { Spacer } from '../Spacer';

type Props = {
  title: string;
  children: JSX.Element;
};

export const Info = ({ title, children }: Props) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.key}>
        <Typography variant="body2" fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Spacer />
      {children}
    </Box>
  );
};
