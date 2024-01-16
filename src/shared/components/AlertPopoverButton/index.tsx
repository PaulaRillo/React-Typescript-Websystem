import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import { Alert, IconButton, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { IAlert } from 'shared/types/alert';
import { StylesProps } from 'shared/types/styles-props';
import { Popover } from '../Popover';
import * as styles from './styles';

type Props = {
  alert: IAlert;
  sx?: StylesProps;
};

export const AlertPopoverButton = ({ alert, sx }: Props) => {
  const stylesButton = useMemo(() => ({ ...styles.button, ...sx }), [sx]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        sx={{ p: 0 }}
        onClose={handleClose}
      >
        <Alert severity={alert.severity} sx={{ width: 240 }}>
          <Typography variant="body2" fontWeight={500}>
            {alert.title}
          </Typography>
          <Typography variant="caption">{alert.message}</Typography>
        </Alert>
      </Popover>
      <IconButton size="small" sx={stylesButton} onClick={handleOpen}>
        <ReportTwoToneIcon fontSize="small" />
      </IconButton>
    </>
  );
};
