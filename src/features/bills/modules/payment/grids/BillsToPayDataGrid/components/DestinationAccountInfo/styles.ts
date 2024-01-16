import { StylesProps } from 'shared/types/styles-props';

export const button: StylesProps = {
  display: 'flex',
  height: 64,
  minHeight: '100%',
  width: 'fit-content',
  alignItems: 'center',
  borderRadius: 2
};

export const infoContainer: StylesProps = {
  minWidth: 180
};

export const title: StylesProps = {
  p: 1.5,
  borderBottom: '1px solid',
  borderColor: 'grey.200',
  color: 'primary.main',
  bgcolor: 'grey.50',
  fontWeight: 500
};

export const infos: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  p: 1.5
};
