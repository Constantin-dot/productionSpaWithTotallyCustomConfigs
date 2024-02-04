import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DynamicModuleLoader,
  ReducersListType,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlePageSlice';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

type PropsType = { className?: string };

const reducers: ReducersListType = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<PropsType> = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const content = (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          content={
            <Page
              className={classNames(cls.ArticlesPage, {}, [className])}
              isSaveScroll
              onScrollEnd={onLoadNextPart}
              data-testid="ArticlesPage"
            >
              <ArticleInfiniteList />
              <ArticlePageGreeting />
            </Page>
          }
          right={<FiltersContainer />}
        />
      }
      off={
        <Page
          className={classNames(cls.ArticlesPageDeprecated, {}, [className])}
          isSaveScroll
          onScrollEnd={onLoadNextPart}
          data-testid="ArticlesPage"
        >
          <VStack gap="16" max>
            <ArticlePageFilters />
            <ArticleInfiniteList />
            <ArticlePageGreeting />
          </VStack>
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
