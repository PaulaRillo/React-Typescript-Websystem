import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  shortcut: string;
};

export const KeyboardKey = ({ shortcut }: Props) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="overline" sx={styles.key}>
        {shortcut}
      </Typography>
    </Box>
  );
};
