import { useContext, useMemo } from 'react';
import { SectionContext } from '../Section';
import { Box, Collapse, SxProps, Theme } from '@mui/material';
import * as styles from './styles';

type Props = {
  children: JSX.Element | JSX.Element[];
  sx?: SxProps<Theme>;
};

export const SectionContent = ({ sx, children }: Props) => {
  const { expanded } = useContext(SectionContext);

  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  return (
    <Collapse component="article" in={expanded}>
      <Box sx={stylesContainer}>{children}</Box>
    </Collapse>
  );
};
