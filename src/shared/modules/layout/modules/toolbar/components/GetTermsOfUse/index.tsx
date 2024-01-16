import { Box } from '@mui/material';
import i18next from 'i18next';
import { ModalHeader } from 'shared/components/Modal';
import { EnglishTermsOfUse } from '../EnglishTermsOfUse';
import { PortugueseTermsOfUse } from '../PortugueseTermsOfUse';
import { SpanishTermsOfUse } from '../SpanishTermsOfUse';
import * as styles from './styles';

type Props = {
  handleClose: () => void;
};

export const GetTermsOfUse = ({ handleClose }: Props) => {
  const GetTermsOfUseByLanguage = () => {
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
      <ModalHeader title="Terms and Conditions" divider onClose={handleClose} />
      <Box sx={styles.container}>
        <EnglishTermsOfUse />
      </Box>
    </>
  );

  const spanishText = (
    <>
      <ModalHeader
        title="Términos y condiciones"
        divider
        onClose={handleClose}
      />
      <Box sx={styles.container}>
        <SpanishTermsOfUse />
      </Box>
    </>
  );

  const portugueseText = (
    <>
      <ModalHeader title="Termos e Condições" divider onClose={handleClose} />
      <Box sx={styles.container}>
        <PortugueseTermsOfUse />
      </Box>
    </>
  );

  return GetTermsOfUseByLanguage();
};
