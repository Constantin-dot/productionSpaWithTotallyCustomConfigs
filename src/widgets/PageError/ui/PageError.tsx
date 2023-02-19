import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './PageError.module.scss';

type PropsType = {className?: string,};

export const PageError: FC<PropsType> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  const reloadPageHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>{t('boundaryErrorMessage')}</p>
      <Button onClick={reloadPageHandler}>{t('refreshBtnLable')}</Button>
    </div>
  );
};
