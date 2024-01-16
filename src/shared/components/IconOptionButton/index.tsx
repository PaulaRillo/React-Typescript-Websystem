import { IconButton, ButtonProps } from '@mui/material';
import * as styles from './styles';

type Props = ButtonProps & {
  children: React.ReactNode;
};

export const IconOptionButton = ({ children, ...props }: Props) => {
  return (
    <IconButton disableRipple sx={styles.button} {...props}>
      {children}
    </IconButton>
  );
};
