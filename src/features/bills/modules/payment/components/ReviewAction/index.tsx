import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import core from 'core.v2';
import { tr } from 'shared/translate';
import { useCallback, useEffect, useState } from 'react';
import { ActionRenderProps } from 'shared/modules/CreationWizard/types/Action';
import * as styles from './styles';

type Props = ActionRenderProps;

type OnChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
) => void;

export const ReviewAction = ({ setActiveStep }: Props) => {
  const [wasReviewed, setWasReviewed] = useState(false);
  const [isPayable, setIsPayable] = useState(false);

  useEffect(() => {
    setWasReviewed(core.store.paymentRequest.getWasReviewed());
    setIsPayable(core.store.paymentRequest.isPayable());
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setWasReviewed(data.wasReviewed);
        setIsPayable(data.isPayable);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
    };
  }, []);

  const handleClick = useCallback(() => {
    setActiveStep((prev) => prev + 1);
  }, [setActiveStep]);

  const handleConfirmReview = useCallback<OnChange>((_, checked) => {
    core.store.paymentRequest.setWasReviewed(checked);
  }, []);

  return (
    <Box sx={styles.container}>
      <FormControlLabel
        label={tr('bills.payment.review.confirmation')}
        control={
          <Checkbox
            size="small"
            checked={wasReviewed}
            onChange={handleConfirmReview}
          />
        }
      />
      <Button
        variant="contained"
        disabled={!isPayable || !wasReviewed}
        onClick={handleClick}
      >
        {tr('shared.next')}
      </Button>
    </Box>
  );
};
