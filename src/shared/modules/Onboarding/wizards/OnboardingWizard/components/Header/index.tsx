import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  subTitle: string;
};

export const Header = ({ title, subTitle }: Props) => {
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subTitle}
      </Typography>
    </Box>
  );
};
