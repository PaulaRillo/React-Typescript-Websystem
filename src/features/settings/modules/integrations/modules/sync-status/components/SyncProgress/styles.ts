import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  p: 2
};

export const title: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  mx: 1,
  mb: 1
};

export const progress: StylesProps = {
  mx: 1,
  borderRadius: 12,
  overFlow: 'hidden'
};
