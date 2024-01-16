import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%'
};

export const content: StylesProps = {
  height: 'fit-content',
  width: '100%',
  maxWidth: { sm: 960, xl: 1120 },
  my: 2
};

export const preview: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  bgcolor: 'white',
  width: '100%',
  height: 'auto',
  p: 4,
  mb: 2
};

export const fromTo: StylesProps = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 2,
  mt: 1
};

export const dates: StylesProps = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 2,
  mt: 2,
  mb: 3
};
