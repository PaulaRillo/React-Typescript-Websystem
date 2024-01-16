import { StylesProps } from 'shared/types/styles-props';

export const main: StylesProps = {
  display: 'flex',
  flexDirection: { sm: 'column', lg: 'row' },
  bgcolor: 'white',
  overflowY: { sm: 'auto', lg: 'hidden' },
  height: '100%',
  gap: 1,
  px: 2
};

export const section: StylesProps = {
  width: '100%',
  height: { sm: 'fit-content', lg: '100%' },
  overflowY: { sm: 'visible', lg: 'auto' }
};

export const aside: StylesProps = {
  width: { sm: '100%', lg: '360px', xl: '480px' },
  height: { sm: 'fit-content', lg: '100%' },
  overflowY: { sm: 'visible', lg: 'auto' }
};

export const asideContent: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  my: 2
};
