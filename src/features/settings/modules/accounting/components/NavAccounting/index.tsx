//material-ui
import { RiHandCoinLine } from 'react-icons/ri';
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
import { Permission, PermissionKey } from 'shared/modules/Permission';

export const NavAccounting = () => {
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
      <Permission matchAll={[PermissionKey.MANAGE_COMPANY]}>
        <Button
          startIcon={<RiHandCoinLine />}
          size="large"
          sx={isActive('/currencies') ? styles.activeButton : styles.button}
          data-path={path.settings.accounting.currencies}
          onClick={handleNavigate}
        >
          {tr('settings.accounting.currencies.title')}
        </Button>
      </Permission>
    </Box>
  );
};
