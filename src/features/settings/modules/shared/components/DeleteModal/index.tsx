import { Box, Typography, Button } from '@mui/material';
import { Modal } from 'shared/components/Modal';
import { ModalActions } from 'shared/components/Modal/components/ModalActions';
//translate
import { tr } from 'shared/translate';
//styles
import * as styles from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const DeleteModal = ({ open, onClose, onDelete }: Props) => {
  return (
    <Modal fullWidth={true} maxWidth="sm" open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          {tr('shared.delete.validation')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {tr('shared.delete.validation.warning')}
        </Typography>
      </Box>
      <ModalActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={onDelete}>
          {tr('shared.delete')}
        </Button>
      </ModalActions>
    </Modal>
  );
};
