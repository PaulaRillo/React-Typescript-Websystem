import { Autocomplete, Box, TextField } from '@mui/material';
import core from 'core.v2';
import { useEffect, useMemo, useState } from 'react';
import { useGetCashFlows } from 'shared/api/queries/useGetCashFlows';
import { AlertPopoverButton } from 'shared/components/AlertPopoverButton';
import { IAlert } from 'shared/types/alert';
import * as styles from './styles';
import { tr } from 'shared/translate';

export const CashFlowOptions = () => {
  const { data, isLoading } = useGetCashFlows();
  const [isCashFlowRelevant, setIsCashFlowRelevant] = useState(core.store.paymentRequest.isCashFlowRelevant); //prettier-ignore

  const alert = useMemo<IAlert>(
    () => ({
      severity: 'error',
      title: tr('bills.payment.cashFlowOptions.error.title'),
      message: tr('bills.payment.cashFlowOptions.error.message')
    }),
    []
  );

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setIsCashFlowRelevant(data.isCashFlowRelevant);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  if (!isCashFlowRelevant) {
    return <></>;
  }

  return (
    <>
      <Autocomplete
        disablePortal
        id="cash-flows"
        disabled={isLoading}
        defaultValue={core.store.paymentRequest.cashFlow}
        options={data || []}
        sx={{ width: '100%', maxWidth: 400, ml: 3 }}
        renderInput={(params) => (
          <Box sx={styles.alertContainer}>
            {!core.store.paymentRequest.cashFlow && (
              <AlertPopoverButton alert={alert} />
            )}
            <TextField {...params} label={tr('shared.cashFlow')} />
          </Box>
        )}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, value) => {
          core.store.paymentRequest.setCashFlow(value || undefined);
        }}
      />
    </>
  );
};
