import { Box } from '@mui/material';
import { KpisSection } from '../../components/KpisSection';
import { RecentBillsSection } from '../../components/RecentBillsSection';
import * as styles from './styles';

export const OverviewView = () => {
  return (
    <Box sx={styles.container}>
      <KpisSection />
      <RecentBillsSection />
      {/* <RecentPaymentsSection /> */}
    </Box>
  );
};

export default OverviewView;
