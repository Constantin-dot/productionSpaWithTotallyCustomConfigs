import { ArticleList, ArticleListViewVariantEnum } from 'entities/Article';
import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '../../model/slices/articlePageSlice';
import cls from './ArticlesPage.module.scss';

type PropsType = {className?: string,};

const reducers: ReducersListType = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<PropsType> = (props) => {
  const { className } = props;

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleList
          view={ArticleListViewVariantEnum.LIST}
          articles={[]}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
