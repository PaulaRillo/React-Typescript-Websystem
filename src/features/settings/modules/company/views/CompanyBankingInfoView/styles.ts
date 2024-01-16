import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  width: '100%',
  height: '100%'
};

export const dataGrid: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  overFlow: 'auto',
  my: 2,
  pb: 4
};

export const placeholder: StylesProps = {
  width: '100%',
  height: 'calc(100vh - 300px)',
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  textAlign: 'center'
};

export const alert: StylesProps = {
  my: '5%',
  mx: 'auto',
  maxWidth: 400
};

export const currencyTextfield: StylesProps = {
  width: 'auto',
  minWidth: '90%'
};

export const datagrid: StylesProps = {
  display: 'flex',
  height: '100%',
  pb: 2
};
