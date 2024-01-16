//core-components
import { Section } from 'features/settings/modules/shared/components/Section';
import { SectionItem } from 'features/settings/modules/shared/components/SectionItem';
import core from 'core.v2';
//translate
import { tr } from 'shared/translate';
import { Link } from '@mui/material';
import * as styles from './styles';

export const SecurityInfoSection = () => {
  return (
    <Section title={tr('settings.section.title.security')}>
      <Link href={import.meta.env.VITE_CENTRAL_PORTAL_URL} sx={core.store.loggedUser?.mfaEnabled ? styles.inactive : styles.active} target="_blank">
        <SectionItem
          title={tr('settings.section.item.mfa')}
          description={
            core.store.loggedUser?.mfaEnabled
              ? tr('settings.section.placeholder.mfaActive')
              : tr('settings.section.placeholder.mfaInactive')
          }
        />
      </Link>
    </Section>
  );
};
