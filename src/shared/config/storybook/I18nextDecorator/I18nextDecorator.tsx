import { Story } from '@storybook/react';
import { I18nextProvider, useTranslation } from 'react-i18next';

export const I18nextDecorator = (StoryComponent: Story) => {
  const { i18n } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <StoryComponent />
    </I18nextProvider>
  );
};
