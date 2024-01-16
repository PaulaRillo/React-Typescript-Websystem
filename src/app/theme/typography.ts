import { ThemeOptions } from '@mui/material';

export const ubuntu = '"Ubuntu", sans-serif';
export const roboto = '"Roboto", sans-serif';

export const typography: ThemeOptions = {
  typography: {
    h1: {
      fontFamily: ubuntu,
      fontWeight: 500,
      fontSize: 56
    },
    h2: {
      fontFamily: ubuntu,
      fontWeight: 500,
      fontSize: 48
    },
    h3: {
      fontFamily: ubuntu,
      fontWeight: 500,
      fontSize: 32
    },
    h4: {
      fontFamily: ubuntu,
      fontWeight: 500,
      fontSize: 28
    },
    h5: {
      fontFamily: ubuntu,
      fontWeight: 500,
      fontSize: 24
    },
    h6: {
      fontFamily: ubuntu,
      fontWeight: 500,
      fontSize: 20
    },
    body1: {
      fontFamily: roboto
    },
    body2: {
      fontFamily: roboto
    },
    caption: {
      fontFamily: ubuntu
    },
    overline: {
      fontFamily: ubuntu
    },
    button: {
      fontFamily: ubuntu,
      textTransform: 'unset'
    },
    subtitle1: {
      fontFamily: ubuntu,
      fontWeight: 500,
      fontSize: 12
    },
    subtitle2: {
      fontFamily: ubuntu,
      fontSize: 12
    }
  }
};
