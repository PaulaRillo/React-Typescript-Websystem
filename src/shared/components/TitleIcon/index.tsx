import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import * as styles from './styles';

type Props = {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  titleProps?: TypographyProps;
  boxProps?: BoxProps;
};

export const TitleIcon = ({
  title,
  subTitle,
  icon,
  titleProps,
  boxProps
}: Props) => {
  return (
    <Box sx={styles.container} {...boxProps}>
      {icon}
      <Typography {...titleProps}>{title}</Typography>
      {subTitle && (
        <Typography variant="caption" color="text.secondary" ml={2}>
          {subTitle}
        </Typography>
      )}
    </Box>
  );
};
