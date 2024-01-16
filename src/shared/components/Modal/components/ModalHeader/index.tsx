import {
  Box,
  Divider,
  IconButton,
  SxProps,
  Theme,
  Typography
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Spacer } from 'shared/components/Spacer';
import * as styles from './styles';
import { useMemo } from 'react';

type Props = {
  title?: string;
  divider?: boolean;
  onClose?: () => void;
  sx?: SxProps<Theme>;
};

export const ModalHeader = ({ title, divider, sx, onClose }: Props) => {
  const styleContainer = useMemo(() => ({ ...styles.container, ...sx }), [sx]);

  return (
    <Box component="header" sx={styleContainer}>
      <Box sx={styles.header}>
        {title && <Typography variant="h6">{title}</Typography>}
        <Spacer />
        {onClose && (
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        )}
      </Box>
      {divider && <Divider light />}
    </Box>
  );
};
