import { StylesProps } from 'shared/types/styles-props';

export const container = (syncStatusColor: string): StylesProps => {
  return {
    bgcolor: 'grey.100',
    borderRadius: 2,

    border: '1px solid',
    borderColor: 'grey.300',
    width: '100%',
    maxWidth: 1000,
    position: 'relative',
    overflow: 'hidden',
    ':before': {
      content: '""',
      display: 'block',
      clear: 'both',
      height: '100%',
      width: 6,
      position: 'absolute',
      top: 0,
      left: 0,
      bgcolor: syncStatusColor,
      zIndex: 999
    }
  };
};
