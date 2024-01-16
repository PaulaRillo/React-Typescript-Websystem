import { useMemo } from 'react';
import { Box, Divider, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import * as styles from './styles';
import { Spacer } from 'shared/components/Spacer';

type Props = {
  divider?: boolean;
  children: ReactNode;
  left?: ReactNode;
  sx?: SxProps<Theme>;
};

export const ModalActions = ({ divider, left, sx, children }: Props) => {
  const styleActions = useMemo(() => ({ ...styles.actions, ...sx }), [sx]);
  return (
    <>
      {divider && <Divider light sx={{ width: '100%' }} />}
      <Box sx={styles.container}>
        {left && <Box sx={styleActions}>{left}</Box>}
        <Spacer />
        {children && <Box sx={styleActions}>{children}</Box>}
      </Box>
    </>
  );
};
