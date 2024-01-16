import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Box, Button, Typography } from '@mui/material';
import core from 'core.v2';
import { tr } from 'shared/translate';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from 'shared/components/Header';
import { path } from 'shared/constants/path';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import * as styles from './styles';

export const Success = () => {
  const navigate = useNavigate();
  const { format } = useFormatValue();

  const handlePayMoreBills = useCallback(() => {
    navigate(path.bills.root);
  }, [navigate]);

  const localTotal = useMemo(() => {
    return format(core.store.paymentRequest.getTotal(), 'total');
  }, [format]);

  const localCurrency = useMemo(() => {
    return core.store.paymentRequest.originAccount?.currencyCode;
  }, []);

  useEffect(() => {
    core.store.paymentRequest.reset();
    core.store.paymentRequest.setIsEditable(true);
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
        <CheckCircleOutlineRoundedIcon
          color="success"
          sx={{ width: 96, height: 96 }}
        />
        <Typography variant="h6" sx={styles.subTitle}>
          {tr('shared.paymentRequestSubmittedSuccess.message', {
            currency: localCurrency,
            total: localTotal,
            time: '6 pm CST'
          })}
        </Typography>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={handlePayMoreBills}
        >
          {tr('shared.payMoreBills')}
        </Button>
      </Box>
    </Box>
  );
};
