import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  bgcolor: 'white',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'grey.200'
};

export const row: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  px: 1,
  py: 1,
  gap: 2,
  borderBottom: '1px solid',
  borderColor: 'grey.200',
  '&:hover': {
    bgcolor: 'grey.50',
    transition: 'all 0.5s ease-out'
  }
};

export const line: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 2
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: 1
};

export const avatar: StylesProps = {};
