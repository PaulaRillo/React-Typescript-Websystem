import { green, orange, brown } from '@mui/material/colors';
import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = { m: 4 };

export const header: StylesProps = {
  display: 'flex',
  bgcolor: 'grey.100',
  px: 2,
  py: 3,
  gap: 4
};

export const title: StylesProps = {
  color: 'text.secondary'
};

export const value: StylesProps = {
  color: 'text.primary',
  fontWeight: 500
};

export const wrap: StylesProps = { flexDirection: 'flex' };

export const composed: StylesProps = { display: 'inline-grid' };

export const last: StylesProps = { flexGrow: 1, textAlign: 'start' };

export const complete: StylesProps = {
  textAlign: 'end',
  color: green,
  bgcolor: green[50],
  borderRadius: 2,
  border: '1px solid #e0e0e0',
  px: 2,
  py: 1,
  fontWeight: 700
};

export const processing: StylesProps = {
  textAlign: 'end',
  color: brown[900],
  bgcolor: orange[50],
  borderRadius: 2,
  border: '1px solid #e0e0e0',
  px: 2,
  py: 1,
  fontWeight: 700
};
