import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import { Box, Button } from '@mui/material';
import { ModuleHeader } from 'features/settings/modules/shared/components/ModuleHeader';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'shared/components/Modal/components/Modal';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import { StatusEnum } from '../../../../../../../../core/domain/connection/StatusEnum';
import { ConnectionInstance } from '../../components/ConnectionInstance';
import { IntegrationProvider } from '../../context/IntegrationProvider';
import { useGetConnectionDetails } from '../../queries/getConnectionDetails';
import { ConnectModalView } from '../ConnectModalView';
import * as styles from './styles';

export const ConnectionsView = () => {
  const [open, setOpen] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState<any | undefined>(
    undefined
  );
  const { data, isFetching } = useGetConnectionDetails();
  useEffect(() => {
    if (data) {
      setConnectionDetails(data);
    }
  }, [data]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const connectButton = () => {
    if (
      !isFetching &&
      connectionDetails?.status == StatusEnum.PENDING_CONFIGURATION
    ) {
      return (
        <Permission matchAll={[PermissionKey.MANAGE_CONNECTION]}>
          <Button
            startIcon={<ElectricalServicesOutlinedIcon />}
            variant="outlined"
            onClick={handleOpen}
          >
            {tr('shared.connect')}
          </Button>
        </Permission>
      );
    } else {
      return <></>;
    }
  };

  return (
    <IntegrationProvider>
      <Modal open={open} maxWidth="md" onClose={handleClose}>
        <ConnectModalView onClose={handleClose} />
      </Modal>
      <Box sx={styles.container}>
        <ModuleHeader
          title={tr('settings.integrations.connectionSetup.title')}
          description={tr('settings.integrations.connectionSetup.description')}
          end={connectButton()}
        />
        <ConnectionInstance />
      </Box>
    </IntegrationProvider>
  );
};

export default ConnectionsView;
