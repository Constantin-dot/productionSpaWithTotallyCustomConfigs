import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Card } from 'shared/ui/Card/Card';
import cls from './ArticleListItem.module.scss';
import { ArticleListViewVariantEnum } from '../../model/types/article';

type PropsType = {
  className?: string,
  view: ArticleListViewVariantEnum,
};

export const ArticleListItemSkeleton = memo((props: PropsType) => {
  const {
    className,
    view,
  } = props;

  if (view === ArticleListViewVariantEnum.LIST) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        {/* <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar ?? ''} alt="author avatar" />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          <img src={article.img} className={cls.img} alt={article.title} />
          {
            textBlock && (
              <ArticleTextBlock block={textBlock} className={cls.textBlock} />
            )
          }
          <div className={cls.footer}>
            <Button
              variant={ButtonVariantEnum.OUTLINE}
              onClick={onOpenArticle}
            >
              {t('readForward')}
            </Button>
          </div>
        </Card> */}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
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
