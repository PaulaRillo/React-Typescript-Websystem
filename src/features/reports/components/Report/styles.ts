import { StylesProps } from 'shared/types/styles-props';

export const body: StylesProps = {
  display: 'flex',
  justifyContent: 'space-between',
  bgcolor: 'grey.100',
  p: 3
};

export const marks: StylesProps = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2
};

export const iconButton: StylesProps = {
  alignSelf: 'flex-end'
};
