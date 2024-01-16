import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Typography } from '@mui/material';
import { Spacer } from 'shared/components/Spacer';
import * as styles from './styles';

type Props = {
  title: string;
  children: React.ReactNode;
  end?: React.ReactNode;
};

export const Widget = ({ title, children, end }: Props) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.headerStart} className="drag-element">
          <DragIndicatorIcon />
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Spacer />
        {end ? end : <></>}
      </Box>
      <Box sx={{ height: 'calc(100% - 80px)' }}>{children}</Box>
    </Box>
  );
};
