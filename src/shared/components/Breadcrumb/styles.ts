import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
};

export const home: StylesProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ':hover': {
    color: 'secondary.dark',
    textDecoration: 'underline',
    transition: 'all 0.3s ease-in-out'
  }
};

export const icon: StylesProps = {
  fontSize: 20,
  mr: 0.5
};

export const separator: StylesProps = {
  m: 0
};
