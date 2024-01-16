import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: 3,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
  bgcolor: 'grey.100'
};

export const wizard: StylesProps = {
  bgcolor: 'white',
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  width: 640,
  height: 600
};
