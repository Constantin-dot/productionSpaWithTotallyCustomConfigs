import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const { isArticlePageWasOpened } = useJsonSettings();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [dispatch, isArticlePageWasOpened]);

  const onCloseHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Modal isLazy isOpen={isOpen} onClose={onCloseHandler}>
      <Text title={t('youAreWelcome')} text={t('hereYouCanSearch')} />
    </Modal>
  );
});
