import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%'
};

export const actions: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  px: 2,
  py: 1,
  bgcolor: 'background.paper',
  border: '1px solid',
  borderBottom: 'none',
  borderColor: 'grey.300',
  borderStartStartRadius: 8,
  borderStartEndRadius: 8
};

export const tableFooter: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: 2,
  py: 2,
  bgcolor: 'background.paper',
  border: '1px solid',
  borderTop: 'none',
  borderColor: 'grey.300',
  borderEndStartRadius: 8,
  borderEndEndRadius: 8
};
