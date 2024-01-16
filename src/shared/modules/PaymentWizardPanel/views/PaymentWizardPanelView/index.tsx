//materia-ui
import PaymentIcon from '@mui/icons-material/Payment';
import { Box, Button, Tooltip } from '@mui/material';
import core from 'core.v2';
import { tr } from 'shared/translate';
//resources
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { path } from 'shared/constants/path';
import { AccountBalance } from '../../components/AccountBalance';
import { BillsSelected } from '../../components/BillsSelected';
import { CurrentCurrency } from '../../components/CurrentCurrency';
import { EndingBalance } from '../../components/EndingBalance';
import { OriginAccount } from '../../components/OriginAccount';
import { PaymentTotal } from '../../components/PaymentTotal';
//styles
import { useGetTenantConfigurations } from '../../../../api/queries/useGetTenantConfigurations';
import * as styles from './styles';

export const PaymentWizardPanelView = () => {
  const [isEditable, setIsEditable] = useState<any>(false);
  const { data: allCurrenciesConfigured } = useGetTenantConfigurations();
  const navigate = useNavigate();
  const handleGoToPaymentWizard = useCallback(() => {
    navigate(path.bills.payment.root);
  }, [navigate]);

  useEffect(() => {
    core.store.paymentRequest.init({
      userMfaEnabled: core.store.loggedUser?.mfaEnabled || false,
      userHasPermission: core.store.loggedUser?.role?.permissions.PAY_BILL || false, //prettier-ignore
      allCurrenciesConfigured
    });
  }, [allCurrenciesConfigured]);

  useEffect(() => {
    const listener = core.store.paymentRequest.on(
      'PaymentRequestUpdated',
      ({ data }) => {
        setIsEditable(data.isEditable);
      }
    );
    return () => {
      core.store.paymentRequest.off(listener);
      core.store.paymentRequest.reset();
    };
  }, []);

  return (
    <Box sx={styles.container}>
      <OriginAccount />
      <Box sx={styles.infos}>
        <CurrentCurrency title={tr('shared.currency')} />
        <AccountBalance />
        <PaymentTotal />
        <EndingBalance />
        <BillsSelected />
        <Tooltip title={isEditable ? '' : tr('shared.payNotEnabled')}>
          <span>
            <Button
              variant="contained"
              size="small"
              startIcon={<PaymentIcon />}
              disabled={!isEditable}
              onClick={handleGoToPaymentWizard}
            >
              {tr('shared.pay')}
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};
