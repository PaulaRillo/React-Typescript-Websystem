import { Box, SxProps, Theme } from '@mui/material';
import { useMemo } from 'react';
import * as styles from './styles';

type Props = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export const ModalContainer = ({ children, sx }: Props) => {
  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);
  return <Box sx={stylesContainer}>{children}</Box>;
};
