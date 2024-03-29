import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getArticleDetailsData } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getCanEditArticle } from '../../model/selectors/articles/articles';
import {
  getRouteArticles,
  getRouteArticlesDetails,
} from '@/shared/const/router';

type PropsType = { className?: string };

export const ArticleDetailsPageHeader = memo((props: PropsType) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (article?.id) {
      navigate(getRouteArticlesDetails(article?.id));
    }
  }, [article?.id, navigate]);

  return (
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <Button variant={ButtonVariantEnum.OUTLINE} onClick={onBackToList}>
        {t('backToList')}
      </Button>
      {canEdit && (
        <Button variant={ButtonVariantEnum.OUTLINE} onClick={onEditArticle}>
          {t('edit')}
        </Button>
      )}
    </HStack>
  );
});
