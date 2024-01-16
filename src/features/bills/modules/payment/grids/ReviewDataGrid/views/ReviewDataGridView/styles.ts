import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflow: 'auto'
};

export const actions: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  px: 2,
  py: 1,
  bgcolor: 'background.paper',
  borderTop: '1px solid',
  borderColor: 'grey.300'
};

export const tableFooter: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: 2,
  py: 2,
  bgcolor: 'background.paper'
};
