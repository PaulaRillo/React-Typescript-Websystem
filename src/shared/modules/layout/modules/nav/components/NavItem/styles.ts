import { CSSProperties } from 'react';
import { StylesProps } from '../../../../../../types/styles-props';

export const link: CSSProperties = {
  color: 'rgba(94, 146, 243, 0.4)',
  textDecoration: 'none',
  borderTopRightRadius: 24,
  borderTopLeftRadius: 24
};

export const menuItem: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  mb: 0.5,
  mr: 1,
  pr: 1,
  pl: 2,
  height: 40,
  borderTopRightRadius: 24,
  borderBottomRightRadius: 24,
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

export const ActiveMenuItem: StylesProps = {
  position: 'relative',
  ...menuItem,
  bgcolor: 'rgba(94, 146, 243, 0.04)',
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '4px',
    height: '100%',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    bgcolor: 'secondary.main'
  }
};

export const icon: StylesProps = {
  color: 'text.secondary'
};

export const ActiveIcon: StylesProps = {
  color: 'secondary.main'
};

export const label: StylesProps = {
  color: 'text.secondary',
  width: '100%',
  whiteSpace: 'pre-wrap'
};
