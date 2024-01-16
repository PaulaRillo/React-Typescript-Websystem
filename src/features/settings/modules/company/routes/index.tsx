import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { Loading } from 'shared/components/Loading';
import { path } from 'shared/constants/path';
import { PermissionKey, ProtectedRoute } from 'shared/modules/Permission';

const CompanyRootView = lazy(() =>
  import('../views/CompanyRootView').then((module) => ({
    default: module.CompanyRootView
  }))
);

const CompanyDetailsView = lazy(() =>
  import('../views/CompanyDetailsView').then((module) => ({
    default: module.CompanyDetailsView
  }))
);

const GeneralView = lazy(() =>
  import('../views/GeneralView').then((module) => ({
    default: module.GeneralView
  }))
);

const CompanyBankingInfoView = lazy(() =>
  import('../views/CompanyBankingInfoView').then((module) => ({
    default: module.CompanyBankingInfoView
  }))
);

const CurrenciesView = lazy(
  () => import('../../../modules/accounting/modules/currencies/views/CurrenciesView')
);

export const CompanyRouter = () => {
  return (
    <Route
      path={path.settings.company.root}
      element={
        <ProtectedRoute matchAll={[PermissionKey.VIEW_COMPANY]}>
          <Suspense fallback={<Loading />}>
            <CompanyRootView />
          </Suspense>
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to={path.settings.company.details} />} />
      <Route
        path={path.settings.company.details}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_COMPANY]}>
            <Suspense fallback={<Loading />}>
              <CompanyDetailsView />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={path.settings.company.bankAccounts}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_COMPANY]}>
            <Suspense fallback={<Loading />}>
              <CompanyBankingInfoView />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={path.settings.company.general}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_COMPANY]}>
            <Suspense fallback={<Loading />}>
              <GeneralView />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path={path.settings.accounting.currencies}
        element={
          <ProtectedRoute matchAll={[PermissionKey.VIEW_COMPANY]}>
            <Suspense fallback={<Loading />}>
              <CurrenciesView />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Route>
  );
};
