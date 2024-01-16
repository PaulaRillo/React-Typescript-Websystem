//material-ui
import { Box } from '@mui/material';
//translate
import { tr } from 'shared/translate';
//queries
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
//core-components
import { CurrentCurrency } from '../../../../../../../../shared/modules/PaymentWizardPanel/components/CurrentCurrency';
import { PaymentPanelInfo } from '../../../../../../../../shared/modules/PaymentWizardPanel/components/PaymentPanelInfo';
//styles
import * as styles from './styles';


export const CurrenciesPanel = () => {
    const { data: tenantSettings } = useGetTenantSettings();

    return (
        <Box sx={styles.infos}>
            <PaymentPanelInfo
                title={tr('shared.localCurrency')}
                value={tenantSettings?.localCurrency?.iso4217_alpha3 || ''} />
            <PaymentPanelInfo
                title={tr('shared.systemCurrency')}
                value={tenantSettings?.systemCurrency?.iso4217_alpha3
                    || ''} />
            {/* <CurrentCurrency title={tr('shared.defaultAccountCurrency')} /> */}
        </Box>
    )
}

export default CurrenciesPanel;