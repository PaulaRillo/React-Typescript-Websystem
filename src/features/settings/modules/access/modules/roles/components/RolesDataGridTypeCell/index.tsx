import { Typography } from '@mui/material';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { tr } from 'shared/translate';

type Props = CellRenderProps;

export const RolesDataGridTypeCell = ({ value }: Props) => {
  return (
    <Typography variant="body2" sx={{ m: '8% 0' }}>
      {value ? tr('settings.access.roles.managed') : ''}
    </Typography>
  );
};
