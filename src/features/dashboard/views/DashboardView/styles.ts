import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  m: 2,
  gap: 2
};

export const content: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  flexGrow: 1,
  overflow: 'auto',
  ml: -1,
  mb: -2
};
