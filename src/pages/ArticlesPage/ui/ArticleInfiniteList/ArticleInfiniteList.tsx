import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList } from '@/entities/Article';
import { Text, TextAlignEnum } from '@/shared/ui/Text';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
import { getArticles } from '../../model/slices/articlePageSlice';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError';

type PropsType = {
  className?: string;
};

export const ArticleInfiniteList = memo((props: PropsType) => {
  const { className } = props;

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const error = useSelector(getArticlesPageError);

  if (error) {
    return <Text title="Error!" text={error} align={TextAlignEnum.CENTER} />;
  }

  return (
    <ArticleList
      view={view}
      articles={articles}
      isLoading={isLoading}
      className={className}
    />
  );
});
