import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
};

export const header: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  mx: 1,
  mb: 1,
  gap: 0.5
};

export const progress: StylesProps = {
  width: '100%',
  borderRadius: 12,
  overFlow: 'hidden'
};
