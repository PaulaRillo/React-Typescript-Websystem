import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import * as styles from './styles';

type Props = CellRenderProps;

export const LinkedCell = ({ value }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bills/${value}`);
  };

  return (
    <Box onClick={handleClick} sx={styles.container}>
      {value}
    </Box>
  );
};
