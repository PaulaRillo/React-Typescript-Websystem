import { Box } from '@mui/material';
import { tr } from 'shared/translate';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { useGetDestinationAccounts } from 'shared/api/queries/useGetDestinationAccounts';
import { Accordion } from 'shared/components/Accordion';
import { DestinationAccount } from '../../components/DestinationAccount';
import * as styles from './styles';

export const DestinationAccountSectionView = () => {
  const { data } = useGetInvoice();
  const vendorId = data?.invoiceFrom.id || '';
  useGetDestinationAccounts(vendorId, { enabled: !!vendorId });

  return (
    <Box sx={styles.container}>
      <Accordion defaultExpanded title={tr('bills.bill.root.payment.title')}>
        <DestinationAccount />
      </Accordion>
    </Box>
  );
};
