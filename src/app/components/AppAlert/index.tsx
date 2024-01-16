import { Alert, Box, Portal, Slide, Snackbar, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Loading } from 'shared/components/Loading';
import { useAlert } from 'shared/hooks/useAlert';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import * as styles from './styles';

function TransitionUp(props: any) {
  return <Slide {...props} direction="down" />;
}

export const AppAlert = () => {
  const { reset } = useAlert();
  const alert = useAppSelector((state) => state.alert.alert);

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  useEffect(() => {
    if (alert) {
      setOpen(true);
    }
  }, [alert]);

  if (!alert) return null;

  return (
    <Portal>
      <Snackbar
        open={open}
        autoHideDuration={alert.autoHideDuration || 6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={TransitionUp}
        onClose={handleClose}
      >
        <Alert
          severity={alert.severity}
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
          <Box sx={styles.container}>
            {alert?.isLoading && (
              <Loading size={12} sx={{ width: 'fit-content' }} />
            )}
            {alert?.title && (
              <Typography variant="body2" fontWeight={500}>
                {alert.title}
              </Typography>
            )}
            {alert?.message && (
              <Typography variant="caption">{alert.message}</Typography>
            )}
          </Box>
        </Alert>
      </Snackbar>
    </Portal>
  );
};
