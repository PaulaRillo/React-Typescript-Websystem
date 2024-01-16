import { Box, Button, Typography } from '@mui/material';
import core from 'core.v2';
import { ErrorType } from 'core.v2/domain/@shared/types/error.type';
import { useCallback, useEffect, useState } from 'react';
import { ActionRenderProps } from 'shared/modules/CreationWizard/types/Action';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = ActionRenderProps;

export const BillsToPayAction = ({ setActiveStep }: Props) => {
  const [isPayable, setIsPayable] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState<ErrorType[]>([]);

  useEffect(() => {
    setIsPayable(core.store.paymentRequest.isPayable());
    setErrors(core.store.paymentRequest.errors);
    setHasError(core.store.paymentRequest.hasError);
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setIsPayable(data.isPayable);
        setHasError(data.hasError);
        setErrors(data.errors);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  const handleClick = useCallback(() => {
    setActiveStep((prev) => prev + 1);
  }, [setActiveStep]);

  return (
    <Box sx={styles.container}>
      {hasError && (
        <Typography mr={1}>
          {tr(`paymentRequest.${errors[0].context}`)}
        </Typography>
      )}
      <Button variant="contained" disabled={!isPayable} onClick={handleClick}>
        {tr('shared.next')}
      </Button>
    </Box>
  );
};
