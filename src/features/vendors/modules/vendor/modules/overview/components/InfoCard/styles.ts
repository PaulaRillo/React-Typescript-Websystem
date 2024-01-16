import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  p: 1,
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  minWidth: 160,
  bgcolor: 'transparent'
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  mx: 2
};

export const title: StylesProps = {
  fontWeight: 500,
  color: 'text.primary'
};
export const value: StylesProps = {
  color: 'text.primary'
};

export const description: StylesProps = {
  color: 'text.secondary'
};

export const infoIcon: StylesProps = {
  fontSize: 22,
  color: 'grey.400'
};

export const icon: StylesProps = {
  color: 'primary.main'
};
