import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  alignItems: 'flex-start'
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%'
};

export const alias: StylesProps = {
  display: 'flex',
  gap: 1,
  color: 'primary.main'
};

export const button: StylesProps = {
  ml: -1,
  height: '100%',
  width: '100%',
  borderRadius: 'none'
};

export const popover: StylesProps = {
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)'
};

export const alertButton: StylesProps = {
  ml: 0.5,
  color: 'error.main'
};

export const alertContainer: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
};
