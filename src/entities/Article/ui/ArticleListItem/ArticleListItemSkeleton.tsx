import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as DeprecatedSkeleton } from '@/shared/ui/deprecated/Skeleton';
import { Card as DeprecatedCard } from '@/shared/ui/deprecated/Card';
import { ArticleListViewVariantEnum } from '../../model/consts/consts';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as RedesignedSkeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card as RedesignedCard } from '@/shared/ui/redesigned/Card';
import cls from './DeprecatedArticleListItem/DeprecatedArticleListItem.module.scss';

type PropsType = {
  className?: string;
  view: ArticleListViewVariantEnum;
};

export const ArticleListItemSkeleton = memo((props: PropsType) => {
  const { className, view } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedisigned',
    on: () => RedesignedSkeleton,
    off: () => DeprecatedSkeleton,
  });
  const Card = toggleFeatures({
    name: 'isAppRedisigned',
    on: () => RedesignedCard,
    off: () => DeprecatedCard as any,
  });

  if (view === ArticleListViewVariantEnum.LIST) {
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Skeleton border="50%" width={30} height={30} />
            <Skeleton width={150} height={16} className={cls.username} />
            <Skeleton width={150} height={16} className={cls.date} />
          </div>
          <Skeleton width={250} height={24} className={cls.title} />
          <Skeleton height={200} className={cls.img} />
          <div className={cls.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={cls.title} />
      </Card>
    </div>
  );
});
