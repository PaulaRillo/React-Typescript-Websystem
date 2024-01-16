import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.2,
  width: '100%',
  minWidth: 200
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
  height: '100%'
};

export const button: StylesProps = {
  height: 'fit-content',
  width: '100%',
  minWidth: 200,
  p: 1.5,
  px: 2
};

export const buttonContainer: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  gap: 0.2,
  minWidth: 200
};
