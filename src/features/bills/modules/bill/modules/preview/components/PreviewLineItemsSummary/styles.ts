import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  gap: 1,
  paddingTop: 2
};

export const content: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 400,
  px: 2,
  py: 1,
  gap: 1
};

export const line = (isLast: boolean): StylesProps => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  borderBottom: isLast ? 'none' : '1px dashed',
  borderColor: 'grey.200',
  mt: 0.5
});
