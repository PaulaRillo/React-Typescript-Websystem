import CloseIcon from '@mui/icons-material/Close';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import {
  AppBar,
  Box,
  Chip,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';

import { useCallback } from 'react';
import type { DataGridReact } from 'shared/grids/DataGrid';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import { tr } from 'shared/translate';
import * as styles from './styles';

type Props = {
  gridRef: React.RefObject<DataGridReact>;
  title: string;
  children: React.ReactNode;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onClose: () => void;
};

export const Report = ({
  gridRef,
  title,
  children,
  startDate,
  endDate,
  onClose
}: Props) => {
  const handleExportCSV = useCallback(() => {
    gridRef?.current?.api?.exportDataAsCsv({
      fileName: 'billtally-export.csv'
    });
  }, []);

  const formatDate = useCallback((date: Date | undefined) => {
    if (!date) return '';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }, []);

  return (
    <>
      <AppBar
        color="transparent"
        position="static"
        sx={{ borderBottom: '1px solid', borderColor: 'grey.200' }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {tr('reports.title')}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={styles.body}>
        <Typography variant="h3">{title}</Typography>
        <Box sx={styles.marks}>
          <Typography variant="h6">{tr('shared.startDate')}</Typography>
          <Chip label={formatDate(startDate)} />
          <Typography variant="h6">{tr('shared.endDate')}</Typography>
          <Chip label={formatDate(endDate)} />
          <Permission matchAll={[PermissionKey.EXPORT_REPORT]}>
            <IconButton
              onClick={handleExportCSV}
              color="inherit"
              sx={styles.iconButton}
            >
              <DownloadTwoToneIcon />
            </IconButton>
          </Permission>
        </Box>
      </Box>
      {children}
    </>
  );
};
