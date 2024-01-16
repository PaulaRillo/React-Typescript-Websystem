import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  minHeight: 320,
  py: 2,
  gap: 1
};

export const comments: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflow: 'auto',
  pb: 2
};
