import { Box } from '@mui/material';
import * as styles from './styles';

type Props = {
  children: JSX.Element[];
};

export const CreationWizardContainer = ({ children }: Props) => {
  return <Box sx={styles.container}>{children}</Box>;
};
