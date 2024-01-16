//material-ui
import { Box, IconButton } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
//resources
import { useCallback, useState } from 'react';
//core-components
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { DeleteModal } from 'features/settings/modules/shared/components/DeleteModal';
//styles
import * as styles from './styles';
import { ApprovalGroupEditModal } from '../ApprovalGroupEditModal';

type Props = CellRenderProps;

export const BillApprovalPolicyActionsCell = ({ data }: Props) => {
  const [openApprovalGroupEditModal, setOpenApprovalGroupEditModal] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenEdit = useCallback(() => {
    setOpenApprovalGroupEditModal(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenApprovalGroupEditModal(false);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const handleDelete = useCallback(() => {
    console.log('delete');
  }, []);

  return (
    <>
      <Box sx={styles.container}>
        <IconButton onClick={handleOpenEdit}>
          <ModeEditOutlineOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleOpenDeleteModal}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Box>
      <ApprovalGroupEditModal
        open={openApprovalGroupEditModal}
        onClose={handleCloseEdit}
        data={data}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
};
