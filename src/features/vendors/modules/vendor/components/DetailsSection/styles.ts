import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  width: '100%',
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 2,
  overflow: 'hidden'
};

export const container2: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  width: '100%',
  overflow: 'hidden',
  p: 2,
  gap: 1
};

export const summary: StylesProps = {
  fontWeight: 500
};

export const content: StylesProps = {
  display: 'grid',
  rowGap: 3
};

export const primaryContactDetails: StylesProps = {
  width: '100%',
  textAlign: 'right'
};

export const noContactDetails: StylesProps = {
  lineHeight: '1.4',
  alignSelf: 'center'
};

export const noContactDetailsTooltip: StylesProps = {
  height: '1.2rem',
  width: '1.2rem',
  color: 'grey.500'
};
