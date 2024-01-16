import { Box, IconButton } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';
import { useCallback, useState } from 'react';
import { BillApprovalPolicyRuleEditModal } from '../BillApprovalPolicyRuleEditModal';
import { DeleteModal } from 'features/settings/modules/shared/components/DeleteModal';

type Props = CellRenderProps;

export const BillApprovalPolicyActionsCell = ({ data }: Props) => {
  const [openEditPolicyRuleModal, setOpenEditPolicyRuleModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenEdit = useCallback(() => {
    setOpenEditPolicyRuleModal(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEditPolicyRuleModal(false);
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
      <BillApprovalPolicyRuleEditModal
        open={openEditPolicyRuleModal}
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
