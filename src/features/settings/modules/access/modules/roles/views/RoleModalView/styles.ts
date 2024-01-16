import { StylesProps } from 'shared/types/styles-props';

export const content: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  p: 2,
  gap: 2,
  overflow: 'auto'
};

export const category: StylesProps = {
  fontWeight: 700
};
export const modalHeader: StylesProps = {
  bgcolor: 'grey.200'
};

export const permission: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  m: 2
};

export const permissionTitle: StylesProps = {
  fontWeight: 500
};

export const permissionDescription: StylesProps = {
  color: 'text.secondary'
};
