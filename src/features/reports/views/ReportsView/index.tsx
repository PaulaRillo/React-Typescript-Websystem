//material-ui
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
//resources
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
//core-components
import { DatePicker } from 'shared/components/DatePicker';
import { Header } from 'shared/components/Header';
import { Modal } from 'shared/components/Modal';
//translate
import { tr } from 'shared/translate';
//styles
import AdapterDateFns from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Report } from 'features/reports/components/Report';
import { VendorDataGridInfinityScroll } from 'features/reports/grids/VendorDataGridInfinityScroll';
import { DataGridReact } from 'shared/grids/DataGrid';
import * as styles from './styles';

type TimeRange = 'last7days' | 'last15days' | 'last28days' | 'custom' | '';
type SourceType = 'vendors-spend-report' | '';

export const ReportsView = () => {
  const gridRef = useRef<DataGridReact>(null);

  const [data, setData] = useState<SourceType>('');
  const [timeRange, setTimeRange] = useState<TimeRange>('');
  const [openCustomDate, setOpenCustomDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isFormValid, setIsFormValid] = useState(true);

  const handleDataChange = useCallback((event: SelectChangeEvent) => {
    setData(event.target.value as SourceType);
  }, []);

  const handleTimeRangeChange = useCallback((event: SelectChangeEvent) => {
    const tr = event.target.value as TimeRange;
    if (!tr) return;

    const setDates = (timeRange: number) => {
      const date = new Date();
      date.setDate(date.getDate() - timeRange);
      setStartDate(date);
      setEndDate(new Date());
    };

    if (tr === 'last7days') setDates(7);
    if (tr === 'last15days') setDates(15);
    if (tr === 'last28days') setDates(28);

    setTimeRange(tr);
    setOpenCustomDate(event.target.value === 'custom');
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleStartDate = useCallback((value: Date | undefined) => {
    setStartDate(value);
  }, []);

  const handleEndDate = useCallback((value: Date | undefined) => {
    setEndDate(value);
  }, []);

  const modalTitle = useMemo(() => {
    if (!data) return '';
    const title = {
      'vendors-spend-report': tr('shared.vendorSpendReport')
    };
    return title[data];
  }, [data]);

  useEffect(() => {
    if (openCustomDate)
      setIsFormValid(!(data && timeRange && startDate && endDate));
    else setIsFormValid(!(data && timeRange));
  }, [data, timeRange, startDate, endDate, openCustomDate]);

  return (
    <Box>
      <Header title={tr('reports.title')} sx={{ m: 2 }} />
      <Container maxWidth="md">
        <Box sx={styles.content}>
          <Box sx={styles.header}>
            <Typography variant="h5">{tr('reports.data.title')}</Typography>
            <Typography color="text.secondary">
              {tr('reports.data.subTitle')}
            </Typography>
          </Box>
          <Divider variant="fullWidth" />
          <Box sx={styles.form}>
            <FormControl fullWidth>
              <InputLabel id="reportsData">
                {tr('reports.data.title')}
              </InputLabel>
              <Select
                labelId="reportsData"
                id="selectData"
                label={tr('reports.data.title')}
                value={data}
                onChange={handleDataChange}
              >
                <MenuItem value="vendors-spend-report">
                  {tr('shared.vendorSpendReport')}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="reportsData">
                {tr('reports.timeRange')}
              </InputLabel>
              <Select
                labelId="reportsData"
                id="selectTimeRange"
                label={tr('reports.timeRange')}
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <MenuItem value="last7days">
                  {tr('reports.form.timeRange.last7days')}
                </MenuItem>
                <MenuItem value="last15days">
                  {tr('reports.form.timeRange.last15days')}
                </MenuItem>
                <MenuItem value="last28days">
                  {tr('reports.form.timeRange.last28days')}
                </MenuItem>
                <MenuItem value="custom">
                  {tr('reports.form.timeRange.CustomDateRange')}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {openCustomDate && (
            <Box sx={styles.form}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    onSetDate={handleStartDate}
                    label={tr('reports.timeRange.startDate')}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    minDate={startDate}
                    onSetDate={handleEndDate}
                    label={tr('reports.timeRange.endDate')}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
          )}
        </Box>
        <Box sx={styles.button}>
          <Button
            variant="contained"
            startIcon={<EqualizerOutlinedIcon />}
            size="large"
            onClick={handleOpen}
            disabled={isFormValid}
          >
            {tr('reports.button.text')}
          </Button>
        </Box>
        <Modal fullScreen open={open} onClose={handleClose} sx={{ p: 4 }}>
          <Report
            title={modalTitle}
            onClose={handleClose}
            startDate={startDate}
            endDate={endDate}
            gridRef={gridRef}
          >
            {data === 'vendors-spend-report' && (
              <VendorDataGridInfinityScroll
                gridRef={gridRef}
                startDate={startDate}
                endDate={endDate}
              />
            )}
          </Report>
        </Modal>
      </Container>
    </Box>
  );
};

export default ReportsView;
