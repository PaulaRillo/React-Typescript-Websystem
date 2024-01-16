import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column'
};

export const header: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  gap: 2
};

export const title: StylesProps = {
  color: 'text.primary',
  fontSize: 32
};

export const titleContainer: StylesProps = {
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  gap: 1
};
