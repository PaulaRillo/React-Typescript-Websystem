//material-ui
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
//views
import { HeadLogoView } from 'shared/modules/layout/modules/head';
import { NavView } from 'shared/modules/layout/modules/nav';
import { ToolbarView } from 'shared/modules/layout/modules/toolbar';
//styles
import * as styles from './styles';

export const Default = () => {
  return (
    <Grid id="default-layout" sx={styles.container}>
      <Box sx={styles.asideTop}>
        <HeadLogoView />
      </Box>
      <Box component="header" sx={styles.toolbar}>
        <ToolbarView />
      </Box>
      <Box component="nav" sx={styles.aside}>
        <NavView />
      </Box>
      <Box component="main" sx={styles.main}>
        <Outlet />
      </Box>
    </Grid>
  );
};
