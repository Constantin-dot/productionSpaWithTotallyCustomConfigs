import { ArticleList } from 'entities/Article';
import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextAlignEnum } from 'shared/ui/Text/Text';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import { useSearchParams } from 'react-router-dom';
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView';
import { articlesPageReducer, getArticles } from '../../model/slices/articlePageSlice';
import cls from './ArticlesPage.module.scss';
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading';
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

type PropsType = {className?: string,};

const reducers: ReducersListType = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<PropsType> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  if (error) {
    return (
      <Text title="Error!" text={error} align={TextAlignEnum.CENTER} />
    );
  }

  // <Page
  //     className={classNames(cls.ArticlesPage, {}, [className])}
  //     isSaveScroll
  //     onScrollEnd={onLoadNextPart}
  //   >

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>

      <ArticleList
        view={view}
        articles={articles}
        isLoading={isLoading}
        className={cls.list}
        onLoadNextPart={onLoadNextPart}
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
