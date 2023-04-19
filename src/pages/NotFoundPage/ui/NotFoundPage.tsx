import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './NotFoundPage.module.scss';

type PropsType = {className?: string,};

export const NotFoundPage = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.NotFoundPage, {}, [className])}>
      {t('notFoundPage')}
    </Page>
  );
});
