//material-ui
import { Box } from '@mui/material';
//core-components
import { Nav } from 'features/settings/modules/personal/components/Nav';
//translate
import { Outlet } from 'react-router-dom';
//styles
import * as styles from './styles';

export const PersonalRootView = () => {
  return (
    <Box component="section" sx={styles.container}>
      <Nav />
      <Box component="main" sx={styles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PersonalRootView;
