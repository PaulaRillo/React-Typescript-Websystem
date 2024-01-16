import { blue, green, orange, red } from '@mui/material/colors';
import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  gap: 1
};

export const valueContainer: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: '50%',
  width: 22,
  height: 22
};

export const value: StylesProps = {};

export const bg = {
  info: blue[100],
  success: green[100],
  warning: orange[100],
  error: red[100]
};

export const color = {
  info: blue[900],
  success: green[900],
  warning: orange[900],
  error: red[900]
};
