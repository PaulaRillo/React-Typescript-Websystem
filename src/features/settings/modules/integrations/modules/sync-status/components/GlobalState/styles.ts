import { StylesProps } from 'shared/types/styles-props';

export const container = (syncStatusColor: string): StylesProps => {
  return {
    display: 'block',
    bgcolor: 'grey.100',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'grey.300',
    width: '100%',
    maxWidth: 1000,
    position: 'relative',
    ':before': {
      content: '""',
      display: 'block',
      clear: 'both',
      height: '100%',
      width: 8,
      position: 'absolute',
      top: 0,
      left: 0,
      bgcolor: syncStatusColor,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      zIndex: 999
    }
  };
};

export const header: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: 40,
  mx: 2,
  my: 1
};
