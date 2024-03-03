import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/deprecated/Text';
import { TArticleListItemProps } from '../ArticleListItem';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { getRouteArticlesDetails } from '@/shared/const/router';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { AppLink } from '@/shared/ui/deprecated/AppLink';

import {
  ArticleBlockTypeEnum,
  ArticleListViewVariantEnum,
} from '../../../model/consts/consts';
import type { IArticleTextBlock } from '../../../model/types/article';
import { ArticleTextBlock } from '../../ArticleTextBlock/ArticleTextBlock';

import cls from './DeprecatedArticleListItem.module.scss';

export const DeprecatedArticleListItem = memo(
  (props: TArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();
    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} className={cls.icon} />
      </>
    );

    if (view === ArticleListViewVariantEnum.LIST) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockTypeEnum.TEXT,
      ) as IArticleTextBlock;

      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
          data-testid="ArticleListItem"
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Avatar
                size={30}
                src={article.user.avatar ?? ''}
                alt="author avatar"
              />
              <Text text={article.user.username} className={cls.username} />
              <Text text={article.createdAt} className={cls.date} />
            </div>
            <Text title={article.title} className={cls.title} />
            {types}
            <AppImage
              fallback={<Skeleton width="100%" height={250} />}
              src={article.img}
              className={cls.img}
              alt={article.title}
            />
            {textBlock && (
              <ArticleTextBlock block={textBlock} className={cls.textBlock} />
            )}
            <div className={cls.footer}>
              <AppLink target={target} to={getRouteArticlesDetails(article.id)}>
                <Button variant={ButtonVariantEnum.OUTLINE}>
                  {t('readForward')}
                </Button>
              </AppLink>
              {views}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <AppLink
        target={target}
        to={getRouteArticlesDetails(article.id)}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        data-testid="ArticleListItem"
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <AppImage
              fallback={<Skeleton width={200} height={200} />}
              src={article.img}
              className={cls.img}
              alt={article.type.join(', ')}
            />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text title={article.title} className={cls.title} />
        </Card>
      </AppLink>
    );
  },
);
