import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: 1
};

export const paper: StylesProps = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'grey.200',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
};
