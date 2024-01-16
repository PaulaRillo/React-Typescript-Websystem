import { Box, Button } from '@mui/material';
import { tr } from 'shared/translate';
import { useCallback, useEffect } from 'react';
import { Loading } from 'shared/components/Loading';
import { ActionRenderProps } from 'shared/modules/CreationWizard/types/Action';
import { useSync } from '../../../../hooks/useSync';
import * as styles from './styles';

type Props = ActionRenderProps;

export const ConnectERPActions = ({ setActiveStep }: Props) => {
  const { connectSapErpMutation, sapErpConnectionInfo } = useSync();

  const handleConnect = useCallback(() => {
    if (!sapErpConnectionInfo) return;
    const { host, credentials } = sapErpConnectionInfo;
    connectSapErpMutation.mutate({
      host: host,
      username: credentials.username,
      password: credentials.password,
      dbname: credentials.dbname
    });
  }, [connectSapErpMutation, sapErpConnectionInfo]);

  useEffect(
    function nextStep() {
      const response = connectSapErpMutation.data?.[0];
      const successResponse = `Credentials updated successfully`;

      if (connectSapErpMutation.isSuccess) {
        if (response === successResponse) {
          setActiveStep((prev) => prev + 1);
        }
      }
    },
    [connectSapErpMutation.data, connectSapErpMutation.isSuccess, setActiveStep]
  );

  return (
    <Box sx={styles.container}>
      <Button
        variant="contained"
        sx={{ minWidth: 104 }}
        onClick={handleConnect}
      >
        {!connectSapErpMutation.isLoading && tr('shared.connect')}
        {connectSapErpMutation.isLoading && (
          <Loading size={20} circularProgressProps={{ color: 'secondary' }} />
        )}
      </Button>
    </Box>
  );
};
