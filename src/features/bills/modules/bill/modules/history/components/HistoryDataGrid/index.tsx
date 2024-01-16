import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { ValueFormatterParams } from 'ag-grid-community';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetInvoice } from 'shared/api/queries/useGetInvoice';
import { useGetInvoiceHistory } from 'shared/api/queries/useGetInvoiceHistory';
import { Tag } from 'shared/components/Tag';
import type { ColumnDefProps, DataGridReact } from 'shared/grids/DataGrid';
import { DataGrid } from 'shared/grids/DataGrid/components/DataGrid';
import { CellRenderProps } from 'shared/grids/DataGrid/types';
import { tr } from 'shared/translate';
import { getLocaleDate } from 'shared/utils/string/getLocaleDate';
import * as styles from './styles';

type Field = 'amount_paid_to_date';

export const HistoryDataGrid = () => {
  const gridRef = useRef<DataGridReact>(null);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const { data: invoice } = useGetInvoice();
  const { data, isLoading } = useGetInvoiceHistory({ year });

  useEffect(() => {
    if (isLoading) gridRef?.current?.api?.showLoadingOverlay();
  }, [isLoading]);

  const getDate = useCallback((params: ValueFormatterParams) => {
    return getLocaleDate(params?.data?.createdAt);
  }, []);

  const columnDefsData: ColumnDefProps[] = useMemo(
    () => [
      {
        headerName: tr('shared.user'),
        field: 'user'
      },
      {
        headerName: tr('shared.action'),
        field: 'action',
        filter: '',
        cellRenderer: (props: CellRenderProps) => {
          if (!props?.data?.field) return <></>;
          const value: Field = props?.data?.field;
          const field: { [key in Field]: string } = {
            amount_paid_to_date: 'PAYMENT'
          };
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                height: '100%'
              }}
            >
              <Tag label={field[value] || ''} type="info" />
            </Box>
          );
        }
      },
      {
        headerName: tr('shared.field'),
        field: 'field',
        filter: '',
        cellRenderer: (props: CellRenderProps) => {
          if (!props?.value) return <></>;
          const value: Field = props?.value;
          const field: { [key in Field]: string } = {
            amount_paid_to_date: 'PAID TO DATE AMOUNT'
          };
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                height: '100%'
              }}
            >
              <Tag label={field[value] || ''} type="info" />
            </Box>
          );
        }
      },
      {
        headerName: tr('shared.oldValue'),
        field: 'oldValue',
        filter: ''
      },
      {
        headerName: tr('shared.field'),
        field: 'newValue',
        filter: ''
      },
      {
        headerName: tr('shared.when'),
        field: 'createdAt',
        filter: '',
        valueFormatter: getDate
      }
    ],
    [getDate]
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value }
    } = event;
    setYear(value);
  };

  const years = useMemo(() => {
    if (!invoice?.invoiceDate) return [];
    const currentYear = new Date().getFullYear();
    const invoiceDate = new Date(invoice?.invoiceDate).getFullYear();
    const diffYears = currentYear - invoiceDate;
    if (diffYears === 0) return [String(currentYear)];
    const years = [];
    for (let i = 0; i <= diffYears; i++) {
      years.push(String(currentYear - i));
    }
    return years;
  }, [invoice?.invoiceDate]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.actions}>
        <FormControl sx={{ width: 104 }}>
          <InputLabel id="year-label">{tr('shared.year')}</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={year}
            label={tr('shared.year')}
            onChange={handleChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DataGrid
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefsData}
        rowHeight={40}
        defaultColDef={{
          flex: 1
        }}
      />
    </Box>
  );
};
