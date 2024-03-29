import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { TArticleListItemProps } from '../ArticleListItem';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye-re.svg';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getRouteArticlesDetails } from '@/shared/const/router';

import {
  ArticleBlockTypeEnum,
  ArticleListViewVariantEnum,
} from '../../../model/consts/consts';
import type { IArticleTextBlock } from '../../../model/types/article';

import cls from './RedesignedArticleListItem.module.scss';

export const RedesignedArticleListItem = memo(
  (props: TArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();
    const userInfo = (
      <>
        <Avatar size={32} src={article.user.avatar ?? ''} alt="author avatar" />
        <Text bold text={article.user.username} />
      </>
    );
    const views = (
      <HStack gap="8">
        <Icon Svg={EyeIcon} />
        <Text text={String(article.views)} size="s" />
      </HStack>
    );

    if (view === ArticleListViewVariantEnum.LIST) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockTypeEnum.TEXT,
      ) as IArticleTextBlock;

      return (
        <Card
          max
          padding="24"
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <VStack max align="start" gap="16">
            <HStack gap="8" max>
              {userInfo}
              <Text text={article.createdAt} />
            </HStack>
            <Text title={article.title} bold />
            <Text title={article.subtitle} size="s" />
            <AppImage
              fallback={<Skeleton width="100%" height={250} />}
              src={article.img}
              alt={article.title}
              className={cls.img}
            />
            {textBlock?.paragraphs && (
              <Text
                text={textBlock.paragraphs.slice(0, 2).join(' ')}
                className={cls.textBlock}
              />
            )}
            <HStack max justify="between">
              <AppLink target={target} to={getRouteArticlesDetails(article.id)}>
                <Button variant="outline">{t('readForward')}</Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <AppLink
        target={target}
        to={getRouteArticlesDetails(article.id)}
        className={classNames(cls.wrapper, {}, [className, cls[view]])}
      >
        <Card className={cls.card} border="round">
          <AppImage
            fallback={<Skeleton width={240} height={140} />}
            src={article.img}
            alt={article.type.join(', ')}
            className={cls.img}
          />
          <VStack className={cls.info} gap="4">
            <Text title={article.title} />
            <VStack gap="4" className={cls.footer} max align="start">
              <HStack justify="between" max>
                <Text text={article.createdAt} size="s" className={cls.date} />
                {views}
              </HStack>
              <HStack gap="4" align="start">
                {userInfo}
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  },
);
