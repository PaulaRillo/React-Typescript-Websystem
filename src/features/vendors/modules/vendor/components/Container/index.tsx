import { Box } from '@mui/material';
import * as styles from './styles';

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  return <Box sx={styles.container}>{children}</Box>;
};
