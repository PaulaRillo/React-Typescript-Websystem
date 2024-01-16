import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  gap: 2
};

export const header: StylesProps = {
  m: 0
};

export const actions: StylesProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  maxWidth: 600,
  gap: 1
};
