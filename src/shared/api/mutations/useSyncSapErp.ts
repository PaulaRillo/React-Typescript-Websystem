import { newAlert } from 'app/store/slices/alert/alertSlice';
import {
  SyncStateOutput,
  TenantSyncStatusType
} from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useMutation, useQueryClient } from 'react-query';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { syncSapErp } from '../requests/syncSapErp';

export const useSyncSapErp = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation(() => syncSapErp(), {
    async onMutate() {
      await queryClient.cancelQueries('@connection-status');
      const prevSyncState = queryClient.getQueryData('@sync-status') as SyncStateOutput; //prettier-ignore
      queryClient.setQueryData('@sync-status', (prev: any) => {
        return {
          ...prev,
          globalState: {
            ...prev?.globalState,
            syncStatus: SyncStatusEnum.PROCESSING,
            startedAt: new Date().toISOString(),
            failedAt: '',
            current_step_name: '',
            current_step_position: 1
          },
          steps: prev.steps.map((step: TenantSyncStatusType) => {
            return {
              ...step,
              sync: {
                ...step.sync,
                current: {
                  syncStatus: SyncStatusEnum.IDLE,
                  startedAt: '',
                  failedAt: '',
                  lastSyncAt: ''
                },
                prev: step.sync.current
              }
            };
          })
        };
      });
      return { prevSyncState };
    },
    async onSuccess() {
      await queryClient.invalidateQueries('@connection-status');
      setTimeout(async () => {
        await queryClient.cancelQueries('@sync-status');
      }, 6000);
    },
    onError(context: { prevSyncState: SyncStateOutput }) {
      queryClient.setQueryData('@sync-status', context.prevSyncState);
      dispatch(
        newAlert({
          title: 'Ops!',
          message: 'Unable to sync SAP ERP. Please try again later.',
          severity: 'error'
        })
      );
    }
  });
};
