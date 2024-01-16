import { useState, useCallback } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { PaymentGroupModal } from '../PaymentGroupModal';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = CellRenderProps;

export const OpenModalCell = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const paymentGroup = data?.outgoingPayment.outgoingPaymentGroupId;
  // const paymentGroupStatus = data?.payment_group.status;
  // const paymentGroupProcessing =
  //   `${data?.payment_group.paid} ${tr('shared.paid')} | ` +
  //   `${data?.payment_group.rejected} ${tr('shared.rejected')} | ` +
  //   `${data?.payment_group.pending} ${tr('shared.pending')}`;
  // const paymentGroupComplete =
  //   `${data?.payment_group.paid} ${tr('shared.paid')} | ` +
  //   `${data?.payment_group.rejected} ${tr('shared.rejected')}`;
  const requester = `${data?.requester?.firstName} ${data?.requester?.lastName}`;

  // "redacted_account_number": "200-*****6756",
  // "account_name": "Emergency Payments Account",

  const originAccount = data?.originAccount.redactedAccountNumber;
  const paidTotalValueCurrency = data?.totalAmountPaid;
  const paidTotalValue = data?.transferSumAmount;
  const submissionDate = data?.createdAt;
  // const conclusionDate = data?.conclusion_date;

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box sx={styles.container}>
      <Typography variant="body2">
        <Link underline="hover" onClick={handleOpen} sx={styles.link}>
          {paymentGroup}
        </Link>
      </Typography>
      <PaymentGroupModal
        open={open}
        onClose={handleClose}
        paymentGroup={paymentGroup}
        // paymentGroupStatus={paymentGroupStatus}
        // paymentGroupProcessing={paymentGroupProcessing}
        // paymentGroupComplete={paymentGroupComplete}
        requester={requester}
        originAccount={originAccount}
        paidTotalValueCurrency={paidTotalValueCurrency}
        paidTotalValue={paidTotalValue}
        submissionDate={submissionDate}
        // conclusionDate={conclusionDate}
      />
    </Box>
  );
};
