import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
};

export const header: StylesProps = {
  m: 0
};

export const content: StylesProps = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%'
};

export const title: StylesProps = {
  maxWidth: '40%',
  mb: 4,
  textAlign: 'center'
};

export const subTitle: StylesProps = {
  maxWidth: '40%',
  mt: 4,
  textAlign: 'center'
};

export const button: StylesProps = {
  mt: 4
};
