import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: 200,
  height: 140
};

export const status: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  height: '100%'
};

export const text: StylesProps = {
  textAlign: 'center',
  color: 'text.disabled'
};

export const icon: StylesProps = {
  width: 32,
  height: 32,
  animation: 'spin 1s infinite linear'
};
