import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gridTemplateAreas: `'aside main'`,
  bgcolor: 'background.paper'
};

export const main: StylesProps = {
  gridArea: 'main',
  overflow: 'auto',
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexWrap: 'wrap',
  p: 2
};

export const title: StylesProps = {
  flexGrow: 1,
  mt: 2
};

export const button: StylesProps = {
  justifyContent: 'center'
};
