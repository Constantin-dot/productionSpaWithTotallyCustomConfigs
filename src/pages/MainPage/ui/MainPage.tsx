import { BugButton } from 'app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack, VStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
  const { t } = useTranslation('main');

  return (
    <Page>
      <VStack align="start">
        <HStack justify="between" max>
          {t('mainPageContent')}
          <BugButton />
        </HStack>
      </VStack>
    </Page>
  );
});

export default MainPage;
