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

export const summary: StylesProps = {
  fontWeight: 500
};

export const content: StylesProps = {
  display: 'grid',
  rowGap: 3
};
