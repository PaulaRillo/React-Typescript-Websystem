import { Box } from '@mui/material';
import { AvatarStack } from 'shared/components/AvatarStack';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const AvatarStackCell = ({ value }: Props) => {
  return (
    <Box sx={styles.container}>
      <AvatarStack users={value} />
    </Box>
  );
};
