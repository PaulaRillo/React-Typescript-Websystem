import { Box } from '@mui/material';
import { OutgoingPaymentsDataGrid } from '../../../../../../../outgoingPayments/components/OutgoingPaymentsDataGrid';
import { useParams } from 'react-router-dom';

import * as styles from './styles';

export const PaymentsView = () => {
  const { id } = useParams();
  return (
    <Box sx={styles.container}>
      <OutgoingPaymentsDataGrid
        billId={id}
        overlayNoRowsTemplate={'outgoing.payment.noRowsMessage'}
      />
    </Box>
  );
};

export default PaymentsView;
