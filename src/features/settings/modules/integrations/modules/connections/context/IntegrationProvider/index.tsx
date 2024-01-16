import { TestSapErpConnectionInputDTO } from 'core/infra/service/settings/TestSapErpConnection/TestSapErpConnectionInputDTO';
import {
  createContext,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { connectSapErp } from 'shared/api/requests/connectSapErp';
import { testSapErpConnection } from 'shared/api/requests/testSapErpConnection';

type IntegrationError = {
  code: string;
  message: string;
};

type SelectedERP = 'sap' | 'qb' | undefined;
type Steps = ['Select ERP', 'Test connection', 'Review / Connect'];

type InitialState = {
  handleNext: (e: SyntheticEvent) => void;
  handlePrev: (e: SyntheticEvent) => void;
  handleSelectERP: (e: SyntheticEvent) => void;
  handleTestSapErpConnection: (input: TestSapErpConnectionInputDTO) => void;
  sapErpConnectionInfo?: TestSapErpConnectionInputDTO;
  disableNextStep: () => void;
  nextStepAvailable: boolean;
  selectedERP: SelectedERP;
  isCredentialsUpdated: boolean;
  isLoading: boolean;
  isConnectLoading: boolean;
  isTestFinished: boolean;
  isConnectionSuccessful: boolean;
  error?: IntegrationError;
  activeStep: number;
  steps: ['Select ERP', 'Test connection', 'Review / Connect'];
};

type Props = {
  children: ReactNode;
};

const IntegrationContext = createContext({ activeStep: 0 } as InitialState);

const IntegrationProvider = ({ children }: Props) => {
  const steps: Steps = useMemo(
    () => ['Select ERP', 'Test connection', 'Review / Connect'],
    []
  );
  const [activeStep, setActiveStep] = useState(0);
  const [sapErpConnectionInfo, setSapErpConnectionInfo] = useState<
    TestSapErpConnectionInputDTO | undefined
  >(undefined);
  const [nextStepAvailable, setNextStepAvailable] = useState(false);
  const [selectedERP, setSelectedERP] = useState<SelectedERP>('sap');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectLoading, setIsConnectLoading] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [isConnectionSuccessful, setIsConnectionSuccessful] = useState(false);
  const [isCredentialsUpdated, setIsCredentialsUpdated] = useState(false);
  const [error, setError] = useState<IntegrationError | undefined>(undefined);

  const handleNext = useCallback(async () => {
    if (activeStep === steps.length - 1) {
      setIsConnectLoading(true);
      setError(undefined);
      const response = await connectSapErp({
        host: sapErpConnectionInfo?.host || '',
        dbname: sapErpConnectionInfo?.credentials.dbname || '',
        username: sapErpConnectionInfo?.credentials.username || '',
        password: sapErpConnectionInfo?.credentials.password || ''
      });
      setIsConnectLoading(false);
      // TODO: Update this logic to check based on response status code instead
      if (response[0] === 'Credentials updated successfully') {
        setIsCredentialsUpdated(true);
        setActiveStep((state) => state + 1);
      } else {
        setError({
          code: 'CONNECTION_ERROR',
          message: response
        });
      }
      return;
    }
    setActiveStep((state) => state + 1);
  }, [
    activeStep,
    sapErpConnectionInfo?.credentials.dbname,
    sapErpConnectionInfo?.credentials.password,
    sapErpConnectionInfo?.credentials.username,
    sapErpConnectionInfo?.host,
    steps.length
  ]);

  const handlePrev = useCallback(() => {
    if (activeStep === 0) return;
    setActiveStep((state) => state - 1);
  }, [activeStep]);

  const handleSelectERP = useCallback(
    (e: SyntheticEvent) => {
      const option = e.currentTarget.getAttribute('data-option') as SelectedERP;
      if (option === selectedERP) {
        setSelectedERP(undefined);
      } else {
        setSelectedERP(option);
      }
    },
    [selectedERP]
  );

  const handleTestSapErpConnection = useCallback(
    async (input: TestSapErpConnectionInputDTO) => {
      setIsLoading(true);
      setIsTestFinished(false);
      setError(undefined);
      try {
        const response = await testSapErpConnection(input);
        setIsConnectionSuccessful(response.ok);
        setNextStepAvailable(response.ok);
        setSapErpConnectionInfo(input);
      } catch (error) {
        setNextStepAvailable(false);
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsTestFinished(true);
      }
    },
    []
  );

  const disableNextStep = useCallback(() => {
    setNextStepAvailable(false);
  }, []);

  useEffect(
    function validateNextStep() {
      if (activeStep === 0) {
        setNextStepAvailable(!!selectedERP);
      }
    },
    [activeStep, selectedERP]
  );

  return (
    <IntegrationContext.Provider
      value={{
        handleNext,
        handlePrev,
        handleSelectERP,
        handleTestSapErpConnection,
        nextStepAvailable,
        disableNextStep,
        sapErpConnectionInfo,
        selectedERP,
        isCredentialsUpdated,
        isLoading,
        isConnectLoading,
        isTestFinished,
        isConnectionSuccessful,
        error,
        activeStep,
        steps
      }}
    >
      {children}
    </IntegrationContext.Provider>
  );
};

export { IntegrationProvider, IntegrationContext };
