import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useTranslation } from 'react-i18next';

type PropsType = {
  className?: string,
};

export const ForbiddenPage = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames('', {}, [className])}>
      {t('pageAccesDenied')}
    </Page>
  );
});
