import { StylesProps } from 'shared/types/styles-props';

export const card: StylesProps = {
  display: 'inline-block',
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  width: '100%',
  gap: 3,
  p: 0,
  mt: 4,
  mb: 4,
  zIndex: 'fab'
};

export const listItem: StylesProps = {
  lineHeight: 2
};

export const header: StylesProps = {
  p: 2
};

export const list: StylesProps = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  height: '56px',
  px: 3,
  py: 2,
  borderBottom: '1px solid',
  borderColor: 'grey.300',
  ':hover': {
    transition: 'all 0.3s ease-in-out',
    bgcolor: 'rgba(94, 146, 243, 0.08)'
  },
  ':not(:hover)': {
    transition: 'all 0.4s ease-in-out'
  },
  ':active': {
    transition: 'all 0.25s ease-in-out',
    bgcolor: 'rgba(94, 146, 243, 0.16)'
  }
};

export const itemPrimaryText: StylesProps = {
  textTransform: 'uppercase',
  color: 'text.primary',
  minWidth: 120
};
export const itemSecondaryText: StylesProps = {
  width: '100%'
};
export const itemAction: StylesProps = {
  color: 'text.secondary'
};
