import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  pt: 1
};

export const section: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  mb: 1,
  gap: 1
};

export const subSection: StylesProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 1
};
