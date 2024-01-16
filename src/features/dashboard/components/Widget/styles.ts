import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  height: '100%',
  bgcolor: 'white',
  borderRadius: 2,
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.1)'
};

export const header: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  borderColor: 'grey.100',
  height: 64,
  px: 2
};

export const headerStart: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  flex: 1,
  cursor: 'grab'
};
