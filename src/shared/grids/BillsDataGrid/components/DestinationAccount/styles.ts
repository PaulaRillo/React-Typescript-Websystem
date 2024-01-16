import { StylesProps } from 'shared/types/styles-props';

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  height: '100%'
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
