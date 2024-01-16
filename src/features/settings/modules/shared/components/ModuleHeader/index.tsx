import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  title: string;
  description: string;
  end?: React.ReactNode;
};

export const ModuleHeader = ({ title, description, end }: Props) => {
  return (
    <Box component="header" sx={styles.container}>
      <Box>
        <Typography variant="h5" mb={0.2}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      {end}
    </Box>
  );
};
