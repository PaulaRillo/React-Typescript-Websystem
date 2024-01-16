import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  title: string;
  name: string;
  shortAddress: string;
  phone: string;
};

export const PreviewEntity = ({ title, name, shortAddress, phone }: Props) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="overline" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body2">{name}</Typography>
      <Typography variant="body2">{shortAddress}</Typography>
      <Typography variant="body2">{phone}</Typography>
    </Box>
  );
};
