import { StylesProps } from 'shared/types/styles-props';

export const content: StylesProps = {
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  width: '100%',
  maxWidth: 928,
  minHeight: 220,
  gap: 3,
  mt: 4,
  mb: 4,
  zIndex: 'fab',
  pb: 3
};

export const header: StylesProps = {
  p: 3
};

export const form: StylesProps = {
  display: 'inline-flex',
  width: '100%',
  p: '24px 24px 0',
  gap: 2
};

export const button: StylesProps = {
  display: 'flex',
  justifyContent: 'flex-end'
};
