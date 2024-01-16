//core-components
import { Section } from 'features/settings/modules/shared/components/Section';
import { SectionItem } from 'features/settings/modules/shared/components/SectionItem';
//translate
import { tr } from 'shared/translate';

export const GeneralPreferenceSection = () => {
  return (
    <Section title={tr('settings.section.title.general')}>
      <>
        <SectionItem
          title={tr('settings.section.item.language')}
          description={'English (United States)'}
        />
        <SectionItem
          title={tr('settings.section.item.theme')}
          description="Light"
        />
      </>
    </Section>
  );
};
