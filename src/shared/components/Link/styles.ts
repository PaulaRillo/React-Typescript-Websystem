import { StylesProps } from 'shared/types/styles-props';

export const link: StylesProps = {
  color: 'text.disabled',
  textDecoration: 'none',
  ':hover': {
    color: 'text.secondary',
    textDecoration: 'underline',
    transition: 'all 0.3s ease-in-out'
  }
};
