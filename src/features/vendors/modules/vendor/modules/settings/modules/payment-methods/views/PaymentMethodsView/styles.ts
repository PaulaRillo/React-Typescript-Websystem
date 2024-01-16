import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 3
};

export const banks: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 2,
  minHeight: 360
};

export const header: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
};
