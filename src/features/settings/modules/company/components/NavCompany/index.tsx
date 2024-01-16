//material-ui
import {
  AccountBalanceWalletOutlined,
  BusinessOutlined,
  DisplaySettingsOutlined,
  PaidOutlined
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
//core-components
import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/constants/path';
import { useAppLocation } from 'shared/hooks/useAppLocation';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

export const NavCompany = () => {
  const { isActive } = useAppLocation();

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (event: SyntheticEvent) => {
      navigate(event.currentTarget.getAttribute('data-path') as string);
    },
    [navigate]
  );

  return (
    <Box component="nav" sx={styles.aside}>
      <Button
        startIcon={<BusinessOutlined />}
        size="large"
        sx={
          isActive('/settings/company/details')
            ? styles.activeButton
            : styles.button
        }
        data-path={path.settings.company.details}
        onClick={handleNavigate}
      >
        {tr('settings.company.title')}
      </Button>
      <Button
        startIcon={<DisplaySettingsOutlined />}
        size="large"
        sx={
          isActive('/settings/company/general')
            ? styles.activeButton
            : styles.button
        }
        data-path={path.settings.company.general}
        onClick={handleNavigate}
      >
        {tr('settings.company.general.title')}
      </Button>
      <Button
        startIcon={<AccountBalanceWalletOutlined />}
        size="large"
        sx={
          isActive('/settings/company/bank-accounts')
            ? styles.activeButton
            : styles.button
        }
        data-path={path.settings.company.bankAccounts}
        onClick={handleNavigate}
      >
        {tr('settings.company.nav.bankAccounts')}
      </Button>
      <Button
        startIcon={<PaidOutlined />}
        size="large"
        sx={
          isActive('/settings/company/currencies')
            ? styles.activeButton
            : styles.button
        }
        data-path={path.settings.company.currencies}
        onClick={handleNavigate}
      >
        {tr('settings.accounting.currencies.title')}
      </Button>
    </Box>
  );
};
