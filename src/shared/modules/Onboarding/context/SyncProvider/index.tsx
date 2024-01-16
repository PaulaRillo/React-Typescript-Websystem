import { TestSapErpConnectionInputDTO } from 'core/infra/service/settings/TestSapErpConnection/TestSapErpConnectionInputDTO';
import React, { createContext, Dispatch, useEffect, useState } from 'react';
import { useConnectSapErpMutation } from 'shared/api/mutations/useConnectSapErpMutation';
import { useSyncSettingsSapErpMutation } from 'shared/api/mutations/useSyncSettingsSapErpMutation';
import { useTestSapErpConnectionMutation } from 'shared/api/mutations/useTestSapErpConnectionMutation';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import { useAlert } from 'shared/hooks/useAlert';
import { tr } from 'shared/translate';
import { SelectedERP } from '../../types/selectedERP';

type SapConnectionInfo = TestSapErpConnectionInputDTO | undefined;
type ConnectSapErpMutation = ReturnType<typeof useConnectSapErpMutation>;

type SyncSettingsSapErpMutation = ReturnType<
  typeof useSyncSettingsSapErpMutation
>;
type TestSapErpConnectionMutation = ReturnType<
  typeof useTestSapErpConnectionMutation
>;

type GetTenantSettings = ReturnType<typeof useGetTenantSettings>;

type InitialState = {
  selectedERP: SelectedERP;
  setSelectedERP: Dispatch<React.SetStateAction<SelectedERP>>;

  sapErpConnectionInfo: SapConnectionInfo;
  setSapErpConnectionInfo: Dispatch<React.SetStateAction<SapConnectionInfo>>;

  testSapErpConnectionMutation: TestSapErpConnectionMutation;
  connectSapErpMutation: ConnectSapErpMutation;
  syncSettingsSapErpMutation: SyncSettingsSapErpMutation;

  getTenantSettings: GetTenantSettings;
};

type Props = {
  children: React.ReactNode;
};

const SyncContext = createContext({ selectedERP: 'sap' } as InitialState);

const SyncProvider = ({ children }: Props) => {
  const { alert } = useAlert();

  //states
  const [selectedERP, setSelectedERP] = useState<SelectedERP>();
  const [sapErpConnectionInfo, setSapErpConnectionInfo] =
    useState<SapConnectionInfo>();

  //mutations
  const testSapErpConnectionMutation = useTestSapErpConnectionMutation();
  const connectSapErpMutation = useConnectSapErpMutation();
  const syncSettingsSapErpMutation = useSyncSettingsSapErpMutation();

  //queries
  const getTenantSettings = useGetTenantSettings({
    enabled: syncSettingsSapErpMutation.isSuccess,
    retry: 3,
    retryDelay: 2000
  });

  useEffect(
    function alertErrorConnectToSapErp() {
      if (connectSapErpMutation.isError) {
        alert({
          severity: 'error',
          title: `${tr('shared.connection')} ${tr('shared.error')}`,
          message: tr('shared.onboarding.error.connectingToErp')
        });
      }
    },
    [
      alert,
      connectSapErpMutation.data,
      connectSapErpMutation.isError,
      connectSapErpMutation.isSuccess
    ]
  );

  useEffect(
    function alertLimitExceededConnectSapErp() {
      const response = connectSapErpMutation.data?.[0];
      const limitExceededResponse = `This request cannot be called more than once every 10 minutes`;

      if (connectSapErpMutation.isSuccess) {
        if (response === limitExceededResponse) {
          alert({
            severity: 'error',
            title: tr('shared.onboarding.error.limitExceeded.title'),
            message: tr('shared.onboarding.error.limitExceeded.message')
          });
        }
      }
    },
    [alert, connectSapErpMutation.data, connectSapErpMutation.isSuccess]
  );

  useEffect(
    function alertTestSapErpConnection() {
      if (testSapErpConnectionMutation.isSuccess) {
        if (!testSapErpConnectionMutation.data?.ok) {
          alert({
            severity: 'error',
            title: `${tr('shared.connection')} ${tr('shared.failed')}`,
            message: ''
          });
        } else {
          alert({
            severity: 'success',
            title: `${tr('shared.connection')} ${tr(
              'shared.successful'
            ).toLowerCase()}`,
            message: ''
          });
        }
      }
    },
    [
      alert,
      testSapErpConnectionMutation.data?.message,
      testSapErpConnectionMutation.data?.ok,
      testSapErpConnectionMutation.isSuccess
    ]
  );

  useEffect(
    function alertConnectSapErpSuccess() {
      const response = connectSapErpMutation.data?.[0];
      const successResponse = `Credentials updated successfully`;

      if (connectSapErpMutation.isSuccess) {
        if (response === successResponse) {
          alert({
            severity: 'success',
            title: `${tr('shared.connection')} ${tr(
              'shared.successful'
            ).toLowerCase()}`,
            message: tr('shared.onboarding.success.connectingToErp')
          });
        }
      }
    },
    [alert, connectSapErpMutation.data, connectSapErpMutation.isSuccess]
  );

  return (
    <SyncContext.Provider
      value={{
        selectedERP,
        setSelectedERP,
        sapErpConnectionInfo,
        setSapErpConnectionInfo,
        testSapErpConnectionMutation,
        syncSettingsSapErpMutation,
        connectSapErpMutation,
        getTenantSettings
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export { SyncContext, SyncProvider };
