import { Box } from '@mui/material';
import { ApprovalsSectionView } from '../../modules/approvals';
import { PaymentsSectionView } from '../../modules/payments';
import { ActivitiesSectionView } from '../../modules/activities';
import * as styles from './styles';

export const OverviewView = () => {
  return (
    <Box sx={styles.container}>
      <ApprovalsSectionView />
      <PaymentsSectionView />
      <ActivitiesSectionView />
    </Box>
  );
};

export default OverviewView;
