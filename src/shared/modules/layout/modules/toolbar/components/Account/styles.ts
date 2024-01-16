import { StylesProps } from '../../../../../../types/styles-props';

export const avatar: StylesProps = {
  width: 32,
  height: 32,
  outline: '2px solid',
  outlineOffset: '2px',
  outlineColor: '#1565c0',
  bgcolor: 'grey.300',
  color: 'primary.main',
  ml: 1,
  cursor: 'pointer'
};

export const menu: StylesProps = {
  width: 288,
  overflow: 'visible',
  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.32))',
  marginTop: 1,
  borderRadius: 2,
  '& .MuiList-root': {
    p: 0
  },
  '& .MuiAvatar-root': {
    width: 72,
    height: 72,
    outline: '2px solid',
    outlineOffset: '2px',
    outlineColor: '#1565c0',
    backgroundColor: 'grey.300',
    color: 'primary.main',
    cursor: 'pointer',
    mb: 2
  }
};

export const menuAvatar: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 2.5,
  textAlign: 'center'
};

export const menuItemIcon: StylesProps = {
  mr: 1
};

export const menuLogout: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2
};

export const menuFooter: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  p: 1,
  '& a': {
    flex: '1 1 0',
    textAlign: 'center'
  },
  '& hr': {
    flex: 0
  }
};

export const signOutButton: StylesProps = {
  px: 2
};
