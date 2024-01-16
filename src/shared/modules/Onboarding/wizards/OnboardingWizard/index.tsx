import { tr } from 'shared/translate';
import { lazy, Suspense, useMemo, useRef } from 'react';
import { Loading } from 'shared/components/Loading';
import { Action, CreationWizard, Step } from 'shared/modules/CreationWizard';
import { ConnectERPActions } from './actions/ConnectERPActions';
import { PullDataActions } from './actions/PullDataActions';
import { SuccessActions } from './actions/SuccessActions';
import { TestERPConnectionActions } from './actions/TestERPConnectionActions';

const SelectErpStep = lazy(() =>
  import('./steps/SelectErpStep').then((mod) => ({
    default: mod.SelectErpStep
  }))
);

const TestErpConnectionStep = lazy(() =>
  import('./steps/TestErpConnectionStep').then((mod) => ({
    default: mod.TestErpConnectionStep
  }))
);

const ConnectErpStep = lazy(() =>
  import('./steps/ConnectErpStep').then((mod) => ({
    default: mod.ConnectErpStep
  }))
);

const SyncStep = lazy(() =>
  import('./steps/SyncStep').then((mod) => ({
    default: mod.SyncStep
  }))
);

const SuccessStep = lazy(() =>
  import('./steps/SuccessStep').then((mod) => ({
    default: mod.SuccessStep
  }))
);

export const OnboardingWizard = () => {
  const testERPConnectionFormRef = useRef<HTMLFormElement>(null);

  const steps = useMemo<Step[]>(
    () => [
      {
        label: tr('shared.selectERP')
      },
      {
        label: tr('shared.testConnection')
      },
      {
        label: tr('shared.connect')
      },
      {
        label: tr('shared.sync')
      }
    ],
    []
  );

  const actions = useMemo<Action[]>(
    () => [
      {
        backward: {
          defaultProps: {
            disabled: true
          }
        }
      },
      {
        forward: {
          render: (props) => (
            <TestERPConnectionActions
              formRef={testERPConnectionFormRef}
              {...props}
            />
          )
        }
      },
      {
        forward: {
          render: (props) => <ConnectERPActions {...props} />
        },
        backward: {
          defaultProps: {
            disabled: true
          }
        }
      },
      {
        forward: {
          render: (props) => <PullDataActions {...props} />
        },
        backward: {
          defaultProps: {
            disabled: true
          }
        }
      },
      {
        forward: {
          render: () => <SuccessActions />
        },
        backward: {
          defaultProps: {
            disabled: true
          }
        }
      }
    ],
    []
  );

  return (
    <CreationWizard steps={steps} actions={actions}>
      <Suspense fallback={<Loading title={tr('shared.selectERP')} />}>
        <SelectErpStep />
      </Suspense>
      <Suspense fallback={<Loading title={tr('shared.testConnection')} />}>
        <TestErpConnectionStep formRef={testERPConnectionFormRef} />
      </Suspense>
      <Suspense fallback={<Loading title={tr('shared.connect')} />}>
        <ConnectErpStep />
      </Suspense>
      <Suspense fallback={<Loading title={tr('shared.synchronizing')} />}>
        <SyncStep />
      </Suspense>
      <Suspense fallback={<Loading title={tr('shared.synchronizing')} />}>
        <SuccessStep />
      </Suspense>
    </CreationWizard>
  );
};
