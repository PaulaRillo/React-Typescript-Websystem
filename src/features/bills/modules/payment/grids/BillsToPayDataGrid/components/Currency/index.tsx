import { Box } from '@mui/material';
import core from 'core.v2';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { tr } from 'shared/translate';
import { useEffect, useMemo, useState } from 'react';
import { AlertPopoverButton } from 'shared/components/AlertPopoverButton';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { IAlert } from 'shared/types/alert';
import * as styles from './styles';

type Props = CellRenderProps;

export const Currency = ({ value, data }: Props) => {
  const invoice: Invoice = data;
  const [currencyMatch, setCurrencyMatch] = useState<boolean>(false);

  useEffect(() => {
    setCurrencyMatch(
      invoice.isPayable(
        core.store.paymentRequest.getOriginAccountCurrencyCode()
      )
    );
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      () => {
        setCurrencyMatch(
          invoice.isPayable(
            core.store.paymentRequest.getOriginAccountCurrencyCode()
          )
        );
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, [invoice]);

  const alert = useMemo<IAlert>(
    () => ({
      severity: 'error',
      title: tr('bills.payment.billsToPay.currency.error.mismatch.title'),
      message: tr('bills.payment.billsToPay.currency.error.mismatch.message')
    }),
    []
  );

  return (
    <Box sx={styles.container}>
      {value || '--'}
      {!currencyMatch && <AlertPopoverButton alert={alert} />}
    </Box>
  );
};
