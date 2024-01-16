import { Box } from '@mui/material';
import { Header } from '../../../shared/Header';
import * as styles from './styles';
import { BanksView } from '../BanksView';
import { tr } from 'shared/translate';

export const PaymentMethodsView = () => {
  return (
    <Box sx={styles.container}>
      <Header
        title={tr('vendors.vendor.settings.paymentMethods.title')}
        subTitle={tr('vendors.vendor.settings.paymentMethods.subTitle')}
      />
      <BanksView />
    </Box>
  );
};

export default PaymentMethodsView;
