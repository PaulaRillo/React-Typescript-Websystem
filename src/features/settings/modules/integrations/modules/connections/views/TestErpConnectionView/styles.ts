import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  overflow: 'auto',
  width: '100%',
  height: '100%',
  p: 2
};

export const form: StylesProps = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: 3
};

export const inputs: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

export const textField: StylesProps = {
  width: '100%'
};

export const error: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1
};
