import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import { Box } from '@mui/material';
import { useGetVendor } from 'features/vendors/modules/vendor/queries/useGetVendor';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import {
  Section,
  SectionContent,
  SectionHeader
} from 'shared/components/Section';
import { useFormatValue } from 'shared/hooks/useFormatValue';
import { tr } from 'shared/translate';
import { InfoCard } from '../InfoCard';
import * as styles from './styles';

export const KpisSection = () => {
  const { data } = useGetVendor();
  const { data: tenantSettings } = useGetTenantSettings();
  const { formatCurrency } = useFormatValue();

  return (
    <Section sx={{ bgcolor: 'transparent' }}>
      <SectionHeader title={tr('vendors.vendor.kpis')} />
      <SectionContent>
        <Box sx={styles.content}>
          <InfoCard
            icon={AccountBalanceWalletTwoToneIcon}
            title={tr('vendors.vendor.kpis.openBalance')}
            value={formatCurrency(
              tenantSettings?.localCurrencyExternalId || '',
              data?.openBalance || ''
            )}
            description=""
            tooltip={tr('vendors.vendor.kpis.openBalance.tooltip')}
          />
          <InfoCard
            icon={AccountBalanceWalletTwoToneIcon}
            title={tr('vendors.vendor.kpis.openBills')}
            value={data ? String(data?.openInvoices) : '0'}
            description=""
            tooltip={tr('vendors.vendor.kpis.openBills.tooltip')}
          />
          {/* <InfoCard
            icon={PaymentTwoToneIcon}
            title={tr('vendors.vendor.kpis.payments')}
            value="USD 12,740"
            description="Last 30 days"
            tooltip={tr('vendors.vendor.kpis.payments.tooltip')}
          /> */}
          {/*<InfoCard*/}
          {/*  icon={AccountBalanceWalletTwoToneIcon}*/}
          {/*  title={tr('vendors.vendor.kpis.billsMissingApproval')}*/}
          {/*  value="4"*/}
          {/*  description="All time"*/}
          {/*  tooltip={tr('vendors.vendor.kpis.billsMissingApproval.tooltip')}*/}
          {/*/>*/}
          {/*<InfoCard*/}
          {/*  icon={AccountBalanceWalletTwoToneIcon}*/}
          {/*  title={tr('vendors.vendor.kpis.paymentsRequested')}*/}
          {/*  value="8"*/}
          {/*  description="All time"*/}
          {/*  tooltip={tr('vendors.vendor.kpis.paymentsRequested.tooltip')}*/}
          {/*/>*/}
          {/*<InfoCard*/}
          {/*  icon={PaymentTwoToneIcon}*/}
          {/*  title={tr('vendors.vendor.kpis.lastPayment')}*/}
          {/*  value="USD 1,240"*/}
          {/*  description="2 days ago"*/}
          {/*  tooltip={tr('vendors.vendor.kpis.lastPayment.tooltip')}*/}
          {/*/>*/}
        </Box>
      </SectionContent>
    </Section>
  );
};
