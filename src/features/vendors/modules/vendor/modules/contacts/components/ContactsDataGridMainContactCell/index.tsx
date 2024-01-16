import { Box, IconButton } from '@mui/material';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import * as styles from './styles';
import { CellRenderProps } from 'shared/grids/DataGrid/types';

type Props = CellRenderProps;

export const ContactsDataGridMainContactCell = ({ value }: Props) => {
  return (
    <Box sx={styles.container}>
      <IconButton size="small">
        {!value && <StarOutlineOutlinedIcon />}
        {value && <StarOutlinedIcon />}
      </IconButton>
    </Box>
  );
};
