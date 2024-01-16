import { Box, Button } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import * as styles from './styles';
import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/constants/path';
import { useAppLocation } from 'shared/hooks/useAppLocation';
import { tr } from 'shared/translate';

export const SettingsNav = () => {
  const { isActive } = useAppLocation();

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (event: SyntheticEvent) => {
      navigate(event.currentTarget.getAttribute('data-path') as string);
    },
    [navigate]
  );

  return (
    <Box component="nav" sx={styles.container}>
      <Button
        startIcon={<AccountBalanceWalletOutlinedIcon />}
        size="large"
        sx={
          isActive('/settings/payment-methods')
            ? styles.activeButton
            : styles.button
        }
        data-path={path.vendors.id.settings.paymentMethods}
        onClick={handleNavigate}
      >
        {tr('vendors.vendor.settings.paymentMethods.title')}
      </Button>
    </Box>
  );
};
