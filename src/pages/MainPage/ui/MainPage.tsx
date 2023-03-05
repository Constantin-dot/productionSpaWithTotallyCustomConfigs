import { BugButton } from 'app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = memo(() => {
  const { t } = useTranslation('main');

  return (
    <div>
      {t('mainPageContent')}
      <BugButton />
    </div>
  );
});

export default MainPage;
