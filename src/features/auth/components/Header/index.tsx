import { Box, Typography } from '@mui/material';
import { Logo } from 'shared/components/Logo';
import * as styles from './styles';

type Props = {
  title: string;
  subTitle: string;
};

export const Header = ({ title, subTitle }: Props) => {
  return (
    <Box sx={styles.header}>
      <Logo sx={styles.logo} />
      <Typography variant="h5" sx={styles.title}>
        {title}
      </Typography>
      <Typography sx={styles.subTitle}>{subTitle}</Typography>
    </Box>
  );
};
