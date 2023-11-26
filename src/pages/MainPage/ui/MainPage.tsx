import { memo } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line constantin-dot-plugin/layer-imports-checker
import { BugButton } from '@/app/providers/ErrorBoundary';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';
import { getFeatrueFlag } from '@/shared/lib/features';

const MainPage = memo(() => {
  const { t } = useTranslation('main');
  const isCounterEnabled = getFeatrueFlag('isCounterEnabled');

  return (
    <Page data-testid="MainPage">
      <VStack align="start" gap="16">
        <HStack justify="between" max>
          {t('mainPageContent')}
          <BugButton />
        </HStack>
        {isCounterEnabled && <Counter />}
      </VStack>
    </Page>
  );
});

export default MainPage;
