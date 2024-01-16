import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  mt: 4,
  border: '1px solid',
  borderColor: 'grey.200',
  borderRadius: 2,
  maxWidth: 600
};

export const header: StylesProps = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  borderColor: 'grey.200',
  p: 2
};

export const content: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
  p: 2
};
