import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
};

export const header: StylesProps = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2
};

export const title: StylesProps = {
  flexGrow: 1,
  mt: 2
};

export const button: StylesProps = {
  justifyContent: 'center'
};
