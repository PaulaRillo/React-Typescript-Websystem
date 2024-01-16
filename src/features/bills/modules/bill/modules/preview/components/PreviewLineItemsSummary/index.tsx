import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const PreviewLineItemsSummary = () => {
  const { data } = useGetInvoice();
  const { formatCurrencyValue, formatPercent } = useFormatValue();

  const summary = useMemo(() => {
    if (!data) return undefined;
    // prettier-ignore
    return Object.entries({
      [tr('bills.bill.root.preview.subtotal')]: formatCurrencyValue(data.summary.subtotal),
      [tr('bills.bill.root.preview.discount_percent')]: formatPercent(data.summary.discountPercent),
      [tr('bills.bill.root.preview.discount')]: formatCurrencyValue(data.summary.totalDiscountAmount),
      [tr('bills.bill.root.preview.totalDownPayment')]: formatCurrencyValue(data.summary.totalDownPaymentAmount),
      [tr('bills.bill.root.preview.freight')]: formatCurrencyValue(data.summary.additionalExpenses),
      [tr('bills.bill.root.preview.totalTax')]: formatCurrencyValue(data.summary.totalTax),
      [tr('bills.bill.root.preview.totalPaymentDue')]: formatCurrencyValue(data.summary.invoiceTotal),
      [tr('shared.paidToDate')]: formatCurrencyValue(data.summary.paidToDateAmount),
      [tr('bills.bill.balanceDue')]: formatCurrencyValue(data.summary.balanceDue)
    });
  }, [data, formatCurrencyValue, formatPercent]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        {summary ? (
          summary.map(([title, value], idx, arr) => {
            const isLast = idx === arr.length - 1;
            return (
              <Box key={title} sx={styles.line(isLast)}>
                <Typography
                  variant={isLast ? 'h6' : 'body2'}
                  fontWeight={isLast ? 700 : 500}
                >
                  {title}
                </Typography>
                <Typography
                  variant={isLast ? 'h6' : 'body2'}
                  fontWeight={isLast ? 700 : undefined}
                >
                  {value}
                </Typography>
              </Box>
            );
          })
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
