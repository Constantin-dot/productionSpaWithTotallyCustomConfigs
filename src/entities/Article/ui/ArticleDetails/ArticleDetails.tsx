import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlignEnum, TextSizeEnum } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import ClarityIcon from 'shared/assets/icons/clarity.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleBlockType, ArticleBlockTypeEnum } from '../../model/types/article';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock';
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock';

const reducers: ReducersListType = {
  articleDetails: articleDetailsReducer,
};

type PropsType = {
  id: string,
  className?: string,
};

export const ArticleDetails = memo((props: PropsType) => {
  const { id, className } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlockHandler = useCallback((block: ArticleBlockType) => {
    switch (block.type) {
    case ArticleBlockTypeEnum.CODE:
      return (
        <ArticleCodeBlock
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockTypeEnum.IMAGE:
      return (
        <ArticleImageBlock
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockTypeEnum.TEXT:
      return (
        <ArticleTextBlock
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    default:
      return null;
    }
  }, []);

  useInitialEffect(() => {
    dispatch(fetchArticleById(id));
  });

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton
          className={cls.title}
          width={300}
          height={32}
        />
        <Skeleton
          className={cls.skeleton}
          width={600}
          height={24}
        />
        <Skeleton
          className={cls.skeleton}
          width="100%"
          height={200}
        />
        <Skeleton
          className={cls.skeleton}
          width="100%"
          height={200}
        />
      </>
    );
  } else if (error) {
    content = (
      <Text
        title={t('articleRequestError')}
        align={TextAlignEnum.CENTER}
      />
    );
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar
            size={200}
            src={article?.img ?? ''}
            className={cls.avatar}
            alt={article?.title ?? ''}
          />
        </div>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSizeEnum.L}
        />
        <div className={cls.articleInfo}>
          <Icon Svg={EyeIcon} className={cls.icon} />
          <Text text={String(article?.views) ?? ''} />
        </div>
        <div className={cls.articleInfo}>
          <Icon Svg={ClarityIcon} className={cls.icon} />
          <Text text={article?.createdAt ?? ''} />
        </div>
        {article?.blocks.map(renderBlockHandler)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});
