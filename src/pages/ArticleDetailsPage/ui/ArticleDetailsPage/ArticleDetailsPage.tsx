import { ArticleDetails } from 'entities/Article';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

type PropsType = {className?: string,};

const reducers: ReducersListType = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<PropsType> = (props) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const { id } = useParams<{id: string}>();
  const comments = useSelector(getArticleComments.selectAll);

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('articleRequestError')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t('comments')} className={cls.commentTitle} />
        <CommentList
          comments={comments}
          // isLoading
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
