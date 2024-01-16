import { Box } from '@mui/material';
import i18next from 'i18next';
import { ModalHeader } from 'shared/components/Modal';
import { EnglishPrivacyPolicy } from '../EnglishPrivacyPolicy';
import { PortuguesePrivacyPolicy } from '../PortuguesePrivacyPolicy';
import { SpanishPrivacyPolicy } from '../SpanishPrivacyPolicy';
import * as styles from './styles';

type Props = {
  handleClose: () => void;
};

export const GetPrivacyPolicy = ({ handleClose }: Props) => {
  const GetPrivacyPolicyByLanguage = () => {
    const language = i18next.language.slice(0, 2);
    if (language === 'en') {
      return englishText;
    } else if (language === 'es') {
      return spanishText;
    } else if (language === 'pt') {
      return portugueseText;
    } else {
      return englishText;
    }
  };

  const englishText = (
    <>
      <ModalHeader title="Privacy Policy" divider onClose={handleClose} />
      <Box sx={styles.container}>
        <EnglishPrivacyPolicy />
      </Box>
    </>
  );

  const spanishText = (
    <>
      <ModalHeader
        title="Política de privacidad"
        divider
        onClose={handleClose}
      />
      <Box sx={styles.container}>
        <SpanishPrivacyPolicy />
      </Box>
    </>
  );

  const portugueseText = (
    <>
      <ModalHeader
        title="Política de Privacidade"
        divider
        onClose={handleClose}
      />
      <Box sx={styles.container}>
        <PortuguesePrivacyPolicy />
      </Box>
    </>
  );

  return GetPrivacyPolicyByLanguage();
};
