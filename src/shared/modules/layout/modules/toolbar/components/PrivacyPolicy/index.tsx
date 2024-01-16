import { Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'shared/components/Modal';
import { tr } from 'shared/translate';
import { GetPrivacyPolicy } from '../GetPrivacyPolicy';

export const PrivacyPolicy = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Modal
        title={tr('app.toolbar.menu.privacyPolicy')}
        fullScreen
        open={open}
        sx={{ p: 2 }}
        onClose={handleClose}
      >
        <GetPrivacyPolicy handleClose={handleClose} />
      </Modal>
      <Link to="#" onClick={handleOpen}>
        <Typography variant="caption" color="text.secondary">
          {tr('app.toolbar.menu.privacyPolicy')}
        </Typography>
      </Link>
    </>
  );
};
