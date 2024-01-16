import { tr } from 'shared/translate';
import { useNavigate } from 'react-router-dom';
import { Header } from 'shared/components/Header';
import { Loading } from 'shared/components/Loading';
import { Tag } from 'shared/components/Tag';
import { path } from 'shared/constants/path';
import { useAlert } from 'shared/hooks/useAlert';
import { Container } from '../../components/Container';
import { Content } from '../../components/Content';
import { DetailsSection } from '../../components/DetailsSection';
import { Nav } from '../../components/Nav';
import { useGetVendor } from '../../queries/useGetVendor';

export const RootView = () => {
  const { data, isLoading, isError } = useGetVendor();
  const navigate = useNavigate();
  const { alert } = useAlert();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    alert({
      title: tr('vendors.vendor.notFound.title'),
      message: tr('vendors.vendor.notFound.message'),
      severity: 'error'
    });
    navigate(-1);
  }

  return (
    <Container>
      <Header
        title={data?.name || ''}
        crumbs={[{ to: path.vendors.root, label: tr('vendors.title') }]}
        end={<Tag type="success" label={tr('shared.active')} />}
        sx={{ m: 2 }}
      />
      <Nav />
      <Content>{/* <DetailsSection /> */}</Content>
    </Container>
  );
};

export default RootView;
