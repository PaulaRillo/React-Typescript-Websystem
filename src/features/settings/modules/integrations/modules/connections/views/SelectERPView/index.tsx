import { Box, Typography } from '@mui/material';
import { tr } from 'shared/translate';
import SAPLogo from 'shared/assets/erp/sap/sap-logo.svg';
import { Option } from '../../components/Option';
import { useIntegration } from '../../hooks/useIntegration';
import * as styles from './styles';

export const SelectERPView = () => {
  const { selectedERP, handleSelectERP } = useIntegration();

  return (
    <Box sx={styles.container}>
      <Typography variant="body2" mb={2}>
        {tr('settings.integrations.connectionSetup.selectErp.title')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Option
          selected={selectedERP === 'sap'}
          data-option="sap"
          onClick={handleSelectERP}
        >
          <Box
            component="img"
            src={SAPLogo}
            alt="SAP"
            width={163}
            height={80}
          />
        </Option>
      </Box>
    </Box>
  );
};
