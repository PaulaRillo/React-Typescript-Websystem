import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

//material-ui
import {
  Box,
  MenuItem,
  Pagination as PaginationMui,
  PaginationItem,
  Select,
  Typography
} from '@mui/material';

import { tr } from 'shared/translate';

import * as styles from './styles';

type Props = {
  totalRecords: number | undefined;
  pagesCount?: number | undefined;
};

export const Pagination = ({ totalRecords, pagesCount = 0 }: Props) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const { pathname } = window.location;

  const handleItemsPerPage = useCallback((event: any) => {
    setItemsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    navigate(`${pathname}?take=${itemsPerPage}`);
  }, [itemsPerPage]);

  return (
    <>
      <Box>
        <Typography variant="body2">
          {`${tr('pagination.total')} ${totalRecords || 0}`}
        </Typography>
      </Box>
      <Box sx={styles.pagination}>
        <Typography variant="body2" mr={1}>
          {tr('pagination.itemsPerPage')}
        </Typography>
        <Select
          size="small"
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          disabled={!totalRecords || totalRecords < 20}
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <PaginationMui
          page={page}
          count={pagesCount}
          showFirstButton
          showLastButton
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${pathname}?take=${itemsPerPage}${
                item.page === 1 ? '' : `&page=${item.page}`
              }`}
              {...item}
            />
          )}
        />
      </Box>
    </>
  );
};
