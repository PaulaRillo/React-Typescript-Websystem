import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  title: string;
  subTitle?: string;
};

export const Header = ({ title, subTitle }: Props) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h5">{title}</Typography>
      {subTitle && <Typography variant="body2">{subTitle}</Typography>}
    </Box>
  );
};
