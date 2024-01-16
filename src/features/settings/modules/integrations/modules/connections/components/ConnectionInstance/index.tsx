import { Box, IconButton, Typography } from '@mui/material';
import { Info } from 'shared/components/Info';
import { Tag } from 'shared/components/Tag';
import EditIcon from '@mui/icons-material/Edit';
import * as styles from './styles';
import { useEffect, useState } from 'react';
import { useGetConnectionDetails } from '../../queries/getConnectionDetails';
import { StatusEnum } from '../../../../../../../../core/domain/connection/StatusEnum';
import { tr } from 'shared/translate';

export const ConnectionInstance = () => {
  const [connectionDetails, setConnectionDetails] = useState<any | undefined>(
    undefined
  );
  const { data } = useGetConnectionDetails();
  useEffect(() => {
    if (data) {
      setConnectionDetails(data);
    }
  }, [data]);

  if (
    !connectionDetails?.status ||
    connectionDetails?.status == StatusEnum.PENDING_CONFIGURATION
  ) {
    return <></>;
  }
  const connectionStatusTag = () => {
    if (connectionDetails?.status) {
      switch (connectionDetails?.status) {
        case StatusEnum.ACTIVE: {
          return <Tag type="success" label={tr('connectionStatus.active')} />;
        }
        case StatusEnum.INACTIVE: {
          return <Tag type="error" label={tr('connectionStatus.inactive')} />;
        }
        case StatusEnum.MISCONFIGURED: {
          return (
            <Tag type="error" label={tr('connectionStatus.misconfigured')} />
          );
        }
        case StatusEnum.UNKNOWN: {
          return <Tag type="neutral" label={tr('connectionStatus.unknown')} />;
        }
        default: {
          return <></>;
        }
      }
    } else {
      return <></>;
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box>
          <Typography variant="h6">
            {tr('shared.connectedTo', {
              value: connectionDetails?.accountingSoftware || ''
            })}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {tr('settings.integrations.connectionSetup.successMessage')}
          </Typography>
        </Box>
        {/*TODO: Enable this button when logic is implemented to change connection details*/}
        {/*<Box>*/}
        {/*  <IconButton>*/}
        {/*    <EditIcon />*/}
        {/*  </IconButton>*/}
        {/*</Box>*/}
      </Box>
      <Box sx={styles.content}>
        <Info title={tr('shared.erpAccountingSoftware')}>
          <Typography variant="body2">
            {connectionDetails?.accountingSoftware || ''}
          </Typography>
        </Info>
        <Info title={tr('shared.status')}>{connectionStatusTag()}</Info>
        <Info title={tr('shared.endpoint')}>
          <Typography variant="body2">
            {connectionDetails?.apiEndpoint || ''}
          </Typography>
        </Info>
        <Info title={tr('shared.database')}>
          <Typography variant="body2">
            {connectionDetails?.databaseName || ''}
          </Typography>
        </Info>
        <Info title={tr('shared.username')}>
          <Typography variant="body2">
            {connectionDetails?.username || ''}
          </Typography>
        </Info>
      </Box>
    </Box>
  );
};
