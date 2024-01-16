import { Box } from '@mui/material';
import { Container } from '../Container';
import { Header } from '../Header';
import * as styles from './styles';

type Props = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

export const AuthContainer = ({ title, subTitle, children }: Props) => {
  return (
    <Container>
      <Box sx={styles.content}>
        <Header title={title} subTitle={subTitle} />
        {children}
      </Box>
    </Container>
  );
};
