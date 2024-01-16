import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minWidth: 620,
  minHeight: 540
};

export const header: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: 2,
  borderBottom: '1px solid',
  borderColor: 'grey.200'
};

export const body: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  flex: 1,
  p: 2
};

export const form: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  height: '100%',
  gap: 2
};
export const formFooter: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-end',
  gap: 2
};

export const textField: StylesProps = {
  width: '100%'
};
