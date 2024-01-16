import { StylesProps } from '../../../../../../types/styles-props';

export const button: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  color: 'text.secondary',
  minWidth: 336,
  height: 56,
  borderRadius: 40,
  border: '1px solid',
  textAlign: 'left',
  borderColor: 'grey.300',
  px: 2,
  bgcolor: 'grey.50',
  ':hover': {
    color: 'text.primary',
    bgcolor: 'white',
    borderColor: 'grey.400',
    transition: 'all 0.25s ease-in-out',
    cursor: 'pointer'
  },
  ':hover #search-icon': {
    color: 'secondary.main',
    transition: 'all 0.5s ease-in-out'
  },
  ':not(:hover)': {
    color: 'text.secondary',
    bgcolor: 'grey.50',
    borderColor: 'grey.300',
    transition: 'all 0.3s ease-in-out'
  },
  ':focus': {
    color: 'text.primary',
    bgcolor: 'grey.100',
    borderColor: 'grey.400',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer'
  }
};

export const icon: StylesProps = {
  color: 'grey.400',
  fontSize: 21.5,
  mr: 1
};

export const label: StylesProps = {
  color: 'grey.500',
  mr: 2
};
