import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  gap: 1,
  height: '100%',
  mb: 1,
  bgcolor: 'grey.100',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'grey.300',
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
    bgcolor: 'success.main',
    zIndex: 999
  }
};

export const content: StylesProps = {
  display: 'flex',
  flexDirection: 'column'
};

export const lastSync: StylesProps = {
  display: 'flex',
  gap: 1,
  p: 1,
  alignItems: 'center'
};

export const text: StylesProps = {
  textAlign: 'center',
  color: 'text.primary',
  fontWeight: 500
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};
