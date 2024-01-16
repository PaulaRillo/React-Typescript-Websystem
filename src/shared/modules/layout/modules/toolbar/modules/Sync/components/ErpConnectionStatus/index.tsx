import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { Box, Stack, Typography } from '@mui/material';
import { Spacer } from 'shared/components/Spacer';
import { Tag } from 'shared/components/Tag';
import { TitleIcon } from 'shared/components/TitleIcon';
import { useConnectionStatus } from 'shared/hooks/useConnectionStatus';
import { tr } from 'shared/translate';
import * as styles from './styles';

export const ErpConnectionStatus = () => {
  const { lastSyncAt, isSyncStatusProcessing, accountingSoftware } =
    useConnectionStatus();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <TitleIcon
          icon={<CheckCircleTwoToneIcon color="success" />}
          title={tr('shared.connectedTo', { value: accountingSoftware })}
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
        <Stack spacing={1} sx={{ px: 1.5, py: 1 }}>
          <Stack spacing={1} direction="row">
            <Tag type="neutral" label={tr('shared.last-sync')} />
            <Spacer />
            <Typography variant="caption">
              {new Date(lastSyncAt).toLocaleString()}
            </Typography>
          </Stack>
          {isSyncStatusProcessing && (
            <Stack spacing={1} direction="row">
              <Tag type="neutral" label={tr('sync_status')} />
              <Typography variant="caption">{tr('in_queue')}</Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
