import { Box, SxProps, Theme } from '@mui/material';
import { createContext, useCallback, useMemo, useState } from 'react';
import * as styles from './styles';

type Props = {
  defaultExpanded?: boolean;
  children: JSX.Element[];
  sx?: SxProps<Theme>;
};

type InitialState = {
  expanded: boolean;
  toggleExpanded: () => void;
};

const SectionContext = createContext({} as InitialState);

const Section = ({ defaultExpanded = true, children, sx }: Props) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, []);

  const styleContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  return (
    <Box component="section" sx={styleContainer}>
      <SectionContext.Provider value={{ expanded, toggleExpanded }}>
        {children}
      </SectionContext.Provider>
    </Box>
  );
};

export { Section, SectionContext };
