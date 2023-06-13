import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page/Page';
import { RatingCard } from '@/entities/Rating';

const MainPage = memo(() => {
  const { t } = useTranslation('main');

  return (
    <Page>
      <VStack align="start">
        <HStack justify="between" max>
          {t('mainPageContent')}
          <BugButton />
        </HStack>
        <RatingCard
          title="What do you think about the article?"
          feedbackTitle="Please, stay here you oppinion about the article."
          hasFeedback
        />
      </VStack>
    </Page>
  );
});

export default MainPage;
