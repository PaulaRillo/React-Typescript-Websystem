import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: 680,
  height: 700,
  overflow: 'hidden'
};

export const header: StylesProps = {
  bgcolor: 'grey.100'
};

export const stepper: StylesProps = {
  height: 56,
  width: '100%',
  p: 2,
  borderBottom: '1px solid',
  borderColor: 'grey.200'
};

export const main: StylesProps = {
  width: '100%',
  height: '100%',
  overflow: 'auto'
};
