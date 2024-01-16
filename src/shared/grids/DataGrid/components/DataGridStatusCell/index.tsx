import { Box } from '@mui/material';
import { Tag } from 'shared/components/Tag';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const DataGridStatusCell = ({ data }: Props) => {
  const type = data.status.type;
  const title = data.status.title;

  return (
    <Box sx={styles.container}>
      <Tag type={type} label={title} />
    </Box>
  );
};
