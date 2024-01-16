import { Box, Typography } from '@mui/material';
import * as styles from './styles';

type Props = {
  title: string;
  value?: string | JSX.Element;
};

export const PaymentPanelInfo = ({ title, value }: Props) => {
  const isString = typeof value === 'string';

  return (
    <Box sx={styles.container}>
      <Typography variant="caption" sx={styles.title}>
        {title}
      </Typography>
      {!value && <></>}
      {isString && (
        <Typography variant="body2" sx={styles.value}>
          {value}
        </Typography>
      )}
      {!isString && value}
    </Box>
  );
};
