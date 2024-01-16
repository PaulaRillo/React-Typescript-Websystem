import { Stack } from '@mui/material';
import { Nav } from 'features/settings/components/Nav';
import { Outlet } from 'react-router-dom';
import { Header } from 'shared/components/Header';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const RootView = () => {
  return (
    <Stack component="section" id="settings" sx={{ height: '100%' }}>
      <Header title={tr('settings.title')} sx={styles.header} />
      <Nav />
      <Outlet />
    </Stack>
  );
};
