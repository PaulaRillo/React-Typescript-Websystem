import { StylesProps } from 'shared/types/styles-props';

export const dataGrid: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: 2,
  my: 2
};

export const actions: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 2,
  width: '100%'
};

export const seats: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  mx: 1
};

export const loading: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: 'fit-content'
};

export const button: StylesProps = {
  minWidth: 140,
  lineHeight: 1
};
