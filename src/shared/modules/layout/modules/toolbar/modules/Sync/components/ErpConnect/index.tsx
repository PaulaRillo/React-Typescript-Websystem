import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';
import { Box, Button } from '@mui/material';
import { TitleIcon } from 'shared/components/TitleIcon';
import { useNav } from 'shared/hooks/useNav';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const ErpConnect = () => {
  const handleNavigate = useNav('data-path');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <TitleIcon
          icon={<SyncDisabledIcon color="disabled" />}
          title={tr('shared.noConnection')}
          titleProps={{
            variant: 'caption',
            sx: { fontWeight: 700, fontSize: 14 }
          }}
          boxProps={{
            sx: {
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'grey.300',
              gap: 1,
              p: 1,
              px: 1.5
            }
          }}
        />
        <Button
          variant="contained"
          data-path="/settings/integrations/connection-setup"
          onClick={handleNavigate}
          sx={{ m: 1, ml: 1.5 }}
        >
          {tr('shared.configure')}
        </Button>
      </Box>
    </Box>
  );
};
