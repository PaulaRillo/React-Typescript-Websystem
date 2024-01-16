import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  width: 280,
  gap: 0.5
};

export const seats: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  mx: 1
};

export const progress: StylesProps = {
  width: '100%',
  mx: 1,
  borderRadius: 1
};

export const progressLabel: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 500,
  minWidth: 120,
  justifyContent: 'center'
};
