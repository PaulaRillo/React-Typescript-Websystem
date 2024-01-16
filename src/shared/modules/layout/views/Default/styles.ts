import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'grid',
  height: '100vh',
  gridTemplateColumns: '216px 1fr',
  gridTemplateRows: '80px 1fr',
  gridTemplateAreas: `'aside-top toolbar'
                      'aside main'`
};

export const asideTop: StylesProps = {
  gridArea: 'aside-top',
  borderRight: '1px solid',
  borderColor: 'grey.200'
};

export const aside: StylesProps = {
  gridArea: 'aside',
  borderRight: '1px solid',
  borderColor: 'grey.200'
};

export const toolbar: StylesProps = {
  gridArea: 'toolbar',
  bgcolor: 'grey.100'
};

export const main: StylesProps = {
  gridArea: 'main',
  bgcolor: 'grey.100',
  overflow: 'hidden'
};
