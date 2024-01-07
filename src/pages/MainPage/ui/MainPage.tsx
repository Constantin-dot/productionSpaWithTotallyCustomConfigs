import { memo } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line constantin-dot-plugin/layer-imports-checker
import { BugButton } from '@/app/providers/ErrorBoundary';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { ToggleFeatures } from '@/shared/lib/features';
import { Counter } from '@/entities/Counter';
import { Card } from '@/shared/ui/deprecated/Card';

const MainPage = memo(() => {
  const { t } = useTranslation('main');

  return (
    <Page data-testid="MainPage">
      <VStack align="start" gap="16">
        <HStack justify="between" max>
          {t('mainPageContent')}
          <BugButton />
        </HStack>
        <ToggleFeatures
          feature="isCounterEnabled"
          on={<Card>New counter will soon here</Card>}
          off={<Counter />}
        />
      </VStack>
    </Page>
  );
});

export default MainPage;
