import { getArticleDetailsData } from 'entities/Article';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { getCanEditArticle } from '../../model/selectors/articles/articles';
import cls from './ArticleDetailsPageHeader.module.scss';

type PropsType = {className?: string,};

export const ArticleDetailsPageHeader: FC<PropsType> = (props) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button
        variant={ButtonVariantEnum.OUTLINE}
        onClick={onBackToList}
      >
        {t('backToList')}
      </Button>
      {canEdit && (
        <Button
          className={cls.editBtn}
          variant={ButtonVariantEnum.OUTLINE}
          onClick={onEditArticle}
        >
          {t('edit')}
        </Button>
      )}
    </div>
  );
};