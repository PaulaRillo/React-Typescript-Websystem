import { Box, Typography } from '@mui/material';
import { Modal, ModalHeader } from 'shared/components/Modal';
//translate
import { tr } from 'shared/translate';
import { OutgoingPaymentsGroupDataGrid } from '../OutgoingPaymentsGroupDataGrid';
//styles
import * as styles from './styles';

type Props = {
  open: boolean;
  paymentGroup: string;
  // paymentGroupStatus: string;
  // paymentGroupProcessing: string;
  // paymentGroupComplete: string;
  requester: string;
  originAccount: string;
  paidTotalValueCurrency: string;
  paidTotalValue: string;
  submissionDate: string;
  // conclusionDate: string;
  onClose: () => void;
};

export const PaymentGroupModal = ({
  open,
  paymentGroup,
  // paymentGroupStatus,
  // paymentGroupProcessing,
  // paymentGroupComplete,
  requester,
  originAccount,
  paidTotalValueCurrency,
  paidTotalValue,
  submissionDate,
  // conclusionDate,
  onClose
}: Props) => {
  return (
    <Modal fullScreen open={open} onClose={onClose} sx={styles.container}>
      <ModalHeader
        title={tr('outgoing.payment.outgoingPaymentGroup')}
        divider
        onClose={onClose}
      />
      <Box sx={styles.header}>
        <Typography variant="h3">{paymentGroup}</Typography>
        <Box sx={styles.wrap}>
          <Typography variant="caption" sx={styles.title}>
            {tr('outgoing.payment.requester')}
          </Typography>
          <Typography variant="body2" sx={styles.value}>
            {requester}
          </Typography>
        </Box>
        <Box sx={styles.wrap}>
          <Typography variant="caption" sx={styles.title}>
            {tr('outgoing.payment.originAccount')}
          </Typography>
          <Typography variant="body2" sx={styles.value}>
            {originAccount}
          </Typography>
        </Box>
        <Box sx={styles.wrap}>
          <Typography variant="caption" sx={styles.title}>
            {tr('outgoing.payment.groupTotalValue')}
          </Typography>
          <Typography variant="body2" sx={styles.value}>
            {paidTotalValueCurrency}
            {paidTotalValue}
          </Typography>
        </Box>
        <Box sx={styles.wrap}>
          <Typography variant="caption" sx={styles.title}>
            {tr('outgoing.payment.paidTotalValue')}
          </Typography>
          <Typography variant="body2" sx={styles.value}>
            {paidTotalValueCurrency}
            {paidTotalValue}
          </Typography>
        </Box>
        <Box sx={styles.wrap}>
          <Typography variant="caption" sx={styles.title}>
            {tr('outgoing.payment.submissionDate')}
          </Typography>
          <Typography variant="body2" sx={styles.value}>
            {submissionDate}
          </Typography>
        </Box>
        {/* <Box sx={styles.last}>
          <Typography variant="caption" sx={styles.title}>
            {tr('outgoing.payment.conclusionDate')}
          </Typography>
          <Typography variant="body2" sx={styles.value}>
            {conclusionDate}
          </Typography>
        </Box> */}
        {/* {paymentGroupStatus === 'Complete' ? (
          <Box sx={styles.complete}>
            <Typography variant="caption" sx={styles.title}>
              {paymentGroupStatus}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {paymentGroupComplete}
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.processing}>
            <Typography variant="caption" sx={styles.title}>
              {paymentGroupStatus}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {paymentGroupProcessing}
            </Typography>
          </Box>
        )} */}
      </Box>
      <OutgoingPaymentsGroupDataGrid />
    </Modal>
  );
};
