import { StylesProps } from 'shared/types/styles-props';

export const container: StylesProps = {
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gridTemplateAreas: `'nav content'`,
  height: '100%',
  minHeight: 320,
  gap: 2,
  py: 2
};
