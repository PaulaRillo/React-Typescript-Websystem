//material-ui
import { Box } from '@mui/material';
//resources
import BtElementTopRight from 'shared/assets/bt-element-top-right.svg';
import BtElementBottomLeft from 'shared/assets/bt-element-bottom-left.svg';
//styles
import * as styles from './styles';

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <Box sx={styles.container}>
      <Box
        component="img"
        src={BtElementTopRight}
        sx={styles.btElementTopRight}
      />
      <Box
        component="img"
        src={BtElementBottomLeft}
        sx={styles.btElementBottomLeft}
      />
      {children}
      <Box sx={styles.awsContainer}>
        <Box
          component="img"
          alt="Powered by AWS Cloud Computing"
          src="https://d0.awsstatic.com/logos/powered-by-aws.png"
          sx={styles.awsImg}
        />
      </Box>
    </Box>
  );
};
