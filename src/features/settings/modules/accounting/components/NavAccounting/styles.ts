import { StylesProps } from 'shared/types/styles-props';

export const aside: StylesProps = {
  gridArea: 'aside',
  p: 2
};

export const button: StylesProps = {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-start',
  fontSize: '13px',
  px: 2,
  textAlign: 'left',
  lineHeight: '13px'
};

export const activeButton: StylesProps = {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-start',
  fontSize: '13px',
  px: 2,
  bgcolor: 'grey.100',
  textAlign: 'left',
  lineHeight: '13px'
};
