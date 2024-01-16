import { useMemo } from 'react';
import {
  Section,
  SectionContent,
  SectionHeader
} from 'shared/components/Section';
import { ColumnDefProps } from 'shared/grids/DataGrid';
import { DataGridStatusCell } from 'shared/grids/DataGrid/components/DataGridStatusCell';
import { DataGridUserCell } from 'shared/grids/DataGrid/components/DataGridUserCell';
import { tr } from 'shared/translate';
import { VendorsDataGrid } from '../../../shared/components/VendorsDataGrid';

export const RecentPaymentsSection = () => {
  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        field: 'user',
        headerName: tr('shared.user'),
        cellRenderer: DataGridUserCell,
        width: 200
      },
      {
        field: 'method',
        headerName: tr('shared.method'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter'
      },
      {
        field: 'status',
        headerName: tr('shared.status'),
        cellRenderer: DataGridStatusCell,
        width: 120
      },
      {
        field: 'when',
        headerName: tr('shared.when'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agDateColumnFilter',
        width: 200
      },
      {
        field: 'currency',
        headerName: tr('shared.currency'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        type: 'rightAligned',
        width: 120
      },
      {
        field: 'amount',
        headerName: tr('shared.amount'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agNumberColumnFilter',
        type: 'rightAligned',
        width: 120
      },
      {
        field: 'description',
        headerName: tr('shared.description'),
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agTextColumnFilter',
        flex: 1,
        minWidth: 320
      }
    ],
    []
  );

  const rowData = useMemo(
    () => [
      {
        user: {
          firstname: 'Paula',
          lastname: 'Rillo'
        },
        currency: 'USD',
        amount: '$1,240.00',
        method: 'Itaú Visa',
        when: 'Mar 17, 2022 - 10:23 AM',
        description: 'Payment for the month of March',
        status: {
          type: 'success',
          title: 'PAID'
        }
      },
      {
        user: {
          firstname: 'Paula',
          lastname: 'Rillo'
        },
        currency: 'USD',
        amount: '$1,240.00',
        method: 'Nubank Mastercard',
        when: 'Mar 17, 2022 - 09:30 AM',
        description: 'Insuficient funds',
        status: {
          type: 'error',
          title: 'REJECTED'
        }
      }
    ],
    []
  );

  return (
    <Section>
      <SectionHeader title={tr('shared.recentPayments')} />
      <SectionContent sx={{ height: 240 }}>
        <VendorsDataGrid rowData={rowData} columnDefs={columnDefsData} />
      </SectionContent>
    </Section>
  );
};
