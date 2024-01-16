import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import {
  Box,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Loading } from 'shared/components/Loading';
import { Tag } from 'shared/components/Tag';
import { tr } from 'shared/translate';
import { getLocaleDateTime } from 'shared/utils/string/getLocaleDate';
import { hasExpired } from 'shared/utils/time/hasExpired';

type Props = {
  isLoading?: boolean;
  isRefetching?: boolean;
  widgetGeneratedAt?: Date;
  lastSyncAt?: Date;
  noDataAvailable?: boolean;
  onClickRefetch?: () => void;
};

export const WidgetControl = ({
  isLoading,
  isRefetching,
  lastSyncAt,
  noDataAvailable,
  widgetGeneratedAt,
  onClickRefetch
}: Props) => {
  const isAbleToRefresh = useMemo((): boolean => {
    if (!lastSyncAt) return true;
    if (!widgetGeneratedAt) return true;
    if (!(lastSyncAt instanceof Date)) return true;
    if (!(widgetGeneratedAt instanceof Date)) return true;
    if (noDataAvailable) return true;
    if (!(lastSyncAt.getTime() <= widgetGeneratedAt.getTime())) return true;
    if (hasExpired({ date: widgetGeneratedAt, expiresIn: 30 })) return true;
    return false;
  }, [noDataAvailable, lastSyncAt, widgetGeneratedAt]);

  const handleRefresh = useCallback(() => {
    if (!isAbleToRefresh) return;
    if (!onClickRefetch) return;
    if (isRefetching) return;

    onClickRefetch();
  }, [isAbleToRefresh, isRefetching, onClickRefetch]);

  if (!lastSyncAt && !widgetGeneratedAt) return <></>;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'flex-end' }}>
        <Tag type="info" label={tr('shared.generatedAt')} />
        {isLoading && <Skeleton variant="text" width={140} sx={{ mr: 1 }} />}
        {!isLoading && widgetGeneratedAt && (
          <Typography variant="caption" pr={1}>
            {getLocaleDateTime(widgetGeneratedAt?.toISOString())}
          </Typography>
        )}
      </Stack>
      <Divider light orientation="vertical" sx={{ maxHeight: 32 }} />
      <Tooltip title={tr('shared.refresh')}>
        <span>
          <IconButton
            onClick={handleRefresh}
            disabled={isRefetching || !isAbleToRefresh}
          >
            {isRefetching ? (
              <Box sx={{ width: 24, height: 24 }}>
                <Loading size={16} />
              </Box>
            ) : (
              <RefreshTwoToneIcon />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
};
