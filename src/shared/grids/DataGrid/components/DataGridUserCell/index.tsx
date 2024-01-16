import { Box } from '@mui/material';
import { Avatar } from 'shared/components/Avatar';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const DataGridUserCell = ({ data }: Props) => {
  const firstname = data.user.firstname;
  const lastname = data.user.lastname;

  return (
    <Box sx={styles.container}>
      <Avatar
        user={{ firstname, lastname }}
        fullName
        fullNameProps={{ variant: 'caption', fontWeight: 500 }}
      />
    </Box>
  );
};
