import { Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader } from 'shared/components/Modal';
import { GetTermsOfUse } from '../GetTermsOfUse';
import { tr } from 'shared/translate';

export const TermsOfUse = () => {
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
        title={tr('app.toolbar.menu.TermsOfUse')}
        fullScreen
        open={open}
        sx={{ p: 2 }}
        onClose={handleClose}
      >
        <GetTermsOfUse handleClose={handleClose} />
      </Modal>
      <Link to="#" onClick={handleOpen}>
        <Typography variant="caption" color="text.secondary">
          {tr('app.toolbar.menu.TermsOfUse')}
        </Typography>
      </Link>
    </>
  );
};
