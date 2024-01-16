import { StylesProps } from 'shared/types/styles-props';
import { grey } from '@mui/material/colors';

export const container: StylesProps = {
  display: 'flex',
  width: '100%',
  position: 'sticky',
  bottom: 0,
  borderTop: '1px solid',
  borderColor: grey[200],
  backgroundColor: 'white'
};

export const actions: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  p: 2,
  gap: 2,
  backgroundColor: 'inherit'
};
