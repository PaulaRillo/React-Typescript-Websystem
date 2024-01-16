import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  color: 'info.main',
  cursor: 'pointer',
  '&:hover': {
    color: 'info.light',
    textDecoration: 'underline'
  }
};
