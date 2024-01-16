import { StylesProps } from 'shared/types/styles-props';

export const form: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 420,
  gap: 3
};

export const inputs: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

export const actions: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

export const sendCode: StylesProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 4
};

export const error: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1
};
