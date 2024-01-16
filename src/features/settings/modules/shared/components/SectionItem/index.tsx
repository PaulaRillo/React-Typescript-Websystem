//material-ui
import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
//styles
import { ReactNode } from 'react';
import { Loading } from 'shared/components/Loading';
import * as styles from './styles';
type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};
export const SectionItem = ({ title, description, action }: Props) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="overline" sx={styles.key}>
        {title}
      </Typography>
      <Typography variant="body2" sx={styles.value}>
        {description ? (
          description
        ) : (
          <Loading
            size={16}
            sx={{ display: 'flex', alignItems: 'flex-start' }}
          />
        )}
      </Typography>
      {action && action}
      {!action && (
        <IconButton size="small" aria-label="select" disableRipple>
          <ArrowForwardIosOutlined sx={styles.arrowIcon} />
        </IconButton>
      )}
    </Box>
  );
};
