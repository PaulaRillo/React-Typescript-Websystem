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

export const loading: StylesProps = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: 'fit-content',
  height: '100%'
};
