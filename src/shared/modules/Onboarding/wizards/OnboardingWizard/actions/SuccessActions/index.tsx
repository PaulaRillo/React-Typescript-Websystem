import { Button } from '@mui/material';
import { tr } from 'shared/translate';
import { useCallback } from 'react';

export const SuccessActions = () => {
  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <Button variant="contained" onClick={handleReload}>
      {tr('shared.done')}
    </Button>
  );
};
