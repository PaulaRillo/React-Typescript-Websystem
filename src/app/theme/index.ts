//material-ui
import { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';
//theme
import { components } from './components';
import { palette } from './palette';
import { typography } from './typography';

export const lightTheme: ThemeOptions = {
  ...palette,
  ...typography,
  ...components
};

export const theme = createTheme(lightTheme);

/*
 * Documentation:
 * https://material-ui.com/customization/themes/
 *
 * Default Theme:
 * https://next--material-ui.netlify.app/customization/default-theme/
 *
 */
