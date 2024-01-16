//material-ui
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
//core-components
import { NavAccounting } from 'features/settings/modules/accounting/components/NavAccounting';
//styles
import * as styles from './styles';

export const AccountingRootView = () => {
  return (
    <Box sx={styles.container}>
      <NavAccounting />
      <Box sx={styles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountingRootView;
