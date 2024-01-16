import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gridTemplateAreas: `'aside main'`,
  bgcolor: 'background.paper'
};

export const header: StylesProps = {
  mx: 2
};

export const main: StylesProps = {
  gridArea: 'main',
  overflow: 'auto',
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexWrap: 'wrap',
  px: 2
};

export const title: StylesProps = {
  mt: 2
};

export const icon: StylesProps = {
  color: 'text.secondary'
};

export const label: StylesProps = {
  color: 'text.secondary',
  width: '100%'
};
