import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  width: '100%',
  height: '100%'
};

export const header: StylesProps = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
  gap: 2
};

export const title: StylesProps = {
  flexGrow: 1,
  mt: 2,
  pr: 4,
  width: '50%'
};

export const actions: StylesProps = {
  justifyContent: 'center'
};
