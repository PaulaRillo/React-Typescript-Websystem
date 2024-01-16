import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

export const startContainer: StylesProps = {
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  gap: 1,
  height: 28,
  cursor: 'pointer'
};

export const icon: StylesProps = {
  width: 20,
  height: 20
};

export const end: StylesProps = {
  display: 'flex',
  gap: 1,
  mx: 1
};
