import {
  Box,
  SvgIconTypeMap,
  SxProps,
  Theme,
  Tooltip,
  Typography
} from '@mui/material';
import * as styles from './styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Spacer } from 'shared/components/Spacer';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useMemo } from 'react';

type Icon = OverridableComponent<SvgIconTypeMap>;

type Props = {
  icon: Icon;
  title: string;
  value: string;
  description: string;
  sxDescription?: SxProps<Theme>;
  tooltip?: string;
  sx?: SxProps<Theme>;
};

export const InfoCard = ({
  icon: Icon,
  title,
  value,
  description,
  sxDescription,
  tooltip,
  sx
}: Props) => {
  const stylesContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  const stylesDescription = useMemo(
    () => ({ ...styles.description, ...sxDescription }),
    [sxDescription]
  );

  return (
    <Box sx={stylesContainer}>
      <Icon sx={styles.icon} />
      <Box sx={styles.info}>
        <Typography variant="caption" sx={styles.title}>
          {title}
        </Typography>
        <Typography variant="h6" sx={styles.value}>
          {value}
        </Typography>
        <Typography variant="caption" sx={stylesDescription}>
          {description}
        </Typography>
      </Box>
      <Spacer />
      {tooltip && (
        <Tooltip title={tooltip} placement="top">
          <InfoOutlinedIcon sx={styles.infoIcon} />
        </Tooltip>
      )}
    </Box>
  );
};
