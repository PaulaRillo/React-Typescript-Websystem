import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const LinkVendorCell = ({ value, data }: Props) => {
  const navigate = useNavigate();

  const vendor = data?.vendor;

  const handleClick = () => {
    navigate(`/vendors/${vendor.visualId}`);
  };

  return (
    <Box onClick={handleClick} sx={styles.container}>
      {value}
    </Box>
  );
};
