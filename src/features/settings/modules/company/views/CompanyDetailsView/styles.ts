import { StylesProps } from 'shared/types/styles-props';
export const title: StylesProps = {
  mt: 2
};
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
  ':last-child': { borderBottom: 'none' }
};

export const key: StylesProps = {
  textTransform: 'uppercase',
  color: 'text.primary',
  minWidth: 200
};
export const value: StylesProps = {
  color: 'text.secondary',
  width: '100%'
};
