import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import * as styles from './styles';
import { ModalActions, ModalHeader } from 'shared/components/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { useIntegration } from '../../hooks/useIntegration';
import { SelectERPView } from '../SelectERPView';
import { StepSwitch } from '../../components/StepSwitch';
import { TestErpConnectionView } from '../TestErpConnectionView';
import { ReviewConnectView } from '../ReviewConnectView';
import { tr } from 'shared/translate';
import { SuccessView } from '../SuccessView';

type Props = {
  onClose: () => void;
};

export const ConnectModalView = ({ onClose }: Props) => {
  const {
    steps,
    error,
    nextStepAvailable,
    activeStep,
    isConnectLoading,
    handleNext,
    handlePrev
  } = useIntegration();

  return (
    <Box sx={styles.container}>
      <ModalHeader
        title={tr('settings.integrations.connectionSetup.modal.title')}
        sx={styles.header}
        divider
        onClose={onClose}
      />
      <Stepper activeStep={activeStep} sx={styles.stepper}>
        {steps.map((step, idx) => (
          <Step key={`${step}-${idx}`}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box component="main" sx={styles.main}>
        <StepSwitch activeStep={activeStep}>
          <SelectERPView />
          <TestErpConnectionView />
          <ReviewConnectView />
          <SuccessView />
        </StepSwitch>
      </Box>
      <ModalActions
        divider
        left={<Button onClick={handlePrev}>{tr('shared.back')}</Button>}
      >
        {error && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CancelIcon color="error" />
            <Typography variant="caption" color="error" ml={1}>
              {error.message}
            </Typography>
          </Box>
        )}
        {isConnectLoading && <CircularProgress color="secondary" size={20} />}
        {activeStep === 3 && (
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        )}
        {!(activeStep === 3) && (
          <Button
            variant="contained"
            disabled={!nextStepAvailable}
            onClick={handleNext}
          >
            {activeStep === 0 && tr('shared.next')}
            {activeStep === 1 && tr('shared.next')}
            {activeStep === 2 && tr('shared.connect')}
          </Button>
        )}
      </ModalActions>
    </Box>
  );
};
