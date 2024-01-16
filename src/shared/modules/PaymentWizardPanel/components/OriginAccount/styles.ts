import { StylesProps } from 'shared/types/styles-props';

export const popover: StylesProps = {
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)'
};

export const button: StylesProps = {
  height: 56,
  minWidth: 200,
  bgcolor: 'grey.50'
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flex: 1,
  with: '100%',
  height: '100%'
};

export const titleContainer: StylesProps = {
  display: 'flex',
  gap: 0.5
};
