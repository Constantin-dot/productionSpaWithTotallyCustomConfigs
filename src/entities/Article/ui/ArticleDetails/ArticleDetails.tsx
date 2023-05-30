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
import { HStack, VStack } from 'shared/ui/Stack';
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
  id?: string,
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
        <HStack justify="center" max>
          <Skeleton
            width={200}
            height={200}
            border="50%"
          />
        </HStack>
        <Skeleton
          width={300}
          height={32}
        />
        <Skeleton
          width={600}
          height={24}
        />
        <Skeleton
          width="100%"
          height={200}
        />
        <Skeleton
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
        <HStack justify="center" max>
          <Avatar
            size={200}
            src={article?.img ?? ''}
            alt={article?.title ?? ''}
          />
        </HStack>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSizeEnum.L}
        />
        <VStack gap="8" align="start" max>
          <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap="8">
            <Icon Svg={ClarityIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlockHandler)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap="16" justify="start" align="start" max className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
