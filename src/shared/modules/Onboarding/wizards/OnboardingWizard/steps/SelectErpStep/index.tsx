import { Box } from '@mui/material';
import { tr } from 'shared/translate';
import SAPLogo from 'shared/assets/erp/sap/sap-logo.svg';
import { Header } from '../../components/Header';
import { Option } from '../../components/Option';
import { useSync } from '../../../../hooks/useSync';

export const SelectErpStep = () => {
  const { setSelectedERP } = useSync();

  return (
    <>
      <Header
        title={tr('shared.selectERP')}
        subTitle={tr('settings.integrations.connectionSetup.selectErp.title')}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Option selected={true} onClick={() => setSelectedERP('sap')}>
          <Box
            component="img"
            src={SAPLogo}
            alt="SAP"
            width={163}
            height={80}
          />
        </Option>
      </Box>
    </>
  );
};
