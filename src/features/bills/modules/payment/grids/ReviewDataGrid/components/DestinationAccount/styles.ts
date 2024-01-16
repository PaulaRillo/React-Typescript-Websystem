import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  alignItems: 'center'
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
};

export const alias: StylesProps = {
  display: 'flex',
  gap: 1,
  color: 'primary.main'
};

export const button: StylesProps = {
  height: 'fit-content',
  p: 1
};

export const popover: StylesProps = {
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)'
};

export const alertButton: StylesProps = {
  ml: 0.5,
  color: 'error.main'
};
