import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  date: string;
};

export const PreviewDate = ({ title, date }: Props) => {
  return (
    <Box>
      <Typography variant="overline" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body2">{date}</Typography>
    </Box>
  );
};
