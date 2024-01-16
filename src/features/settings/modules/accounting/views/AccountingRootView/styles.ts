import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gridTemplateAreas: `'aside main'`,
  bgcolor: 'background.paper',
  height: '100%'
};

export const main: StylesProps = {
  gridArea: 'main',
  display: 'flex',
  flexWrap: 'wrap',
  pr: 3,
  pb: 3
};

export const title: StylesProps = {
  flexGrow: 1,
  mt: 2
};

export const button: StylesProps = {
  justifyContent: 'center'
};
