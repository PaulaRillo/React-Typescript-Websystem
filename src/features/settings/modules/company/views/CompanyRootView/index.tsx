//material-ui
import { Box } from '@mui/material';
//core-components
import { NavCompany } from '../../components/NavCompany';
//translate
import { Outlet } from 'react-router-dom';
//styles
import * as styles from './styles';

export const CompanyRootView = () => {
  return (
    <Box component="section" sx={styles.container}>
      <NavCompany />
      <Box component="main" sx={styles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};
