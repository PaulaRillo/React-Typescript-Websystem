//core-components
import { Container } from 'shared/components/Container';
import { Header } from 'shared/components/Header';
//translate
import { tr } from 'shared/translate';
//styles
import { Box } from '@mui/material';
import { DashboardGridLayout } from 'features/dashboard/components/DashboardGridLayout';
import * as styles from './styles';

export const DashboardView = () => {
  return (
    <Container>
      <Header title={tr('dashboard.title')} />
      <Box sx={styles.content}>
        <DashboardGridLayout />
      </Box>
    </Container>
  );
};

export default DashboardView;
