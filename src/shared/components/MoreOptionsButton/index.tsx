import { Button, ButtonProps } from '@mui/material';
import * as styles from './styles';

type Props = ButtonProps & {
  children: React.ReactNode;
};

export const MoreOptionsButton = ({ children, ...props }: Props) => {
  return (
    <Button sx={styles.button} {...props}>
      {children}
    </Button>
  );
};
