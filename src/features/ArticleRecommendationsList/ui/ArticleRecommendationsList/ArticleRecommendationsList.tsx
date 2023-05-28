import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSizeEnum } from 'shared/ui/Text/Text';
import { ArticleList, ArticleListViewVariantEnum } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}
export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation('article');

  const { data: articles, isLoading, error } = useArticleRecommendationsList(4);

  if (isLoading || error) {
    return null;
  }

  return (
    <VStack gap="8" align="start" className={classNames('', {}, [className])}>
      <Text
        size={TextSizeEnum.L}
        title={t('recommend')}
      />
      <ArticleList
        articles={articles}
        view={ArticleListViewVariantEnum.CARDS}
        target="_blank"
      />
    </VStack>
  );
});