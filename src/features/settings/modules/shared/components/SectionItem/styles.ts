import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  height: 56,
  px: 3,
  py: 2,
  borderBottom: '1px solid',
  borderColor: 'grey.300',
  ':hover': {
    transition: 'all 0.3s ease-in-out',
    bgcolor: 'grey.50'
  },
  ':not(:hover)': {
    transition: 'all 0.4s ease-in-out'
  },
  ':last-child': { borderBottom: 'none' },
  cursor: 'pointer'
};

export const key: StylesProps = {
  textTransform: 'uppercase',
  color: 'text.primary',
  minWidth: '33%'
};
export const value: StylesProps = {
  color: 'text.secondary',
  width: '100%'
};

export const arrowIcon: StylesProps = {
  color: 'text.secondary',
  fontSize: 14
};
