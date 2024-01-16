import { IconButton } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { useRoles } from '../../hooks/useRoles';
import { useCallback } from 'react';

type Props = CellRenderProps;

export const RolesDataGridActionsCell = ({ value }: Props) => {
  const { handleOpen } = useRoles();

  const handleEdit = useCallback(() => {
    handleOpen(value);
  }, [handleOpen, value]);

  return (
    <IconButton size="small" onClick={handleEdit}>
      <ModeEditOutlineIcon fontSize="small" />
    </IconButton>
  );
};
