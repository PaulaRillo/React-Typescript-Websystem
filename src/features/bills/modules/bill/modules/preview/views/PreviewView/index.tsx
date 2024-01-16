import { Box } from '@mui/material';
import { PreviewDate } from 'features/bills/modules/bill/modules/preview/components/PreviewDate';
import { PreviewEntity } from 'features/bills/modules/bill/modules/preview/components/PreviewEntity';
import { PreviewHeader } from 'features/bills/modules/bill/modules/preview/components/PreviewHeader';
import { PreviewLineItemsGrid } from 'features/bills/modules/bill/modules/preview/components/PreviewLineItemsGrid';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { tr } from 'shared/translate';
import { Loading } from '../../../../../../../../shared/components/Loading';
import { getLocaleDate } from '../../../../../../../../shared/utils/string/getLocaleDate';
import { PreviewFooter } from '../../components/PreviewFooter';
import { PreviewLineItemsSummary } from '../../components/PreviewLineItemsSummary';
import * as styles from './styles';

export const PreviewView = () => {
  const { data, isLoading } = useGetInvoice();

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Box component="section" sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={styles.preview}>
          <PreviewHeader
            id={data?.externalId || ''}
            vendorName={data?.invoiceFrom?.name || ''}
            status={data?.invoiceStatus || ''}
          />
          <Box sx={styles.fromTo}>
            <PreviewEntity
              title={tr('bills.bill.root.preview.invoiceFrom')}
              name={data?.invoiceFrom?.name || ''}
              shortAddress={''}
              phone={''}
            />
            <PreviewEntity
              title={tr('bills.bill.root.preview.invoiceTo')}
              name="H&CO"
              shortAddress="2320 Ponce de Leon, Coral Gables, FL 33134"
              phone="(305) 444-8800"
            />
          </Box>
          <Box sx={styles.dates}>
            <PreviewDate
              title={tr('bills.bill.invoiceDate')}
              date={getLocaleDate(data?.createdAt) || ''}
            />
            <PreviewDate
              title={tr('bills.bill.dueDate')}
              date={getLocaleDate(data?.dueDate) || ''}
            />
          </Box>
          <PreviewLineItemsGrid />
          <PreviewLineItemsSummary />
          <PreviewFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewView;
