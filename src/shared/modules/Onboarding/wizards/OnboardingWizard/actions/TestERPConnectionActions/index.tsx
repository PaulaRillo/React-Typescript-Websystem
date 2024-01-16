import { Box, Button } from '@mui/material';
import { tr } from 'shared/translate';
import { useEffect } from 'react';
import { Loading } from 'shared/components/Loading';
import { useRemoteSubmit } from 'shared/hooks/useRemoteSubmit';
import { ActionRenderProps } from 'shared/modules/CreationWizard/types/Action';
import { useSync } from '../../../../hooks/useSync';
import * as styles from './styles';

type Props = ActionRenderProps & {
  formRef: React.RefObject<HTMLFormElement>;
};

export const TestERPConnectionActions = ({ formRef, setActiveStep }: Props) => {
  const { submit } = useRemoteSubmit();
  const { testSapErpConnectionMutation } = useSync();

  useEffect(
    function nextStep() {
      if (testSapErpConnectionMutation.isSuccess) {
        if (testSapErpConnectionMutation.data.ok) {
          setActiveStep((prev) => prev + 1);
        }
      }
    },
    [
      setActiveStep,
      testSapErpConnectionMutation.data?.ok,
      testSapErpConnectionMutation.isSuccess
    ]
  );

  return (
    <Box sx={styles.container}>
      <Button
        variant="contained"
        sx={{ minWidth: 140 }}
        onClick={() => submit(formRef)}
      >
        {!testSapErpConnectionMutation.isLoading && tr('shared.testConnection')}
        {testSapErpConnectionMutation.isLoading && (
          <Loading size={20} circularProgressProps={{ color: 'secondary' }} />
        )}
      </Button>
    </Box>
  );
};
