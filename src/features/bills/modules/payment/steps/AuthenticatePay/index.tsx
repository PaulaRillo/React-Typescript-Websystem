import { Box, Typography } from '@mui/material';
import core from 'core.v2';
import { tr } from 'shared/translate';
import { useEffect } from 'react';
import { Header } from 'shared/components/Header';
import { PaymentMfaForm } from '../../components/PaymentMfaForm';
import * as styles from './styles';

export const AuthenticatePay = () => {
  useEffect(() => {
    core.store.paymentRequest.setIsEditable(false);
    return () => {
      core.store.paymentRequest.setIsEditable(true);
    };
  }, []);

  return (
    <Box sx={styles.container}>
      <Header
        title={`${tr('shared.authenticate')}/${tr('shared.pay')}`}
        subTitle={tr('bills.payment.authenticatePay.description')}
        hideCrumbs
        sx={styles.header}
      />
      <Box sx={styles.content}>
        <Typography variant="h6" sx={styles.title}>
          {tr('bills.payment.authenticatePay.cta')}
        </Typography>
        <PaymentMfaForm />
      </Box>
    </Box>
  );
};
