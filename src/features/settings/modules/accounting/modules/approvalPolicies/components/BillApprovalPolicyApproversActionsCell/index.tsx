import { Box, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { useCallback, useState } from 'react';
import * as styles from './styles';
import { DeleteModal } from 'features/settings/modules/shared/components/DeleteModal';

type Props = CellRenderProps;

export const BillApprovalPolicyApproversActionsCell = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpenDeleteModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    console.log('delete');
  }, []);

  return (
    <>
      <Box sx={styles.container}>
        <IconButton onClick={handleOpenDeleteModal}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Box>
      <DeleteModal
        open={open}
        onClose={handleCloseEditModal}
        onDelete={handleDelete}
      />
    </>
  );
};
