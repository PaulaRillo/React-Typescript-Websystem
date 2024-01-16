import { StylesProps } from 'shared/types/styles-props';

export const header: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

export const logo: StylesProps = {
  mb: 2
};

export const title: StylesProps = {
  color: 'text.primary',
  mb: 1
};

export const subTitle: StylesProps = {
  color: 'text.secondary',
  textAlign: 'center',
  px: 2
};
