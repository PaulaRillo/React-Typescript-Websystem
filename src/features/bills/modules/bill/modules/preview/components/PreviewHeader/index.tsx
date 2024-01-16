import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  id: string;
  vendorName: string;
  status: string;
};

export const PreviewHeader = ({ id, vendorName, status }: Props) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4">{vendorName}</Typography>
      <Box sx={styles.details}>
        <Typography variant="h6" fontWeight={700}>
          {id}
        </Typography>
        <Typography variant="overline" fontWeight={700} color="text.secondary">
          {status}
        </Typography>
      </Box>
    </Box>
  );
};
