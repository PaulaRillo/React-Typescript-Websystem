import { Skeleton } from '@material-ui/core';
import { Box, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { useMemo } from 'react';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { Accordion } from 'shared/components/Accordion';
import { Info } from 'shared/components/Info';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import { getLocaleDate } from '../../../../../../../../shared/utils/string/getLocaleDate';
import * as styles from './styles';

export const DetailsSectionView = () => {
  const { data } = useGetInvoice();
  const loader = useMemo(() => <Skeleton width={104} />, []);
  const { formatCurrencyValue } = useFormatValue();

  return (
    <Box sx={styles.container}>
      <Accordion defaultExpanded title={tr('bills.bill.root.details.title')}>
        <Info title={tr('bills.bill.root.details.vendor')}>
          <Typography variant="body2" color="info.main">
            {data ? data.invoiceFrom?.name : loader}
          </Typography>
        </Info>
        <Info title={tr('bills.bill.root.details.currency')}>
          <Typography variant="body2">
            {data
              ? `${data.currency.name} (${data.currency.iso4217Alpha3})`
              : loader}
          </Typography>
        </Info>
        <Info title={tr('bills.bill.balanceDue')}>
          <Typography variant="body2">
            {data ? formatCurrencyValue(data.summary.balanceDue) : loader}
          </Typography>
        </Info>
        <Info title={tr('bills.bill.invoiceDate')}>
          <Typography variant="body2">
            {data ? getLocaleDate(data?.createdAt) : loader}
          </Typography>
        </Info>
        <Info title={tr('bills.bill.dueDate')}>
          <Typography variant="body2">
            {data ? getLocaleDate(data?.dueDate) : loader}
          </Typography>
        </Info>
        <Info title={tr('bills.bill.root.details.postingDate')}>
          <Typography variant="body2">
            {data ? getLocaleDate(data?.postingDate) : loader}
          </Typography>
        </Info>
      </Accordion>
    </Box>
  );
};
