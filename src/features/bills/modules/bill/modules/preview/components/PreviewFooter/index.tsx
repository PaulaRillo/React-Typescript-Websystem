import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const PreviewFooter = () => {
  const { data } = useGetInvoice();

  const hasPaymentTerm = useMemo(() => data && data?.paymentTerm, [data]);

  if (!data) return <></>;

  return (
    <Box sx={styles.container}>
      {hasPaymentTerm && data?.paymentTerm && (
        <Box sx={styles.section}>
          <Typography variant="overline" fontWeight={700}>
            {tr('bills.bill.root.preview.paymentTerms')}
          </Typography>
          <Typography variant="body2">
            {data.paymentTerm?.paymentTermsGroupName ?? ''}
          </Typography>
          <Box sx={styles.subSection}>
            <Typography variant="body2">
              {tr('bills.bill.additionalMonths')}
            </Typography>
            <Typography variant="body2">
              {data.paymentTerm?.numberOfAdditionalMonths ?? ''}
            </Typography>
          </Box>
          <Box sx={styles.subSection}>
            <Typography variant="body2">
              {tr('bills.bill.additionalDays')}
            </Typography>
            <Typography variant="body2">
              {data.paymentTerm.numberOfAdditionalDays ?? ''}
            </Typography>
          </Box>
          <Box sx={styles.subSection}>
            <Typography variant="body2">
              {tr('bills.bill.numberInstallments')}
            </Typography>
            <Typography variant="body2">
              {data.paymentTerm?.numberOfInstallments ?? ''}
            </Typography>
          </Box>
          <Box sx={styles.subSection}>
            <Typography variant="body2">
              {tr('bills.bill.latePayment')}
            </Typography>
            <Typography variant="body2">
              {`${data.paymentTerm?.latePaymentInterestRateCharge}%`}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
