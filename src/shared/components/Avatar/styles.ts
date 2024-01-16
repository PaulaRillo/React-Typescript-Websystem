import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 1
};

export const avatar: StylesProps = {
  width: 24,
  height: 24,
  bgcolor: 'secondary.main'
};

export const initials: StylesProps = {
  color: 'text.primary',
  fontSize: 10,
  fontWeight: 500
};
