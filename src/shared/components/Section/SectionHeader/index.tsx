import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import { SectionContext } from '../Section';
import * as styles from './styles';

type Props = {
  title?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
  end?: JSX.Element | JSX.Element[] | string;
  startSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
};

export const SectionHeader = ({
  title,
  description,
  children,
  end,
  sx,
  startSx
}: Props) => {
  const { expanded, toggleExpanded } = useContext(SectionContext);

  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  const stylesStartContainer = useMemo(
    () => ({ ...styles.startContainer, ...startSx }),
    [startSx]
  );

  return (
    <Box component="header" sx={stylesContainer}>
      <Box sx={stylesStartContainer} onClick={toggleExpanded}>
        <KeyboardArrowDownOutlinedIcon
          sx={{
            ...styles.icon,
            transform: `rotate(${expanded ? '0' : '-90'}deg)`,
            transition: 'all 0.2s'
          }}
        />
        {children && children}
        {!children && (
          <>
            <Typography variant="body2" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </>
        )}
      </Box>
      {end && <Box sx={styles.end}>{end}</Box>}
    </Box>
  );
};
