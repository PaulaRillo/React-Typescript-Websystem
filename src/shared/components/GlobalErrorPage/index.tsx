import { Box, Button, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import { Logo } from '../Logo';

type Props = {
  errorMessage: string;
};

export const GlobalErrorPage = ({ errorMessage }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        bgcolor: 'grey.100'
      }}
    >
      <Logo />
      <Typography variant="body1" maxWidth={560} textAlign="center">
        {errorMessage}
      </Typography>
      <Button variant="outlined" onClick={() => window.location.reload()}>
        {tr('shared.retry')}
      </Button>
    </Box>
  );
};
