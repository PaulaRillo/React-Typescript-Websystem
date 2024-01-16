import { StatusEnum } from 'core/domain/connection/StatusEnum';
import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';
import { useMemo } from 'react';
import { useGetConnectionStatus } from 'shared/modules/layout/modules/toolbar/modules/Sync/queries/getConnectionStatus';
import { tr } from 'shared/translate';
import {
  getLocaleDate,
  getLocaleTime
} from 'shared/utils/string/getLocaleDate';

export const useConnectionStatus = () => {
  const {
    data: connectionStatus,
    isLoading: isConnectionLoading,
    isFetching: isConnectionFetching
  } = useGetConnectionStatus();

  const isLoading = useMemo(() => {
    return isConnectionLoading;
  }, [isConnectionLoading]);

  const isFetching = useMemo(() => {
    return isConnectionFetching;
  }, [isConnectionFetching]);

  const accountingSoftware = useMemo((): string => {
    return connectionStatus?.accountingSoftware || '';
  }, [connectionStatus?.accountingSoftware]);

  const isStatusActive = useMemo((): boolean => {
    return connectionStatus?.status === StatusEnum.ACTIVE;
  }, [connectionStatus?.status]);

  const isStatusInactive = useMemo((): boolean => {
    return connectionStatus?.status === StatusEnum.INACTIVE;
  }, [connectionStatus?.status]);

  const isStatusMisConfigured = useMemo((): boolean => {
    return connectionStatus?.status === StatusEnum.MISCONFIGURED;
  }, [connectionStatus?.status]);

  const isStatusPendingConfiguration = useMemo((): boolean => {
    return connectionStatus?.status === StatusEnum.PENDING_CONFIGURATION;
  }, [connectionStatus?.status]);

  const isStatusUnknown = useMemo((): boolean => {
    return connectionStatus?.status === StatusEnum.UNKNOWN;
  }, [connectionStatus?.status]);

  const isSyncStatusIdle = useMemo((): boolean => {
    return connectionStatus?.syncStatus === SyncStatusEnum.IDLE;
  }, [connectionStatus?.syncStatus]);

  const isSyncStatusProcessing = useMemo((): boolean => {
    return connectionStatus?.syncStatus === SyncStatusEnum.PROCESSING;
  }, [connectionStatus?.syncStatus]);

  const isSyncStatusRejected = useMemo((): boolean => {
    return connectionStatus?.syncStatus === SyncStatusEnum.REJECTED;
  }, [connectionStatus?.syncStatus]);

  const isSyncStatusFullFilled = useMemo((): boolean => {
    return connectionStatus?.syncStatus === SyncStatusEnum.FULFILLED;
  }, [connectionStatus?.syncStatus]);

  const isSyncProcessEnabled = useMemo((): boolean => {
    if (isSyncStatusProcessing) return false;
    if (!isStatusActive) return false;
    return true;
  }, [isStatusActive, isSyncStatusProcessing]);

  const lastSyncAt = useMemo((): string => {
    if (!connectionStatus?.lastSyncAt)
      return tr('shared.lastSync') + ': ' + tr('shared.never');

    return (
      tr('shared.lastSync') +
      `: ${getLocaleDate(connectionStatus.lastSyncAt) || ''} ${getLocaleTime(
        connectionStatus.lastSyncAt
      )}`
    );
  }, [connectionStatus?.lastSyncAt]);

  return {
    accountingSoftware,
    connectionStatus,
    lastSyncAt,
    isLoading,
    isFetching,
    isStatusActive,
    isStatusInactive,
    isStatusPendingConfiguration,
    isStatusMisConfigured,
    isStatusUnknown,
    isSyncStatusIdle,
    isSyncStatusProcessing,
    isSyncProcessEnabled,
    isSyncStatusRejected,
    isSyncStatusFullFilled
  };
};
