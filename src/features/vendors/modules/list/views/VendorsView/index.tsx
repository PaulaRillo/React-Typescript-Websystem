import { useRef } from 'react';
import { Container } from 'shared/components/Container';
import { Header } from 'shared/components/Header';
import { DataGridReact } from 'shared/grids/DataGrid';
import { tr } from 'shared/translate';
import { VendorDataGridInfinityScroll } from '../../grids/VendorDataGridInfinityScroll';

export const VendorsView = () => {
  const gridRef = useRef<DataGridReact>(null);

  return (
    <Container>
      <Header title={tr('vendors.title')} />
      <VendorDataGridInfinityScroll gridRef={gridRef} />
    </Container>
  );
};

export default VendorsView;
