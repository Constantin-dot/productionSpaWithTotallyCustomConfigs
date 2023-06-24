import { memo } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line constantin-dot-plugin/layer-imports-checker
import { BugButton } from '@/app/providers/ErrorBoundary';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';

const MainPage = memo(() => {
  const { t } = useTranslation('main');

  return (
    <Page
      data-testid="MainPage"
    >
      <VStack align="start" gap="16">
        <HStack justify="between" max>
          {t('mainPageContent')}
          <BugButton />
        </HStack>
        <Counter />
      </VStack>
    </Page>
  );
});

export default MainPage;
